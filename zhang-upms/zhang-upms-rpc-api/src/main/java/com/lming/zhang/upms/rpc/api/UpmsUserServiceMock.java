package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.upms.dao.mapper.UpmsUserMapper;
import com.lming.zhang.upms.dao.model.UpmsUser;
import com.lming.zhang.upms.dao.model.UpmsUserExample;
import lombok.extern.slf4j.Slf4j;

/**
* 降级实现UpmsUserService接口
* Created by zhanglm on 2018/4/23.
*/
@Slf4j
public class UpmsUserServiceMock extends BaseServiceMock<UpmsUserMapper, UpmsUser, UpmsUserExample> implements UpmsUserService {

    public UpmsUser createUser(UpmsUser upmsUser) {
        log.info("==> UpmsUserServiceMock >>>  createUser()");
        return null;
    }
}
