package com.lming.zhang.hospital.rpc.service.impl;

import com.lming.zhang.common.util.SpringContextUtil;
import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.rpc.ZhangHospitalRpcServiceApplication;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

/**
 * Auth : shinyzo
 * Date : 2018/4/10
 * description : xxxx
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class ChcSubjectServiceImplTest {

    @Autowired
    private ChcSubjectServiceImpl chcSubjectService;

    @Test
    public void deleteByPrimaryKey() throws Exception {
        //chcSubjectService.deleteByPrimaryKey();
    }

    @Test
    public void insert() throws Exception {
        ApplicationContext app = SpringApplication.run(ZhangHospitalRpcServiceApplication.class);
        // 将上下文注入
        SpringContextUtil.setApplicationContext(app);
        ChcSubject chcSubject = new ChcSubject();
        chcSubject.setSubjectId("A00002");
        chcSubject.setSubjectName("test");
        int count = chcSubjectService.insert(chcSubject);
        Assert.assertEquals(1,count);
    }

    @Test
    public void selectByExample() throws Exception {
    }

    @Test
    public void selectByPrimaryKey() throws Exception {
    }

    @Test
    public void updateByExampleSelective() throws Exception {
    }

}