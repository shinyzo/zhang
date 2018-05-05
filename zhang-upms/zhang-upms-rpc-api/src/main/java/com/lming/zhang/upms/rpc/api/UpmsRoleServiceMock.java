package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.upms.dao.mapper.UpmsRoleMapper;
import com.lming.zhang.upms.dao.model.UpmsRole;
import com.lming.zhang.upms.dao.model.UpmsRoleExample;
import lombok.extern.slf4j.Slf4j;

/**
* 降级实现UpmsRoleService接口
* Created by zhanglm on 2018/4/23.
*/
@Slf4j
public class UpmsRoleServiceMock extends BaseServiceMock<UpmsRoleMapper, UpmsRole, UpmsRoleExample> implements UpmsRoleService {

    public int deleteRoleAndPermissions(Integer roleId) {
        log.info(">>>> UpmsRoleServiceMock.deleteRoleAndPermissions() ");
        return 0;
    }
}
