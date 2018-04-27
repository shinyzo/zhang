package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.upms.dao.mapper.UpmsSystemMapper;
import com.lming.zhang.upms.dao.model.UpmsSystem;
import com.lming.zhang.upms.dao.model.UpmsSystemExample;
import lombok.extern.slf4j.Slf4j;

/**
* 降级实现UpmsSystemService接口
* Created by zhanglm on 2018/4/23.
*/
@Slf4j
public class UpmsSystemServiceMock extends BaseServiceMock<UpmsSystemMapper, UpmsSystem, UpmsSystemExample> implements UpmsSystemService {

    public UpmsSystem selectUpmsSystemByName(String name){
        log.info("==> UpmsSystemServiceMock.selectUpmsSystemByName()");
        return null;
    }
}
