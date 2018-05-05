package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseService;
import com.lming.zhang.upms.dao.model.UpmsUserRole;
import com.lming.zhang.upms.dao.model.UpmsUserRoleExample;

/**
* UpmsUserRoleService接口
* Created by zhanglm on 2018/4/23.
*/
public interface UpmsUserRoleService extends BaseService<UpmsUserRole, UpmsUserRoleExample> {

    int role(String[] roleIds, int id);
}