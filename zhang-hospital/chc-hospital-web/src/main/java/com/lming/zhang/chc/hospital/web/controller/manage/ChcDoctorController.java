package com.lming.zhang.chc.hospital.web.controller.manage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Auth : shinyzo
 * Date : 2018/4/26
 * description : xxxx
 */
@Controller
@RequestMapping("/manage/doctor")
public class ChcDoctorController {

    @RequestMapping("/index")
    @ResponseBody
    public String index(){

        return "doctor index";
    }
}
