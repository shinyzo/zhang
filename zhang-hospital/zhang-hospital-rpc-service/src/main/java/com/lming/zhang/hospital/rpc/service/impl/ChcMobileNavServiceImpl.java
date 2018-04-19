package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcMobileNavMapper;
import com.lming.zhang.hospital.dao.model.ChcMobileNav;
import com.lming.zhang.hospital.dao.model.ChcMobileNavExample;
import com.lming.zhang.hospital.rpc.api.ChcMobileNavService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcMobileNavService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class ChcMobileNavServiceImpl extends BaseServiceImpl<ChcMobileNavMapper, ChcMobileNav, ChcMobileNavExample> implements ChcMobileNavService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcMobileNavServiceImpl.class);

    @Autowired
    ChcMobileNavMapper chcMobileNavMapper;

}