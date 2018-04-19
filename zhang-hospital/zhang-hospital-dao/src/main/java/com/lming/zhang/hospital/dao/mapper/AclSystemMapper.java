package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.AclSystem;
import com.lming.zhang.hospital.dao.model.AclSystemExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AclSystemMapper {
    long countByExample(AclSystemExample example);

    int deleteByExample(AclSystemExample example);

    int deleteByPrimaryKey(Integer systemId);

    int insert(AclSystem record);

    int insertSelective(AclSystem record);

    List<AclSystem> selectByExample(AclSystemExample example);

    AclSystem selectByPrimaryKey(Integer systemId);

    int updateByExampleSelective(@Param("record") AclSystem record, @Param("example") AclSystemExample example);

    int updateByExample(@Param("record") AclSystem record, @Param("example") AclSystemExample example);

    int updateByPrimaryKeySelective(AclSystem record);

    int updateByPrimaryKey(AclSystem record);
}