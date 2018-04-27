package com.lming.zhang.upms.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Auth : shinyzo
 * Date : 2018/4/27
 * description : xxxx
 */
@Controller
public class ErrorController {

    @RequestMapping("/unauthorized")
    public String noAuthorized(){
        return "/error/403";
    }


}
