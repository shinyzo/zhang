package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.AclSystemMapper;
import com.lming.zhang.hospital.dao.model.AclSystem;
import com.lming.zhang.hospital.dao.model.AclSystemExample;
import com.lming.zhang.hospital.rpc.api.AclSystemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* AclSystemService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class AclSystemServiceImpl extends BaseServiceImpl<AclSystemMapper, AclSystem, AclSystemExample> implements AclSystemService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AclSystemServiceImpl.class);

    @Autowired
    AclSystemMapper aclSystemMapper;

}