package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.AclRoleMapper;
import com.lming.zhang.hospital.dao.model.AclRole;
import com.lming.zhang.hospital.dao.model.AclRoleExample;
import com.lming.zhang.hospital.rpc.api.AclRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* AclRoleService实现
* Created by zhanglm on 2018/4/19.
*/
@Service
@Transactional
@BaseService
public class AclRoleServiceImpl extends BaseServiceImpl<AclRoleMapper, AclRole, AclRoleExample> implements AclRoleService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AclRoleServiceImpl.class);

    @Autowired
    AclRoleMapper aclRoleMapper;

}