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
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
* ChcDoctorInfoService实现
* Created by shuzheng on 2018/4/9.
*/
@Service
@Transactional
@BaseService
public class ChcDoctorInfoServiceImpl extends BaseServiceImpl<ChcDoctorInfoMapper, ChcDoctorInfo, ChcDoctorInfoExample> implements ChcDoctorInfoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcDoctorInfoServiceImpl.class);

    @Autowired
    ChcDoctorInfoMapper chcDoctorInfoMapper;


    @Override
    public ChcDoctorInfo selectByPrimaryKey(Integer id) {
        LOGGER.info("==========> 从数据库中查找...");
        return chcDoctorInfoMapper.selectByPrimaryKey(id,"360622198809201536");
    }
}