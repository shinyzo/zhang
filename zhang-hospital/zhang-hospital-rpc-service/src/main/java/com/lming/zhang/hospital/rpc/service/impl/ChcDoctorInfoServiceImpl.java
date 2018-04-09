package com.lming.zhang.hospital.rpc.service.impl;


import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcDoctorInfoMapper;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfoExample;
import com.lming.zhang.hospital.rpc.api.ChcDoctorInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcDoctorInfoService实现
* Created by shuzheng on 2017/12/18.
*/
@Service("chcDoctorInfoService")
@Transactional
@BaseService
public class ChcDoctorInfoServiceImpl extends BaseServiceImpl<ChcDoctorInfoMapper, ChcDoctorInfo, ChcDoctorInfoExample> implements ChcDoctorInfoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcDoctorInfoServiceImpl.class);

    @Autowired
    ChcDoctorInfoMapper chcDoctorInfoMapper;

}