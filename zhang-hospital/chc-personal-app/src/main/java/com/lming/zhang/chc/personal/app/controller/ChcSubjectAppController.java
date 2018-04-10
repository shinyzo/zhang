package com.lming.zhang.chc.personal.app.controller;


import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfoExample;
import com.lming.zhang.hospital.rpc.api.ChcDoctorInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Auth : shinyzo
 * Date : 2018/4/8
 * description : xxxx
 */
@RestController
@RequestMapping("/personal")
public class ChcSubjectAppController {

    @Autowired
    private ChcDoctorInfoService chcDoctorInfoService;

    @GetMapping("/doctor/list")
    public List<ChcDoctorInfo> getDoctorInfo(){
        ChcDoctorInfoExample example = new ChcDoctorInfoExample();
        return chcDoctorInfoService.selectByExample(example);
    }

    @GetMapping("/doctor/{doctorId}")
    public ChcDoctorInfo getDoctorInfo(@PathVariable("doctorId") Integer doctorId){
        ChcDoctorInfoExample example = new ChcDoctorInfoExample();
        return chcDoctorInfoService.selectByPrimaryKey(doctorId);
    }

}
