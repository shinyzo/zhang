package com.lming.zhang.upms.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.upms.dao.mapper.UpmsUserPermissionMapper;
import com.lming.zhang.upms.dao.model.UpmsUserPermission;
import com.lming.zhang.upms.dao.model.UpmsUserPermissionExample;
import com.lming.zhang.upms.rpc.api.UpmsUserPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* UpmsUserPermissionService实现
* Created by zhanglm on 2018/4/26.
*/
@Service
@Transactional
@BaseService
public class UpmsUserPermissionServiceImpl extends BaseServiceImpl<UpmsUserPermissionMapper, UpmsUserPermission, UpmsUserPermissionExample> implements UpmsUserPermissionService {


    @Autowired
    UpmsUserPermissionMapper upmsUserPermissionMapper;

}