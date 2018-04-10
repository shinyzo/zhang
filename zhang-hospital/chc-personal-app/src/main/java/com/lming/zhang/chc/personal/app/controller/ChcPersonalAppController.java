package com.lming.zhang.chc.personal.app.controller;

import com.lming.zhang.hospital.common.ResultVO;
import com.lming.zhang.hospital.common.ResultVOUtils;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.dao.model.ChcSubjectExample;
import com.lming.zhang.hospital.rpc.api.ChcSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Auth : shinyzo
 * Date : 2018/4/9
 * description : resuful api
 */
@RestController
@RequestMapping("/api")
public class ChcPersonalAppController {

    @Autowired
    private ChcSubjectService chcSubjectService;


    /**
     * 查询所有
     * @return
     */
    @RequestMapping(value="/subject",method = RequestMethod.GET)
    public ResultVO findAll(){
        ChcSubjectExample example = new ChcSubjectExample();
        return ResultVOUtils.success(chcSubjectService.selectByExample(example));
    }

    /**
     * 按主键查询
     * @param subjectId
     * @return
     */
    @RequestMapping(value="/subject/{subjectId}",method = RequestMethod.GET)
    public ResultVO findOne(@PathVariable("subjectId") String subjectId){
        ChcSubjectExample example = new ChcSubjectExample();
        example.or().andSubjectIdEqualTo(subjectId);
        return ResultVOUtils.success(chcSubjectService.selectByExample(example));
    }

    /**
     * 新增数据
     * @param chcSubject
     */
    @RequestMapping(value="/subject",method = RequestMethod.POST)
    public ResultVO add(ChcSubject chcSubject){
        chcSubjectService.insertSelective(chcSubject);
        return ResultVOUtils.success(chcSubject);
    }

    /**
     * 修改数据
     * @param chcSubject
     */
    @RequestMapping(value = "/subject",method = RequestMethod.PUT)
    public ResultVO update(ChcSubject chcSubject){
        chcSubjectService.updateByPrimaryKey(chcSubject);
        return ResultVOUtils.success(chcSubject);
    }

    /**
     * 删除数据
     * @param subjectId
     */
    @RequestMapping(value = "/subject/{subjectId}",method = RequestMethod.DELETE)
    public ResultVO delete(@PathVariable String subjectId){
        ChcSubjectExample example = new ChcSubjectExample();
        example.or().andSubjectIdEqualTo(subjectId);
        chcSubjectService.deleteByExample(example);
        return ResultVOUtils.success(subjectId);
    }

}
