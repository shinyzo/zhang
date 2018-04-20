package com.lming.zhang.chc.hospital.web.controller;


import com.lming.zhang.chc.hospital.web.util.PasswordHelper;
import com.lming.zhang.hospital.common.ResultEnum;
import com.lming.zhang.hospital.common.ResultVO;
import com.lming.zhang.hospital.common.ResultVOUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Auth : shinyzo
 * Date : 2018/2/2
 * description : xxxx
 */
@Controller
@Slf4j
@RequestMapping("/manage")
public class LoginController {



    @RequestMapping(value = "/login")
    public String login(){

        return "login";
    }



    @RequestMapping(value = "/loginAuthen")
    @ResponseBody
    public ResultVO loginAuthen(@RequestParam("loginName") String loginName,
                                @RequestParam("loginPass") String loginPass,
                                @RequestParam("vercode") String vercode){
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token=new UsernamePasswordToken(loginName, loginPass);
        subject.login(token);
        if(subject.isAuthenticated())
        {
            return ResultVOUtils.success();
        }
        return ResultVOUtils.error(ResultEnum.FAILED);
    }

}
