package com.lming.zhang.upms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Auth : shinyzo
 * Date : 2018/4/23
 * description : xxxx
 */
@RestController
public class IndexController {

    @RequestMapping("/index")
    public String index(){
        return "zhang-upms-rpc-service is started.";
    }
}
