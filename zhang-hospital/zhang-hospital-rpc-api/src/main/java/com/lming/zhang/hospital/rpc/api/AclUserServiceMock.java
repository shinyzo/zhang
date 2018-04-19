package com.lming.zhang.hospital.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.hospital.dao.mapper.AclUserMapper;
import com.lming.zhang.hospital.dao.model.AclUser;
import com.lming.zhang.hospital.dao.model.AclUserExample;

/**
* 降级实现AclUserService接口
* Created by zhanglm on 2018/4/19.
*/
public class AclUserServiceMock extends BaseServiceMock<AclUserMapper, AclUser, AclUserExample> implements AclUserService {

}
