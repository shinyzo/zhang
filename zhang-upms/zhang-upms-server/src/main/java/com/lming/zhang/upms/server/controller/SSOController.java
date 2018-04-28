package com.lming.zhang.upms.server.controller;

import com.lming.zhang.common.util.PropertiesFileUtil;
import com.lming.zhang.common.util.RedisUtil;
import com.lming.zhang.upms.common.UpmsConstants;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.config.OnlineStatus;
import com.lming.zhang.upms.dao.model.UpmsSystem;
import com.lming.zhang.upms.dao.model.UpmsSystemExample;
import com.lming.zhang.upms.rpc.api.UpmsSystemService;
import com.lming.zhang.upms.server.exception.UpmsProcessException;
import com.lming.zhang.upms.shiro.session.UpmsSession;
import com.lming.zhang.upms.shiro.session.UpmsSessionDao;
import com.lming.zhang.upms.util.SerializableUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.BooleanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;

import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.UUID;

/**
 * 单点登录管理
 * Created by zhanglm on 2016/12/10.
 */
@Controller
@RequestMapping("/sso")
@Api(value = "单点登录管理", description = "单点登录管理")
@Slf4j
public class SSOController {

    @Autowired
    private UpmsSystemService upmsSystemService;

    @Autowired
    private UpmsSessionDao upmsSessionDao;


    @ApiOperation(value = "认证中心首页")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(HttpServletRequest request) throws Exception {
        String appid = request.getParameter("appid");
        String backurl = request.getParameter("backurl");
        if (StringUtils.isBlank(appid)) {
            throw new UpmsProcessException(UpmsResultEnum.APPID_EMPTY);
        }
        // 判断请求认证系统是否注册
        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria()
                .andNameEqualTo(appid);
        int count = upmsSystemService.countByExample(upmsSystemExample);
        if (0 == count) {
            throw new UpmsProcessException(UpmsResultEnum.SYSTEM_NOT_REGISTER);
        }
        return "redirect:/sso/login?backurl=" + URLEncoder.encode(backurl, "utf-8");
    }

    @ApiOperation(value = "登录页面")
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(HttpServletRequest request) {
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        String serverSessionId = session.getId().toString();
        // 判断是否已登录，如果已登录，则回跳
        String code = RedisUtil.get(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_ID + "_" + serverSessionId);
        // code校验值
        if (StringUtils.isNotBlank(code)) {
            // 回跳
            String backurl = request.getParameter("backurl");
            String username = (String) subject.getPrincipal();
            if (StringUtils.isBlank(backurl)) {
                backurl = "/";
            } else {
                if (backurl.contains("?")) {
                    backurl += "&upms_code=" + code + "&upms_username=" + username;
                } else {
                    backurl += "?upms_code=" + code + "&upms_username=" + username;
                }
            }
            log.info("认证中心帐号通过，带code回跳：{}", backurl);
            return "redirect:" + backurl;
        }
        return "/sso/login";
    }

    @ApiOperation(value = "登录鉴权")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Object login(HttpServletRequest request, HttpServletResponse response, ModelMap modelMap) {
        //
        log.info("==> 进入统一认证鉴权中心");

        String username = request.getParameter("loginName");
        String password = request.getParameter("loginPass");
        String rememberMe = request.getParameter("rememberMe");
        String backurl = request.getParameter("backurl");

        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        String sessionId = session.getId().toString();
        // 判断是否已登录，如果已登录，则回跳，防止重复登录
        String hasCode = RedisUtil.get(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_ID + "_" + sessionId);
        // code校验值
        if (StringUtils.isBlank(hasCode)) {
            log.info(">>> 缓存中未找到用户数据，username={}",username);
            // 使用shiro认证
            UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(username, password);

            if (BooleanUtils.toBoolean(rememberMe)) {
                usernamePasswordToken.setRememberMe(true);
            } else {
                usernamePasswordToken.setRememberMe(false);
            }
            subject.login(usernamePasswordToken);
            // 更新session状态
            upmsSessionDao.updateStatus(sessionId, OnlineStatus.on_line);
            // 默认验证帐号密码正确，创建code
            String code = UUID.randomUUID().toString();
            // 全局会话sessionId列表，供会话管理
            RedisUtil.lpush(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_IDS, sessionId.toString());
            // 全局会话的code
            RedisUtil.set(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_ID + "_" + sessionId, code, (int) subject.getSession().getTimeout() / 1000);
            // code校验值
            RedisUtil.set(UpmsConstants.ZHANG_UPMS_SERVER_CODE + "_" + code, code, (int) subject.getSession().getTimeout() / 1000);
            log.info(">>> 用户登录成功，建立用户session相关数据，username={}",username);
        }

        if (StringUtils.isBlank(backurl)) {
            UpmsSystem upmsSystem = upmsSystemService.selectUpmsSystemByName(PropertiesFileUtil.getInstance("zhang-upms-client").get("zhang.upms.appId"));
            backurl = null == upmsSystem ? "/" : upmsSystem.getBasepath();
        }
        log.info(">>> 回调用户请求的backUrl={}",backurl);
        return new UpmsResult(backurl);
    }

    @ApiOperation(value = "校验code")
    @RequestMapping(value = "/code", method = RequestMethod.POST)
    @ResponseBody
    public Object code(HttpServletRequest request) {

        String codeParam = request.getParameter("code");
        String cacheCode = RedisUtil.get(UpmsConstants.ZHANG_UPMS_SERVER_CODE + "_" + codeParam);
        if (StringUtils.isBlank(codeParam) || !codeParam.equals(cacheCode)) {
            log.warn("==> 认证中心进行code校验，failed,code不一致，codeParam={},cacheCode={}",
                    codeParam,cacheCode);
            new UpmsResult(UpmsResultEnum.FAILED, "code不存在");
        }
        log.info("==> 认证中心进行code校验，success");
        return new UpmsResult(UpmsResultEnum.SUCCESS, cacheCode);
    }

    @ApiOperation(value = "退出登录")
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout(HttpServletRequest request) {
        // shiro退出登录
        SecurityUtils.getSubject().logout();
        // 跳回原地址
        String redirectUrl = request.getHeader("Referer");
        if (null == redirectUrl) {
            redirectUrl = "/";
        }
        return "redirect:" + redirectUrl;
    }

}