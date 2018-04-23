package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcPlatNavMapper;
import com.lming.zhang.hospital.dao.model.ChcPlatNav;
import com.lming.zhang.hospital.dao.model.ChcPlatNavExample;
import com.lming.zhang.hospital.rpc.api.ChcPlatNavService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcPlatNavService实现
* Created by zhanglm on 2018/4/23.
*/
@Service
@Transactional
@BaseService
public class ChcPlatNavServiceImpl extends BaseServiceImpl<ChcPlatNavMapper, ChcPlatNav, ChcPlatNavExample> implements ChcPlatNavService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcPlatNavServiceImpl.class);

    @Autowired
    ChcPlatNavMapper chcPlatNavMapper;

}