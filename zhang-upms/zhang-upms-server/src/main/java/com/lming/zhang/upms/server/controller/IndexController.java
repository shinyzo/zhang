package com.lming.zhang.upms.server.controller;

import com.lming.zhang.upms.dao.model.UpmsUser;
import com.lming.zhang.upms.dao.model.UpmsUserExample;
import com.lming.zhang.upms.rpc.api.UpmsUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Auth : shinyzo
 * Date : 2018/4/23
 * description : xxxx
 */
@RestController
@RequestMapping("/manage")
public class IndexController {


    @Autowired
    private UpmsUserService upmsUserService;

    @RequestMapping("/index")
    public String index(){
        return "zhang-upms-server is started.";
    }


    @RequestMapping(value = "/user",method = RequestMethod.GET)
    public List<UpmsUser> findAll(){
        return upmsUserService.selectByExample(new UpmsUserExample());
    }


}
