package com.lming.zhang.upms.shiro.realm;


import com.lming.zhang.common.util.PropertiesFileUtil;
import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.dao.model.UpmsRole;
import com.lming.zhang.upms.dao.model.UpmsUser;
import com.lming.zhang.upms.rpc.api.UpmsApiService;
import com.lming.zhang.upms.util.PasswordHelper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 用户认证和授权
 * Created by shuzheng on 2017/1/20.
 */
@Slf4j
public class UpmsRealm extends AuthorizingRealm {


    @Autowired
    private UpmsApiService upmsApiService;

    /**
     * 授权：验证权限时调用
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {

        String username = (String) principalCollection.getPrimaryPrincipal();
        UpmsUser upmsUser = upmsApiService.selectUpmsUserByUsername(username);

        // 当前用户所有角色
        List<UpmsRole> upmsRoles = upmsApiService.selectUpmsRoleByUpmsUserId(upmsUser.getUserId());
        Set<String> roles = new HashSet<>();
        for (UpmsRole upmsRole : upmsRoles) {
            if (StringUtils.isNotBlank(upmsRole.getName())) {
                roles.add(upmsRole.getName());
            }
        }

        // 当前用户所有权限
        List<UpmsPermission> upmsPermissions = upmsApiService.selectUpmsPermissionByUpmsUserId(upmsUser.getUserId());
        Set<String> permissions = new HashSet<>();
        for (UpmsPermission upmsPermission : upmsPermissions) {
            if (StringUtils.isNotBlank(upmsPermission.getPermissionValue())) {
                permissions.add(upmsPermission.getPermissionValue());
            }
        }

        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.setStringPermissions(permissions);
        simpleAuthorizationInfo.setRoles(roles);

        log.info("==> 加载用户权限,username={},roles={},permissions={}",
                username,
                roles,
                permissions
        );
        return simpleAuthorizationInfo;
    }

    /**
     * 认证：登录时调用
     * @param authenticationToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {

        String username = (String) authenticationToken.getPrincipal();
        String password = new String((char[]) authenticationToken.getCredentials());

        log.info("==> 用户登录认证,username={},",username);
        // 客户端免密认证
        String upmsType = PropertiesFileUtil.getInstance("zhang-upms-client").get("zhang.upms.type");
        if ("client".equals(upmsType)) {
            log.info("==> 客户端免密认证");
            return new SimpleAuthenticationInfo(username,password, getName());
        }
        // 查询用户信息
        UpmsUser upmsUser = upmsApiService.selectUpmsUserByUsername(username);

        if (null == upmsUser) {
            throw new UnknownAccountException();
        }
        if (!upmsUser.getPassword().equals(PasswordHelper.encryptPassword(password , upmsUser.getSalt()))) {
            throw new IncorrectCredentialsException();
        }
        if ("1".equals(upmsUser.getLocked().toString())) {
            throw new LockedAccountException();
        }
        return new SimpleAuthenticationInfo(username, password, getName());

    }

}
