package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcDoctorInfoMapper {
    long countByExample(ChcDoctorInfoExample example);

    int deleteByExample(ChcDoctorInfoExample example);

    int deleteByPrimaryKey(@Param("doctorId") Integer doctorId, @Param("idCardNo") String idCardNo);

    int insert(ChcDoctorInfo record);

    int insertSelective(ChcDoctorInfo record);

    List<ChcDoctorInfo> selectByExample(ChcDoctorInfoExample example);

    ChcDoctorInfo selectByPrimaryKey(@Param("doctorId") Integer doctorId, @Param("idCardNo") String idCardNo);

    int updateByExampleSelective(@Param("record") ChcDoctorInfo record, @Param("example") ChcDoctorInfoExample example);

    int updateByExample(@Param("record") ChcDoctorInfo record, @Param("example") ChcDoctorInfoExample example);

    int updateByPrimaryKeySelective(ChcDoctorInfo record);

    int updateByPrimaryKey(ChcDoctorInfo record);
}