package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcHospitalMapper;
import com.lming.zhang.hospital.dao.model.ChcHospital;
import com.lming.zhang.hospital.dao.model.ChcHospitalExample;
import com.lming.zhang.hospital.rpc.api.ChcHospitalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcHospitalService实现
* Created by zhanglm on 2018/4/23.
*/
@Service
@Transactional
@BaseService
public class ChcHospitalServiceImpl extends BaseServiceImpl<ChcHospitalMapper, ChcHospital, ChcHospitalExample> implements ChcHospitalService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcHospitalServiceImpl.class);

    @Autowired
    ChcHospitalMapper chcHospitalMapper;

}