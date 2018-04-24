package com.lming.zhang.upms.server.controller;

import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.dao.model.UpmsSystem;
import com.lming.zhang.upms.dao.model.UpmsSystemExample;
import com.lming.zhang.upms.dao.model.UpmsUser;
import com.lming.zhang.upms.rpc.api.UpmsApiService;
import com.lming.zhang.upms.rpc.api.UpmsSystemService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

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


    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String index(ModelMap modelMap){
        // 加载所有可用的系统
        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria().andStatusEqualTo(new Byte("1"));
        List<UpmsSystem> upmsSystemList = upmsSystemService.selectByExample(upmsSystemExample);
        // 加载当前用户所有系统的操作权限
        String username = (String) SecurityUtils.getSubject().getPrincipal();
        log.info("current user:{}",username);
//        List<UpmsPermission> upmsPermissionList = upmsApiService.selectUpmsPermissionByUpmsUserId(user.getUserId());
//
//        //
//        log.info("加载用户的操作权限：userId:{},permissions:{}",user.getUsername(),upmsPermissionList);



        modelMap.put("systemList",upmsSystemList);

        return "index_business";
    }



}
