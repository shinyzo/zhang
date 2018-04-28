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

    @RequestMapping("/404")
    public String notFound(){
        return "/error/403";
    }

    @RequestMapping("/403")
    public String noAuthorized(){
        return "/error/403";
    }

    @RequestMapping("/500")
    public String badRequest(){
        return "/error/403";
    }



}
