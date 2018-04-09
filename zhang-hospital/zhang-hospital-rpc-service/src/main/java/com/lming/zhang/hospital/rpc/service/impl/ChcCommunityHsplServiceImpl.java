package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcCommunityHsplMapper;
import com.lming.zhang.hospital.dao.model.ChcCommunityHspl;
import com.lming.zhang.hospital.dao.model.ChcCommunityHsplExample;
import com.lming.zhang.hospital.rpc.api.ChcCommunityHsplService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcCommunityHsplService实现
* Created by shuzheng on 2018/4/9.
*/
@Service
@Transactional
@BaseService
public class ChcCommunityHsplServiceImpl extends BaseServiceImpl<ChcCommunityHsplMapper, ChcCommunityHspl, ChcCommunityHsplExample> implements ChcCommunityHsplService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcCommunityHsplServiceImpl.class);

    @Autowired
    ChcCommunityHsplMapper chcCommunityHsplMapper;

}