package com.lming.zhang.hospital.admin.controller.manage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Slf4j
@RequestMapping("/manage")
public class DoctorController {

    @RequestMapping("/doctor/index")
    @ResponseBody
    public String list(){

        return "doctor list";
    }

}
