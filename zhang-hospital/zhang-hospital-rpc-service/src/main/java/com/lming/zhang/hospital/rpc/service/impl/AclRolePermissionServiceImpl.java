package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.AclRolePermissionMapper;
import com.lming.zhang.hospital.dao.model.AclRolePermission;
import com.lming.zhang.hospital.dao.model.AclRolePermissionExample;
import com.lming.zhang.hospital.rpc.api.AclRolePermissionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* AclRolePermissionService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class AclRolePermissionServiceImpl extends BaseServiceImpl<AclRolePermissionMapper, AclRolePermission, AclRolePermissionExample> implements AclRolePermissionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AclRolePermissionServiceImpl.class);

    @Autowired
    AclRolePermissionMapper aclRolePermissionMapper;

}