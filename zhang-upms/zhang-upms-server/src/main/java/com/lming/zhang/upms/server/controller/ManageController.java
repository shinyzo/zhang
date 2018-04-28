package com.lming.zhang.upms.server.controller;

import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.dao.model.UpmsSystem;
import com.lming.zhang.upms.dao.model.UpmsSystemExample;
import com.lming.zhang.upms.dao.model.UpmsUser;
import com.lming.zhang.upms.rpc.api.UpmsApiService;
import com.lming.zhang.upms.rpc.api.UpmsSystemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */
@Controller
@Slf4j
@RequestMapping("/manage")
public class ManageController {

    //
    @Autowired
    private UpmsSystemService upmsSystemService;
    @Autowired
    private UpmsApiService upmsApiService;

    @ApiOperation(value = "系统首页")
    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String index(ModelMap modelMap){

        // 已注册系统
        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria()
                .andStatusEqualTo((byte) 1);
        List<UpmsSystem> upmsSystems = upmsSystemService.selectByExample(upmsSystemExample);

        // 当前登录用户权限
        Subject subject = SecurityUtils.getSubject();
        String username = (String) subject.getPrincipal();
        UpmsUser upmsUser = upmsApiService.selectUpmsUserByUsername(username);
        List<UpmsPermission> upmsPermissions = upmsApiService.selectUpmsPermissionByUpmsUserId(upmsUser.getUserId());

        modelMap.put("upmsUser",upmsUser);
        modelMap.put("upmsSystems", upmsSystems);
        modelMap.put("upmsPermissions", upmsPermissions);
        return "index_business";
    }


    @RequestMapping("/home")
    public String index(){
        return "home";
    }

    @ApiOperation(value="权限加载")
    @RequestMapping(value = "/getSystemPermission",method = RequestMethod.POST)
    @ResponseBody
    public UpmsResult getSystemPermission(@RequestParam("systemId") Integer systemId){

        // 当前登录用户权限
        Subject subject = SecurityUtils.getSubject();
        String username = (String) subject.getPrincipal();
        UpmsUser upmsUser = upmsApiService.selectUpmsUserByUsername(username);
        List<UpmsPermission> upmsPermissions = upmsApiService.selectUpmsPermissionByUpmsUserId(upmsUser.getUserId());

        List<UpmsPermission> filterPermissions =
                upmsPermissions.stream()
                .filter(upmsPermission -> upmsPermission.getSystemId() == systemId)
                        .collect(Collectors.toList());

        return new UpmsResult(filterPermissions);
    }


}
