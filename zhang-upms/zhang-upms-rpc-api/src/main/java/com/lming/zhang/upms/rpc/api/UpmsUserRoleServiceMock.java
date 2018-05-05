package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.upms.dao.mapper.UpmsUserRoleMapper;
import com.lming.zhang.upms.dao.model.UpmsUserRole;
import com.lming.zhang.upms.dao.model.UpmsUserRoleExample;
import lombok.extern.slf4j.Slf4j;

/**
* 降级实现UpmsUserRoleService接口
* Created by zhanglm on 2018/4/23.
*/
@Slf4j
public class UpmsUserRoleServiceMock extends BaseServiceMock<UpmsUserRoleMapper, UpmsUserRole, UpmsUserRoleExample> implements UpmsUserRoleService {


    @Override
    public int role(String[] roleIds, int id) {
        log.info("UpmsUserRoleServiceMock => role");
        return 0;
    }
}
