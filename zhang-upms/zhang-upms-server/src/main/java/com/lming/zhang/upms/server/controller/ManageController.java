package com.lming.zhang.upms.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */
@Controller
@RequestMapping("/manage")
public class ManageController {

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String index(){

        return "index_business";
    }



}
