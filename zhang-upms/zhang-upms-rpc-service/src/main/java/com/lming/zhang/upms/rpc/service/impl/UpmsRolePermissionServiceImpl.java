package com.lming.zhang.upms.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.upms.dao.mapper.UpmsRolePermissionMapper;
import com.lming.zhang.upms.dao.model.UpmsRolePermission;
import com.lming.zhang.upms.dao.model.UpmsRolePermissionExample;
import com.lming.zhang.upms.rpc.api.UpmsRolePermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
* UpmsRolePermissionService实现
* Created by zhanglm on 2018/4/26.
*/
@Service
@Transactional
@BaseService
public class UpmsRolePermissionServiceImpl extends BaseServiceImpl<UpmsRolePermissionMapper, UpmsRolePermission, UpmsRolePermissionExample> implements UpmsRolePermissionService {


    @Autowired
    UpmsRolePermissionMapper upmsRolePermissionMapper;

    public int rolePermission(Integer roleId,List<String> permissionIds){
        UpmsRolePermissionExample example = new UpmsRolePermissionExample();
        example.createCriteria().andRoleIdEqualTo(roleId);
        upmsRolePermissionMapper.deleteByExample(example);
        for(int i=0;i<permissionIds.size();i++)
        {
            UpmsRolePermission upmsRolePermission = new UpmsRolePermission();
            upmsRolePermission.setRoleId(roleId);
            upmsRolePermission.setPermissionId(Integer.parseInt(permissionIds.get(i)));
            upmsRolePermissionMapper.insertSelective(upmsRolePermission);
        }
        return permissionIds.size();
    }

}