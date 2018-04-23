package com.lming.zhang.chc.hospital.web.shiro;

import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * 自定义shiro 认证授权
 * Auth : shinyzo
 * Date : 2018/4/19
 * description : xxxx
 */
public class AuthRealm extends AuthorizingRealm {

    @Autowired
    private AclUserService aclUserService;

    //用户认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //加这一步的目的是在Post请求的时候会先进认证，然后在到请求
        if (authenticationToken.getPrincipal() == null) {
            return null;
        }
        //获取用户信息
        String loginName = authenticationToken.getPrincipal().toString();
        AclUserExample example = new AclUserExample();
        example.or().andLoginNameEqualTo(loginName);
        AclUser user = aclUserService.selectFirstByExample(example);
        if (user == null) {
            //这里返回后会报出对应异常
            throw new AuthenticationException("用户认证失败！");
        } else {
            //这里验证authenticationToken和simpleAuthenticationInfo的信息
            SimpleAuthenticationInfo simpleAuthenticationInfo = new SimpleAuthenticationInfo(
                    loginName,
                    user.getLoginPass().toString(),
                    getName()
            );
            return simpleAuthenticationInfo;
        }
    }

    //角色权限和对应权限添加
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取登录用户名
        String name= (String) principalCollection.getPrimaryPrincipal();
        //查询用户名称
        AclUserExample example = new AclUserExample();
        example.or().andLoginNameEqualTo(name);
        AclUser user = aclUserService.selectFirstByExample(example);
        //添加角色和权限
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
//        for (Role role:user.getRoles()) {
//            //添加角色
//            simpleAuthorizationInfo.addRole(role.getRoleName());
//            for (Permission permission:role.getPermissions()) {
//                //添加权限
//                simpleAuthorizationInfo.addStringPermission(permission.getPermission());
//            }
//        }
        return simpleAuthorizationInfo;
    }

}
