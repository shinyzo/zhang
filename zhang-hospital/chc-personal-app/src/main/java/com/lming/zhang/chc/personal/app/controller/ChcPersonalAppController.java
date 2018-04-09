package com.lming.zhang.chc.personal.app.controller;

import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.dao.model.ChcSubjectExample;
import com.lming.zhang.hospital.rpc.api.ChcSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Auth : shinyzo
 * Date : 2018/4/9
 * description : xxxx
 */
@RestController
@RequestMapping("/personal")
public class ChcPersonalAppController {

    @Autowired
    private ChcSubjectService chcSubjectService;

    @GetMapping("/subject/list")
    public List<ChcSubject> list(){
        ChcSubjectExample example = new ChcSubjectExample();
        return chcSubjectService.selectByExample(example);
    }

    @GetMapping("/subject/add")
    public void add(){
        ChcSubject chcSubject = new ChcSubject();
        chcSubject.setSubjectId("7777");
        chcSubject.setSubjectName("AAAA");
        chcSubjectService.insertSelective(chcSubject);
    }

    @GetMapping("/subject/update/{subjectId}")
    public void update(@PathVariable String subjectId){
        ChcSubject chcSubject = new ChcSubject();
        chcSubject.setSubjectId(subjectId);
        chcSubject.setSubjectName("BBBB");
        chcSubjectService.updateByPrimaryKey(chcSubject);
    }

    @GetMapping("/subject/delete/{subjectId}")
    public void delete(@PathVariable String subjectId){
        ChcSubject chcSubject = new ChcSubject();
        chcSubject.setSubjectId(subjectId);
        chcSubjectService.deleteByPrimaryKeys(subjectId);
    }

}
