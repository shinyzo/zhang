package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcOrderDetailMapper;
import com.lming.zhang.hospital.dao.model.ChcOrderDetail;
import com.lming.zhang.hospital.dao.model.ChcOrderDetailExample;
import com.lming.zhang.hospital.rpc.api.ChcOrderDetailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcOrderDetailService实现
* Created by shuzheng on 2018/4/9.
*/
@Service
@Transactional
@BaseService
public class ChcOrderDetailServiceImpl extends BaseServiceImpl<ChcOrderDetailMapper, ChcOrderDetail, ChcOrderDetailExample> implements ChcOrderDetailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcOrderDetailServiceImpl.class);

    @Autowired
    ChcOrderDetailMapper chcOrderDetailMapper;

}