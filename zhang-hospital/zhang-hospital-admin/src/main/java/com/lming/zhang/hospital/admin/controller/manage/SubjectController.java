package com.lming.zhang.hospital.admin.controller.manage;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/manage/subject")
public class SubjectController {

    @RequestMapping("/index")
    public String index(){

        return "/manage/subject/index";
    }


}
