package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcReserveMapper;
import com.lming.zhang.hospital.dao.model.ChcReserve;
import com.lming.zhang.hospital.dao.model.ChcReserveExample;
import com.lming.zhang.hospital.rpc.api.ChcReserveService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcReserveService实现
* Created by zhanglm on 2018/4/23.
*/
@Service
@Transactional
@BaseService
public class ChcReserveServiceImpl extends BaseServiceImpl<ChcReserveMapper, ChcReserve, ChcReserveExample> implements ChcReserveService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcReserveServiceImpl.class);

    @Autowired
    ChcReserveMapper chcReserveMapper;

}