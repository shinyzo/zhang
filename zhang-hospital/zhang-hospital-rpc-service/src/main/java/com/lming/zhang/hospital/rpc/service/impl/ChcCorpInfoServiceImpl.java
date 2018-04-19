package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcCorpInfoMapper;
import com.lming.zhang.hospital.dao.model.ChcCorpInfo;
import com.lming.zhang.hospital.dao.model.ChcCorpInfoExample;
import com.lming.zhang.hospital.rpc.api.ChcCorpInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcCorpInfoService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class ChcCorpInfoServiceImpl extends BaseServiceImpl<ChcCorpInfoMapper, ChcCorpInfo, ChcCorpInfoExample> implements ChcCorpInfoService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcCorpInfoServiceImpl.class);

    @Autowired
    ChcCorpInfoMapper chcCorpInfoMapper;

}