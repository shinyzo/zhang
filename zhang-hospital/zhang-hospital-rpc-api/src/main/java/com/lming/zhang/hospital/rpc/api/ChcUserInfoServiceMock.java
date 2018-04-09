package com.lming.zhang.hospital.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.hospital.dao.mapper.ChcUserInfoMapper;
import com.lming.zhang.hospital.dao.model.ChcUserInfo;
import com.lming.zhang.hospital.dao.model.ChcUserInfoExample;

/**
* 降级实现ChcUserInfoService接口
* Created by zhanglm on 2018/4/9.
*/
public class ChcUserInfoServiceMock extends BaseServiceMock<ChcUserInfoMapper, ChcUserInfo, ChcUserInfoExample> implements ChcUserInfoService {

}
