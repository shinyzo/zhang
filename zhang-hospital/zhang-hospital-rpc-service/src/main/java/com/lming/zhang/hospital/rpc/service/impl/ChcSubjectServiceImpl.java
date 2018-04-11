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
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
* ChcSubjectService实现
* Created by shuzheng on 2018/4/9.
*/
@Service
@Transactional
@BaseService
@CacheConfig(cacheNames = "subject")
public class ChcSubjectServiceImpl extends BaseServiceImpl<ChcSubjectMapper, ChcSubject, ChcSubjectExample> implements ChcSubjectService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcSubjectServiceImpl.class);

    public static final String SUBJECT_CACHE_KEY = "subject_";

    @Autowired
    ChcSubjectMapper chcSubjectMapper;

    @CacheEvict
    @Override
    public int deleteByPrimaryKey(Integer id) {
        return super.deleteByPrimaryKey(id);
    }

    @CachePut
    @Override
    public int insert(ChcSubject chcSubject) {
        return super.insert(chcSubject);
    }

    @Cacheable
    @Override
    public List<ChcSubject> selectByExample(ChcSubjectExample chcSubjectExample) {
        return super.selectByExample(chcSubjectExample);
    }

    @Cacheable
    @Override
    public ChcSubject selectByPrimaryKey(Integer id) {
        return super.selectByPrimaryKey(id);
    }

    @Cacheable
    @Override
    public ChcSubject selectByPrimaryKey(String key) {
        return super.selectByPrimaryKey(key);
    }

    @CachePut
    @Override
    public int updateByExampleSelective(ChcSubject chcSubject, ChcSubjectExample chcSubjectExample) {
        return super.updateByExampleSelective(chcSubject, chcSubjectExample);
    }

    @CachePut
    @Override
    public int updateByPrimaryKey(ChcSubject chcSubject) {
        return super.updateByPrimaryKey(chcSubject);
    }
}