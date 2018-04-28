package com.lming.zhang.upms.server.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Auth : shinyzo
 * Date : 2018/4/28
 * description : 全局异常捕获，springboot 会将错误转到/error下
 */
@Controller
public class BaseErrorController implements ErrorController {
    @Override
    public String getErrorPath() {
        return "/error/error";
    }

    @RequestMapping("/error")
    public String error(){
        return "error/error";
    }
}
