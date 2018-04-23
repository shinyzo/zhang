package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcProductKuMapper;
import com.lming.zhang.hospital.dao.model.ChcProductKu;
import com.lming.zhang.hospital.dao.model.ChcProductKuExample;
import com.lming.zhang.hospital.rpc.api.ChcProductKuService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcProductKuService实现
* Created by zhanglm on 2018/4/23.
*/
@Service
@Transactional
@BaseService
public class ChcProductKuServiceImpl extends BaseServiceImpl<ChcProductKuMapper, ChcProductKu, ChcProductKuExample> implements ChcProductKuService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcProductKuServiceImpl.class);

    @Autowired
    ChcProductKuMapper chcProductKuMapper;

}