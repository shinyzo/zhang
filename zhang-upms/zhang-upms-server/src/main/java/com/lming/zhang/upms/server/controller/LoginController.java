package com.lming.zhang.upms.server.controller;

import com.lming.zhang.upms.common.UpmsConstants;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
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

    @Autowired
    private StringRedisTemplate redisTemplate;


    @RequestMapping(value = "/loginAuthen",method = RequestMethod.POST)
    @ResponseBody
    public UpmsResult loginAuthen(@RequestParam("loginName") String username,
                                  @RequestParam("loginPass") String password,
                                  @RequestParam("vercode") String vercode){
        if(StringUtils.isEmpty(vercode)){
            return new UpmsResult(UpmsResultEnum.RAND_KEY_EMPTY);
        }

        String randKey = redisTemplate.opsForValue().get(UpmsConstants.RAND_KEY);
//        if(!vercode.equalsIgnoreCase(randKey))
//        {
//            return new UpmsResult(UpmsResultEnum.RAND_KEY_ERROR);
//        }

        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(username, password);
        subject.login(usernamePasswordToken);
        if(subject.isAuthenticated()){
            return new UpmsResult(UpmsResultEnum.SUCCESS);
        }
        return new UpmsResult(UpmsResultEnum.FAILED.getCode(),"用户名或密码不正确!");
    }


    @RequestMapping("/login")
    public String login(){
        return "login";
    }


//    @RequestMapping("/logout")
//    public String logout(){
//        Subject subject = SecurityUtils.getSubject();
//        subject.logout();
//        return "login";
//    }


}
