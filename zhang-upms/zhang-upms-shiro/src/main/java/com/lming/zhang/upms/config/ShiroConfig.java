package com.lming.zhang.upms.config;

import com.lming.zhang.common.util.PropertiesFileUtil;
import com.lming.zhang.upms.shiro.filter.UpmsAuthenticationFilter;
import com.lming.zhang.upms.shiro.listener.UpmsSessionListener;
import com.lming.zhang.upms.shiro.realm.UpmsRealm;
import com.lming.zhang.upms.shiro.session.UpmsSessionDao;
import com.lming.zhang.upms.shiro.session.UpmsSessionFactory;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.mgt.SessionManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.Cookie;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.crazycake.shiro.RedisCacheManager;
import org.crazycake.shiro.RedisManager;
import org.crazycake.shiro.RedisSessionDAO;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.CollectionUtils;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Auth : shinyzo
 * Date : 2018/4/19
 * description : xxxx
 */
@Configuration
@Slf4j
public class ShiroConfig {

    private boolean ssoSwitch = true;

    private String ssoLoginUrl = "http://localhost:7001/upms/manage/login";

    //Filter工厂，设置对应的过滤条件和跳转条件
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean() {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager());
        LinkedHashMap<String,String> shiroFilterMap = new LinkedHashMap<String, String>();

        // 静态文件
        shiroFilterMap.put("/static/**","anon");
        shiroFilterMap.put("/resources/**","anon");
        shiroFilterMap.put("/loadvercode","anon");
        shiroFilterMap.put("/manage/loginAuthen","anon");
        //shiroFilterMap.put("/manage/login","anon");

        // 登录,首页,退出
        shiroFilterFactoryBean.setLoginUrl(ssoLoginUrl);
        shiroFilterFactoryBean.setSuccessUrl("/manage/index");
        //shiroFilterMap.put("/manage/logout","logout");

        // 访问权限
        shiroFilterMap.put("/manage/**","authc");
        shiroFilterMap.put("/*","anon");
//        shiroFilterMap.put("/manage/role/**","roles[admin]");
//        shiroFilterMap.put("/manage/user/**","user");

        //错误页面，认证不通过跳转
        shiroFilterFactoryBean.setUnauthorizedUrl("/unauthorized");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(shiroFilterMap);

        // 自定义过滤器
       Map<String,Filter> filterMap = shiroFilterFactoryBean.getFilters();
       filterMap.put("authc",new UpmsAuthenticationFilter());


        return shiroFilterFactoryBean;
    }


    //权限管理，配置主要是Realm的管理认证
    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        securityManager.setRealm(upmsRealm());
        securityManager.setSessionManager(sessionManager());
//        // 自定义缓存实现 使用redis
        securityManager.setCacheManager(cacheManager());
        return securityManager;
    }


    //将自己的验证方式加入容器
    @Bean
    public UpmsRealm upmsRealm() {
        UpmsRealm authRealm = new UpmsRealm();
        //authRealm.setCredentialsMatcher( hashedCredentialsMatcher() );
        return authRealm;
    }


    /**
     * 自定义密码校验规则
     * @return
     */
    @Bean
    public HashedCredentialsMatcher hashedCredentialsMatcher() {
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        hashedCredentialsMatcher.setHashAlgorithmName("md5");//散列算法:这里使用MD5算法;
        hashedCredentialsMatcher.setHashIterations(2);//散列的次数，比如散列两次，相当于 md5(md5(""));
        return hashedCredentialsMatcher;
    }


    /**
     * cacheManager 缓存 redis实现
     * 使用的是shiro-redis开源插件
     * @return
     */
    public RedisCacheManager cacheManager() {
        RedisCacheManager redisCacheManager = new RedisCacheManager();
        redisCacheManager.setRedisManager(redisManager());
        return redisCacheManager;
    }




    /**
     * shiro session的管理
     */
    @Bean
    public DefaultWebSessionManager sessionManager() {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
         //sessionManager.setSessionDAO(redisSessionDAO());
        //sessionManager.setGlobalSessionTimeout(30*60*1000);  // 默认30分钟


        sessionManager.setSessionDAO(new UpmsSessionDao());      // 自定义session管理
        sessionManager.setSessionFactory(new UpmsSessionFactory()); // 自定义session工厂
        sessionManager.setSessionIdCookieEnabled(true);
        Cookie simpleCookie = new SimpleCookie();
        simpleCookie.setName(PropertiesFileUtil.getInstance("zhang-upms-client").get("zhang.upms.session.id"));
        sessionManager.setSessionIdCookie(simpleCookie);
       // sessionManager.setSessionListeners(CollectionUtils.arrayToList(new UpmsSessionListener())); // 自定义session监听器

        return sessionManager;
    }

    /**
     * RedisSessionDAO shiro sessionDao层的实现 通过redis
     * 使用的是shiro-redis开源插件
     */
//    @Bean
//    public RedisSessionDAO redisSessionDAO() {
//        RedisSessionDAO redisSessionDAO = new RedisSessionDAO();
//        redisSessionDAO.setRedisManager(redisManager());
//        return redisSessionDAO;
//    }

    /**
     * 配置shiro redisManager
     * 使用的是shiro-redis开源插件
     * @return
     */
    @Bean
    public RedisManager redisManager() {
        RedisManager redisManager = new RedisManager();
        redisManager.setHost("127.0.0.1");
        redisManager.setPort(6379);
        redisManager.setExpire(1800);// 配置缓存过期时间
        // redisManager.setPassword(password);
        return redisManager;
    }

    //加入注解的使用，不加入这个注解不生效
    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
        return authorizationAttributeSourceAdvisor;
    }

    @Bean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator(){
        DefaultAdvisorAutoProxyCreator creator = new DefaultAdvisorAutoProxyCreator();
        creator.setProxyTargetClass(true);
        return creator;
    }

}
