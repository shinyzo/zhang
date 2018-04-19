package com.lming.zhang.hospital.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.hospital.dao.mapper.AclLogMapper;
import com.lming.zhang.hospital.dao.model.AclLog;
import com.lming.zhang.hospital.dao.model.AclLogExample;

/**
* 降级实现AclLogService接口
* Created by zhanglm on 2018/4/19.
*/
public class AclLogServiceMock extends BaseServiceMock<AclLogMapper, AclLog, AclLogExample> implements AclLogService {

}
