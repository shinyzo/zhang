package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcHospital;
import com.lming.zhang.hospital.dao.model.ChcHospitalExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcHospitalMapper {
    long countByExample(ChcHospitalExample example);

    int deleteByExample(ChcHospitalExample example);

    int deleteByPrimaryKey(Integer hospitalId);

    int insert(ChcHospital record);

    int insertSelective(ChcHospital record);

    List<ChcHospital> selectByExample(ChcHospitalExample example);

    ChcHospital selectByPrimaryKey(Integer hospitalId);

    int updateByExampleSelective(@Param("record") ChcHospital record, @Param("example") ChcHospitalExample example);

    int updateByExample(@Param("record") ChcHospital record, @Param("example") ChcHospitalExample example);

    int updateByPrimaryKeySelective(ChcHospital record);

    int updateByPrimaryKey(ChcHospital record);
}