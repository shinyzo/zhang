package com.lming.zhang.upms.server.controller;

import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */
@Controller
@RequestMapping("/manage")
public class LoginController {


    @RequestMapping(value = "/loginAuthen",method = RequestMethod.POST)
    @ResponseBody
    public UpmsResult loginAuthen(@RequestParam("loginName") String username,
                                  @RequestParam("loginPass") String password,
                                  @RequestParam("vercode") String vercode){

        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(username, password);
        subject.login(usernamePasswordToken);
        subject.isAuthenticated();
        return new UpmsResult(UpmsResultEnum.SUCCESS);
    }


    @RequestMapping("/login")
    public String login(){
        return "login";
    }


    @RequestMapping("/logout")
    public String logout(){
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return "login";
    }


}
