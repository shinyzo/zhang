package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.AclLog;
import com.lming.zhang.hospital.dao.model.AclLogExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AclLogMapper {
    long countByExample(AclLogExample example);

    int deleteByExample(AclLogExample example);

    int deleteByPrimaryKey(Integer logId);

    int insert(AclLog record);

    int insertSelective(AclLog record);

    List<AclLog> selectByExampleWithBLOBs(AclLogExample example);

    List<AclLog> selectByExample(AclLogExample example);

    AclLog selectByPrimaryKey(Integer logId);

    int updateByExampleSelective(@Param("record") AclLog record, @Param("example") AclLogExample example);

    int updateByExampleWithBLOBs(@Param("record") AclLog record, @Param("example") AclLogExample example);

    int updateByExample(@Param("record") AclLog record, @Param("example") AclLogExample example);

    int updateByPrimaryKeySelective(AclLog record);

    int updateByPrimaryKeyWithBLOBs(AclLog record);

    int updateByPrimaryKey(AclLog record);
}