package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcDoctorLevelMapper;
import com.lming.zhang.hospital.dao.model.ChcDoctorLevel;
import com.lming.zhang.hospital.dao.model.ChcDoctorLevelExample;
import com.lming.zhang.hospital.rpc.api.ChcDoctorLevelService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcDoctorLevelService实现
* Created by zhanglm on 2018/4/23.
*/
@Service
@Transactional
@BaseService
public class ChcDoctorLevelServiceImpl extends BaseServiceImpl<ChcDoctorLevelMapper, ChcDoctorLevel, ChcDoctorLevelExample> implements ChcDoctorLevelService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcDoctorLevelServiceImpl.class);

    @Autowired
    ChcDoctorLevelMapper chcDoctorLevelMapper;

}