package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcDoctorLevel;
import com.lming.zhang.hospital.dao.model.ChcDoctorLevelExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcDoctorLevelMapper {
    long countByExample(ChcDoctorLevelExample example);

    int deleteByExample(ChcDoctorLevelExample example);

    int deleteByPrimaryKey(Integer levelId);

    int insert(ChcDoctorLevel record);

    int insertSelective(ChcDoctorLevel record);

    List<ChcDoctorLevel> selectByExample(ChcDoctorLevelExample example);

    ChcDoctorLevel selectByPrimaryKey(Integer levelId);

    int updateByExampleSelective(@Param("record") ChcDoctorLevel record, @Param("example") ChcDoctorLevelExample example);

    int updateByExample(@Param("record") ChcDoctorLevel record, @Param("example") ChcDoctorLevelExample example);

    int updateByPrimaryKeySelective(ChcDoctorLevel record);

    int updateByPrimaryKey(ChcDoctorLevel record);
}