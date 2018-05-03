package com.lming.zhang.upms.shiro.filter;


import com.alibaba.fastjson.JSONObject;
import com.lming.zhang.common.util.HttpClientUtil;
import com.lming.zhang.common.util.PropertiesFileUtil;
import com.lming.zhang.common.util.RedisUtil;
import com.lming.zhang.upms.common.UpmsConstants;
import com.lming.zhang.upms.util.RequestParameterUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.AuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import redis.clients.jedis.Jedis;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class UpmsAuthenticationFilter extends AuthenticationFilter {


    private String upmsType = "";
    private StringBuffer ssoServerUrl = null;
    private String appId= "";


    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        log.info("==> UpmsAuthenticationFilter -> isAccessAllowed() ");
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        upmsType = PropertiesFileUtil.getInstance("zhang-upms-client").get("zhang.upms.type");
        ssoServerUrl = new StringBuffer(
                PropertiesFileUtil.getInstance("zhang-upms-client").get("zhang.upms.sso.server.url"));
        appId = PropertiesFileUtil.getInstance("zhang-upms-client").get("zhang.upms.appId");

        // 判断请求类型
        log.info(">>>> upmsType=[{}],requestUri=[{}]",
                upmsType,
                httpServletRequest.getRequestURI());

        Subject subject = getSubject(request, response);
        Session session = subject.getSession();
        session.setAttribute(UpmsConstants.UPMS_TYPE, upmsType);

        if (UpmsConstants.CLIENT.equals(upmsType)) {
            return validateClient(request, response);
        }
        if (UpmsConstants.SERVER.equals(upmsType)) {
            return subject.isAuthenticated();
        }
        return false;
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        log.info("==> UpmsAuthenticationFilter -> onAccessDenied()");
        HttpServletRequest httpServletRequest = WebUtils.toHttp(request);

        String ssoLoginUrl = "";
        if ("server".equals(upmsType)) {
            ssoLoginUrl = ssoServerUrl.append("/sso/login").toString();
            log.info(">>> server端未登录，跳转至统一登录平台,ssoLoginUrl={}",ssoLoginUrl);
            WebUtils.toHttp(response).sendRedirect(ssoLoginUrl);
            return false;
        }

        ssoLoginUrl = getClientLoginUrl(ssoServerUrl,httpServletRequest);
        log.info(">>> client未登录，跳转至统一登录平台,ssoLoginUrl={}",ssoLoginUrl);
        WebUtils.toHttp(response).sendRedirect(ssoLoginUrl);
        return false;
    }


    /**
     * 获取客户端登录跳转地址，将本身地址作为backurl传参
     * @param ssoServerUrl
     * @param request
     * @return
     */
    private String getClientLoginUrl(StringBuffer ssoServerUrl,HttpServletRequest request)throws Exception{

        // 客户端登录
        ssoServerUrl.append("/sso/index").
                append("?").
                append("appid").append("=").append(appId);

        // 回跳地址
        StringBuffer backurl = request.getRequestURL();
        String queryString = request.getQueryString();
        if (StringUtils.isNotBlank(queryString)) {
            backurl.append("?").append(queryString);
        }

        return  ssoServerUrl.append("&").append("backurl").append("=").append(URLEncoder.encode(backurl.toString(), "utf-8")).toString();
    }


    private boolean validateClient(ServletRequest request, ServletResponse response){
        log.info("==> UpmsAuthenticationFilter -> validateClient() ");
        HttpServletResponse httpServletResponse = WebUtils.toHttp(response);
        Subject subject = getSubject(request, response);
        Session session = subject.getSession();
        String sessionId = session.getId().toString();
        int timeOut = (int) session.getTimeout() / 1000;
        // 判断局部会话是否登录
        log.info(">>> 开始从缓存中查找用户sessionId={}",sessionId);
        String cacheClientSession = RedisUtil.get(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_ID + "_" + session.getId());
        if (StringUtils.isNotBlank(cacheClientSession)) {
            log.info(">>> 缓存中找到该用户sessIonId={}",sessionId);
            // 更新code有效期
            RedisUtil.set(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_ID + "_" + sessionId, cacheClientSession, timeOut);
            Jedis jedis = RedisUtil.getJedis();
            jedis.expire(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_IDS + "_" + cacheClientSession, timeOut);
            jedis.close();
            // 移除url中的code参数
            if (null != request.getParameter("code")) {
                String backUrl = RequestParameterUtil.getParameterWithOutCode(WebUtils.toHttp(request));
                try {
                    log.info(">>> 跳转至backurl:{}",backUrl.toString());
                    httpServletResponse.sendRedirect(backUrl.toString());
                } catch (IOException e) {
                    log.error("局部会话已登录，移除code参数跳转出错：", e);
                }
            } else {
                return true;
            }
        }

        // 认证中心返回upms_code,upms_username
        String code = request.getParameter("upms_code");
        String username = request.getParameter("upms_username");
        log.info(">>> 认证平台登录完成，回调，upms_code={},upms_username={}",code,username);
        if (StringUtils.isNotBlank(code)) {
            try {
                // HttpPost去校验code
                String ssoCodeUrl = ssoServerUrl.append("/sso/code").toString();
                log.info(">>> 发送认证中心，校验code有效性,code={},ssoCodeUrl={}",code,ssoCodeUrl);
                Map<String,String> paramsMap = new HashMap<>();
                paramsMap.put("code",code);
                String responseData = HttpClientUtil.doPost(ssoCodeUrl,paramsMap);
                JSONObject result = JSONObject.parseObject(responseData);
                if (0 == result.getIntValue("code") && result.getString("data").equals(code)) {
                    log.info(">>> 认证中心认证成功，客户端进行session数据缓存");
                    // code校验正确，创建局部会话
                    RedisUtil.set(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_ID + "_" + sessionId, code, timeOut);
                    // 保存code对应的局部会话sessionId，方便退出操作
                    RedisUtil.sadd(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_IDS + "_" + code, sessionId, timeOut);
                    log.info(">>> 当前code={}，对应的注册系统个数：{}个", code, RedisUtil.getJedis().scard(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_IDS + "_" + code));
                    // 移除url中的token参数
                    String backUrl = RequestParameterUtil.getParameterWithOutCode(WebUtils.toHttp(request));
                    // 返回请求资源
                    try {
                        // client无密认证
                        subject.login(new UsernamePasswordToken(username, ""));
                        httpServletResponse.sendRedirect(backUrl.toString());
                        return true;
                    } catch (Exception e) {
                        log.error("已拿到code，移除code参数跳转出错：", e);
                    }
                } else {
                    log.warn(result.getString("data"));
                }

            } catch (Exception e) {
                log.error("认证code失败：", e);
            }
        }
        return false;
    }
}
