package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcUserInfoMapper;
import com.lming.zhang.hospital.dao.model.ChcUserInfo;
import com.lming.zhang.hospital.dao.model.ChcUserInfoExample;
import com.lming.zhang.hospital.rpc.api.ChcUserInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcUserInfoService实现
* Created by shuzheng on 2018/4/9.
*/
@Service
@Transactional
@BaseService
public class ChcUserInfoServiceImpl extends BaseServiceImpl<ChcUserInfoMapper, ChcUserInfo, ChcUserInfoExample> implements ChcUserInfoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcUserInfoServiceImpl.class);

    @Autowired
    ChcUserInfoMapper chcUserInfoMapper;

}