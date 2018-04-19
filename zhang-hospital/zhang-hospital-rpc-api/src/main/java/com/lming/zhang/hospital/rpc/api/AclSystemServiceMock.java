package com.lming.zhang.hospital.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.hospital.dao.mapper.AclSystemMapper;
import com.lming.zhang.hospital.dao.model.AclSystem;
import com.lming.zhang.hospital.dao.model.AclSystemExample;

/**
* 降级实现AclSystemService接口
* Created by zhanglm on 2018/4/19.
*/
public class AclSystemServiceMock extends BaseServiceMock<AclSystemMapper, AclSystem, AclSystemExample> implements AclSystemService {

}
