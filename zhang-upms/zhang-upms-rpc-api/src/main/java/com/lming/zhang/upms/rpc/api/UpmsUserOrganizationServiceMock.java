package com.lming.zhang.upms.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.upms.dao.mapper.UpmsUserOrganizationMapper;
import com.lming.zhang.upms.dao.model.UpmsUserOrganization;
import com.lming.zhang.upms.dao.model.UpmsUserOrganizationExample;
import lombok.extern.slf4j.Slf4j;

/**
* 降级实现UpmsUserOrganizationService接口
* Created by zhanglm on 2018/4/23.
*/
@Slf4j
public class UpmsUserOrganizationServiceMock extends BaseServiceMock<UpmsUserOrganizationMapper, UpmsUserOrganization, UpmsUserOrganizationExample> implements UpmsUserOrganizationService {

    @Override
    public int organization(String[] organizationIds, int id) {
        log.info("UpmsUserOrganizationServiceMock => organization");
        return 0;
    }
}
