package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseService;
import com.lming.zhang.upms.dao.model.UpmsSystem;
import com.lming.zhang.upms.dao.model.UpmsSystemExample;

/**
* UpmsSystemService接口
* Created by zhanglm on 2018/4/23.
*/
public interface UpmsSystemService extends BaseService<UpmsSystem, UpmsSystemExample> {

    public UpmsSystem selectUpmsSystemByName(String name);

}