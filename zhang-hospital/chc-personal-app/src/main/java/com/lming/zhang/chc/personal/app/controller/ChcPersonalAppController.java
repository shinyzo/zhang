package com.lming.zhang.chc.personal.app.controller;

import com.lming.zhang.hospital.common.ResultVO;
import com.lming.zhang.hospital.common.ResultVOUtils;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfoExample;
import com.lming.zhang.hospital.rpc.api.ChcDoctorInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Auth : shinyzo
 * Date : 2018/4/17
 * description : xxxx
 */
@RestController
public class ChcPersonalAppController {

    @Autowired
    private ChcDoctorInfoService chcDoctorInfoService;

    public ResultVO getDoctorList(){
        ChcDoctorInfoExample example = new ChcDoctorInfoExample();
        List<ChcDoctorInfo> chcDoctorInfoList = chcDoctorInfoService.selectByExampleForOffsetPage(example, 0, 10);
        return ResultVOUtils.success(chcDoctorInfoList);
    }


}
