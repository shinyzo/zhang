package com.lming.zhang.hospital.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.hospital.dao.mapper.AclPermissionMapper;
import com.lming.zhang.hospital.dao.model.AclPermission;
import com.lming.zhang.hospital.dao.model.AclPermissionExample;

/**
* 降级实现AclPermissionService接口
* Created by zhanglm on 2018/4/19.
*/
public class AclPermissionServiceMock extends BaseServiceMock<AclPermissionMapper, AclPermission, AclPermissionExample> implements AclPermissionService {

}
