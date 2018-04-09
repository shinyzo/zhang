package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcPlatNav;
import com.lming.zhang.hospital.dao.model.ChcPlatNavExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcPlatNavMapper {
    long countByExample(ChcPlatNavExample example);

    int deleteByExample(ChcPlatNavExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(ChcPlatNav record);

    int insertSelective(ChcPlatNav record);

    List<ChcPlatNav> selectByExample(ChcPlatNavExample example);

    ChcPlatNav selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") ChcPlatNav record, @Param("example") ChcPlatNavExample example);

    int updateByExample(@Param("record") ChcPlatNav record, @Param("example") ChcPlatNavExample example);

    int updateByPrimaryKeySelective(ChcPlatNav record);

    int updateByPrimaryKey(ChcPlatNav record);
}