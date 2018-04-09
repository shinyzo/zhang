package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcSubjectMapper;
import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.dao.model.ChcSubjectExample;
import com.lming.zhang.hospital.rpc.api.ChcSubjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcSubjectService实现
* Created by shuzheng on 2018/4/9.
*/
@Service
@Transactional
@BaseService
public class ChcSubjectServiceImpl extends BaseServiceImpl<ChcSubjectMapper, ChcSubject, ChcSubjectExample> implements ChcSubjectService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcSubjectServiceImpl.class);

    @Autowired
    ChcSubjectMapper chcSubjectMapper;

}