package com.lming.zhang.upms.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.upms.dao.mapper.UpmsRoleMapper;
import com.lming.zhang.upms.dao.mapper.UpmsRolePermissionMapper;
import com.lming.zhang.upms.dao.model.UpmsRole;
import com.lming.zhang.upms.dao.model.UpmsRoleExample;
import com.lming.zhang.upms.dao.model.UpmsRolePermissionExample;
import com.lming.zhang.upms.rpc.api.UpmsRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* UpmsRoleService实现
* Created by zhanglm on 2018/4/26.
*/
@Service
@Transactional
@BaseService
public class UpmsRoleServiceImpl extends BaseServiceImpl<UpmsRoleMapper, UpmsRole, UpmsRoleExample> implements UpmsRoleService {


    @Autowired
    UpmsRoleMapper upmsRoleMapper;

    @Autowired
    UpmsRolePermissionMapper upmsRolePermissionMapper;

    @Override
    public int deleteRoleAndPermissions(Integer roleId) {
        UpmsRolePermissionExample upmsRolePermissionExample = new UpmsRolePermissionExample();
        upmsRolePermissionExample.createCriteria().andRoleIdEqualTo(roleId);
        upmsRolePermissionMapper.deleteByExample(upmsRolePermissionExample);
        return upmsRoleMapper.deleteByPrimaryKey(roleId);
    }
}