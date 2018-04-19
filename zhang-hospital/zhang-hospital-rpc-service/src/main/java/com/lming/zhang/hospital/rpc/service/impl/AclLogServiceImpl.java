package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.AclLogMapper;
import com.lming.zhang.hospital.dao.model.AclLog;
import com.lming.zhang.hospital.dao.model.AclLogExample;
import com.lming.zhang.hospital.rpc.api.AclLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* AclLogService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class AclLogServiceImpl extends BaseServiceImpl<AclLogMapper, AclLog, AclLogExample> implements AclLogService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AclLogServiceImpl.class);

    @Autowired
    AclLogMapper aclLogMapper;

}