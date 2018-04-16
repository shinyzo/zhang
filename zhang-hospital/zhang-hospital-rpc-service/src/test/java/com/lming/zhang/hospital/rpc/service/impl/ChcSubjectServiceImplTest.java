package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.util.SpringContextUtil;
import com.lming.zhang.hospital.rpc.ZhangHospitalRpcServiceApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

/**
 * Auth : shinyzo
 * Date : 2018/4/13
 * description : xxxx
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class ChcSubjectServiceImplTest {

    @Autowired
    private StringRedisTemplate redisTemplate;
    @Test
    public void deleteByPrimaryKey() throws Exception {
    }

    @Test
    public void insert() throws Exception {
//        ApplicationContext app = SpringApplication.run(ZhangHospitalRpcServiceApplication.class);
//        // 将上下文注入
//        SpringContextUtil.setApplicationContext(app);
        redisTemplate.opsForValue().set("1111","22222");
    }

    @Test
    public void selectByExample() throws Exception {
    }

    @Test
    public void selectByPrimaryKey() throws Exception {
    }

    @Test
    public void selectByPrimaryKey1() throws Exception {
    }

    @Test
    public void updateByExampleSelective() throws Exception {
    }

    @Test
    public void updateByPrimaryKey() throws Exception {
    }

}