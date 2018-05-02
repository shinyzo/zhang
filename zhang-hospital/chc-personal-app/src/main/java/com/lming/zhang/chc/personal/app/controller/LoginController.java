package com.lming.zhang.chc.personal.app.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Auth : shinyzo
 * Date : 2018/4/18
 * description : xxxx
 */
@RestController
@RequestMapping("/api")
public class LoginController {

    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public ResultVO login(@RequestParam("loginName") String loginName,
                          @RequestParam("loginPass") String loginPass){

        return ResultVOUtils.success();
    }

}
