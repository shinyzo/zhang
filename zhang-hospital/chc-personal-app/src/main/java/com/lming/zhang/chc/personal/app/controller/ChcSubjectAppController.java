package com.lming.zhang.chc.personal.app.controller;

import com.lming.zhang.hospital.common.constants.ChcResult;
import com.lming.zhang.hospital.common.constants.ChcResultEnum;
import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.dao.model.ChcSubjectExample;
import com.lming.zhang.hospital.rpc.api.ChcSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

/**
 * Auth : shinyzo
 * Date : 2018/4/9
 * description : resuful api
 */
@RestController
@RequestMapping("/api")
public class ChcSubjectAppController {

    @Autowired
    private ChcSubjectService chcSubjectService;


    /**
     * 查询所有
     * @return
     */
    @RequestMapping(value="/subject",method = RequestMethod.GET)
    public ChcResult findAll(){

        // stringRedisTemplate.opsForValue().set("RRRR","RRRRR");
        ChcSubjectExample example = new ChcSubjectExample();
        return new ChcResult(ChcResultEnum.SUCCESS,chcSubjectService.selectByExample(example));
    }

    /**
     * 按主键查询
     * @param subjectId
     * @return
     */
    @RequestMapping(value="/subject/{subjectId}",method = RequestMethod.GET)
    public ChcResult findOne(@PathVariable("subjectId") String subjectId){
        ChcSubject subject = chcSubjectService.selectByPrimaryKey(subjectId);
        return new ChcResult(ChcResultEnum.SUCCESS,subject);
    }

    /**
     * 新增数据
     * @param chcSubject
     */
    @RequestMapping(value="/subject",method = RequestMethod.POST)
    public ChcResult add(ChcSubject chcSubject){
        int count = chcSubjectService.insertSelective(chcSubject);

        return new ChcResult(ChcResultEnum.SUCCESS,count);
    }

    /**
     * 修改数据
     * @param chcSubject
     */
    @RequestMapping(value = "/subject",method = RequestMethod.PUT)
    public ChcResult update(ChcSubject chcSubject){
        int count = chcSubjectService.updateByPrimaryKey(chcSubject);
        return new ChcResult(ChcResultEnum.SUCCESS,count);
    }

    /**
     * 删除数据
     * @param subjectId
     */
    @RequestMapping(value = "/subject/{subjectId}",method = RequestMethod.DELETE)
    public ChcResult delete(@PathVariable String subjectId){
        int count = chcSubjectService.deleteByPrimaryKey(subjectId);
        return new ChcResult(ChcResultEnum.SUCCESS,count);
    }

}
