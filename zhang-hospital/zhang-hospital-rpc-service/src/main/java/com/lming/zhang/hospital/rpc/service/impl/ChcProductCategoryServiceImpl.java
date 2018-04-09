package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.hospital.dao.mapper.ChcProductCategoryMapper;
import com.lming.zhang.hospital.dao.model.ChcProductCategory;
import com.lming.zhang.hospital.dao.model.ChcProductCategoryExample;
import com.lming.zhang.hospital.rpc.api.ChcProductCategoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
* ChcProductCategoryService实现
* Created by shuzheng on 2018/4/9.
*/
@Service
@Transactional
@BaseService
public class ChcProductCategoryServiceImpl extends BaseServiceImpl<ChcProductCategoryMapper, ChcProductCategory, ChcProductCategoryExample> implements ChcProductCategoryService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcProductCategoryServiceImpl.class);

    @Autowired
    ChcProductCategoryMapper chcProductCategoryMapper;

}