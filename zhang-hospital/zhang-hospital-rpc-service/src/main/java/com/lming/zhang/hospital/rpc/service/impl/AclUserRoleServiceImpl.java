package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.AclUserRoleMapper;
import com.lming.zhang.hospital.dao.model.AclUserRole;
import com.lming.zhang.hospital.dao.model.AclUserRoleExample;
import com.lming.zhang.hospital.rpc.api.AclUserRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* AclUserRoleService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class AclUserRoleServiceImpl extends BaseServiceImpl<AclUserRoleMapper, AclUserRole, AclUserRoleExample> implements AclUserRoleService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AclUserRoleServiceImpl.class);

    @Autowired
    AclUserRoleMapper aclUserRoleMapper;

}