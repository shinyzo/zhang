package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseService;
import com.lming.zhang.upms.dao.model.UpmsUserPermission;
import com.lming.zhang.upms.dao.model.UpmsUserPermissionExample;

import java.util.List;

/**
* UpmsUserPermissionService接口
* Created by zhanglm on 2018/4/23.
*/
public interface UpmsUserPermissionService extends BaseService<UpmsUserPermission, UpmsUserPermissionExample> {

    public int userPermission(Integer userId, List<Integer> addList,List<Integer> minusList);

}