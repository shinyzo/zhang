package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcCommunityHspl;
import com.lming.zhang.hospital.dao.model.ChcCommunityHsplExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcCommunityHsplMapper {
    long countByExample(ChcCommunityHsplExample example);

    int deleteByExample(ChcCommunityHsplExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(ChcCommunityHspl record);

    int insertSelective(ChcCommunityHspl record);

    List<ChcCommunityHspl> selectByExample(ChcCommunityHsplExample example);

    ChcCommunityHspl selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") ChcCommunityHspl record, @Param("example") ChcCommunityHsplExample example);

    int updateByExample(@Param("record") ChcCommunityHspl record, @Param("example") ChcCommunityHsplExample example);

    int updateByPrimaryKeySelective(ChcCommunityHspl record);

    int updateByPrimaryKey(ChcCommunityHspl record);
}