package com.lming.zhang.upms.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.upms.dao.mapper.UpmsOrganizationMapper;
import com.lming.zhang.upms.dao.model.UpmsOrganization;
import com.lming.zhang.upms.dao.model.UpmsOrganizationExample;
import com.lming.zhang.upms.rpc.api.UpmsOrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* UpmsOrganizationService实现
* Created by zhanglm on 2018/4/26.
*/
@Service
@Transactional
@BaseService
public class UpmsOrganizationServiceImpl extends BaseServiceImpl<UpmsOrganizationMapper, UpmsOrganization, UpmsOrganizationExample> implements UpmsOrganizationService {


    @Autowired
    UpmsOrganizationMapper upmsOrganizationMapper;

}