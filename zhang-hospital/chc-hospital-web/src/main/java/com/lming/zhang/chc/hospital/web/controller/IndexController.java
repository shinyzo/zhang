package com.lming.zhang.chc.hospital.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Auth : shinyzo
 * Date : 2018/4/26
 * description : xxxx
 */
@Controller
public class IndexController {

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String index(){

        return "";
    }

}
