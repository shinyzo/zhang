package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.AclPermissionMapper;
import com.lming.zhang.hospital.dao.model.AclPermission;
import com.lming.zhang.hospital.dao.model.AclPermissionExample;
import com.lming.zhang.hospital.rpc.api.AclPermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* AclPermissionService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class AclPermissionServiceImpl extends BaseServiceImpl<AclPermissionMapper, AclPermission, AclPermissionExample> implements AclPermissionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AclPermissionServiceImpl.class);

    @Autowired
    AclPermissionMapper aclPermissionMapper;

}