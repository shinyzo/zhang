package com.lming.zhang.chc.hospital.web.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Auth : shinyzo
 * Date : 2018/4/19
 * description : xxxx
 */
@Controller
@Slf4j
@RequestMapping("/manage")
public class IndexController {

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String index(){

        // 加载所有的系统
        // 加载改用户拥有系统的权限

        return "index_business";
    }

    @RequestMapping(value = "/home",method = RequestMethod.GET)
    public String home(){

        return "home";
    }

    @RequestMapping(value = "/hello",method = RequestMethod.GET)
    public String hello(){

        return "hello";
    }
}