package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcMobileNav;
import com.lming.zhang.hospital.dao.model.ChcMobileNavExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcMobileNavMapper {
    long countByExample(ChcMobileNavExample example);

    int deleteByExample(ChcMobileNavExample example);

    int deleteByPrimaryKey(String navId);

    int insert(ChcMobileNav record);

    int insertSelective(ChcMobileNav record);

    List<ChcMobileNav> selectByExample(ChcMobileNavExample example);

    ChcMobileNav selectByPrimaryKey(String navId);

    int updateByExampleSelective(@Param("record") ChcMobileNav record, @Param("example") ChcMobileNavExample example);

    int updateByExample(@Param("record") ChcMobileNav record, @Param("example") ChcMobileNavExample example);

    int updateByPrimaryKeySelective(ChcMobileNav record);

    int updateByPrimaryKey(ChcMobileNav record);
}