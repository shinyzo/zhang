package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.upms.dao.mapper.UpmsUserPermissionMapper;
import com.lming.zhang.upms.dao.model.UpmsUserPermission;
import com.lming.zhang.upms.dao.model.UpmsUserPermissionExample;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

/**
* 降级实现UpmsUserPermissionService接口
* Created by zhanglm on 2018/4/23.
*/
@Slf4j
public class UpmsUserPermissionServiceMock extends BaseServiceMock<UpmsUserPermissionMapper, UpmsUserPermission, UpmsUserPermissionExample> implements UpmsUserPermissionService {

    public int userPermission(Integer userId, List<Integer> addList, List<Integer> minusList) {
        log.info(">>>> UpmsUserPermissionServiceMock.userPermission()");
        return 0;
    }
}
