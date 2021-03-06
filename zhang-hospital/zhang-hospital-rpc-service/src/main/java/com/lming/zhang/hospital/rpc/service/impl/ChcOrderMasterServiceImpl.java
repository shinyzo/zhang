package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcOrderMasterMapper;
import com.lming.zhang.hospital.dao.model.ChcOrderMaster;
import com.lming.zhang.hospital.dao.model.ChcOrderMasterExample;
import com.lming.zhang.hospital.rpc.api.ChcOrderMasterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcOrderMasterService实现
* Created by zhanglm on 2018/4/23.
*/
@Service
@Transactional
@BaseService
public class ChcOrderMasterServiceImpl extends BaseServiceImpl<ChcOrderMasterMapper, ChcOrderMaster, ChcOrderMasterExample> implements ChcOrderMasterService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcOrderMasterServiceImpl.class);

    @Autowired
    ChcOrderMasterMapper chcOrderMasterMapper;

}