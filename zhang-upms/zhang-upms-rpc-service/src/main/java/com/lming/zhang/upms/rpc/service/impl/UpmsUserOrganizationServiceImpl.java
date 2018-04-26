package com.lming.zhang.upms.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.upms.dao.mapper.UpmsUserOrganizationMapper;
import com.lming.zhang.upms.dao.model.UpmsUserOrganization;
import com.lming.zhang.upms.dao.model.UpmsUserOrganizationExample;
import com.lming.zhang.upms.rpc.api.UpmsUserOrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* UpmsUserOrganizationService实现
* Created by zhanglm on 2018/4/26.
*/
@Service
@Transactional
@BaseService
public class UpmsUserOrganizationServiceImpl extends BaseServiceImpl<UpmsUserOrganizationMapper, UpmsUserOrganization, UpmsUserOrganizationExample> implements UpmsUserOrganizationService {


    @Autowired
    UpmsUserOrganizationMapper upmsUserOrganizationMapper;

}