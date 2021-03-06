package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseService;
import com.lming.zhang.upms.dao.model.UpmsRolePermission;
import com.lming.zhang.upms.dao.model.UpmsRolePermissionExample;

import java.util.List;

/**
* UpmsRolePermissionService接口
* Created by zhanglm on 2018/4/23.
*/
public interface UpmsRolePermissionService extends BaseService<UpmsRolePermission, UpmsRolePermissionExample> {

    public int rolePermission(Integer roleId,List<String> permissionIds);
}