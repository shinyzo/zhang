package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.dao.model.ChcSubjectExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcSubjectMapper {
    long countByExample(ChcSubjectExample example);

    int deleteByExample(ChcSubjectExample example);

    int deleteByPrimaryKey(String subjectId);

    int insert(ChcSubject record);

    int insertSelective(ChcSubject record);

    List<ChcSubject> selectByExample(ChcSubjectExample example);

    ChcSubject selectByPrimaryKey(String subjectId);

    int updateByExampleSelective(@Param("record") ChcSubject record, @Param("example") ChcSubjectExample example);

    int updateByExample(@Param("record") ChcSubject record, @Param("example") ChcSubjectExample example);

    int updateByPrimaryKeySelective(ChcSubject record);

    int updateByPrimaryKey(ChcSubject record);
}