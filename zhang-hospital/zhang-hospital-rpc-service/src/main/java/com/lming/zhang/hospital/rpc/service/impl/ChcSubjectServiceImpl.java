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
public class ChcSubjectServiceImpl extends BaseServiceImpl<ChcSubjectMapper, ChcSubject, ChcSubjectExample> implements ChcSubjectService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcSubjectServiceImpl.class);

    public static final String SUBJECT_CACHE_KEY = "subject_";

    @Autowired
    ChcSubjectMapper chcSubjectMapper;

    @CacheEvict(value="subjectCache",key="SUBJECT_CACHE_KEY+'#id'")
    @Override
    public int deleteByPrimaryKey(Integer id) {
        return super.deleteByPrimaryKey(id);
    }
    @CachePut(value="subjectCache",key="SUBJECT_CACHE_KEY+'#chcSubject.subjectId'")
    @Override
    public int insert(ChcSubject chcSubject) {
        return super.insert(chcSubject);
    }


    @Override
    public List<ChcSubject> selectByExample(ChcSubjectExample chcSubjectExample) {
        return super.selectByExample(chcSubjectExample);
    }

    @Cacheable(value="subjectCache",key="SUBJECT_CACHE_KEY+'#id'")
    @Override
    public ChcSubject selectByPrimaryKey(Integer id) {
        return super.selectByPrimaryKey(id);
    }

    @Override
    public int updateByExampleSelective(ChcSubject chcSubject, ChcSubjectExample chcSubjectExample) {
        return super.updateByExampleSelective(chcSubject, chcSubjectExample);
    }
}