package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcCorpInfo;
import com.lming.zhang.hospital.dao.model.ChcCorpInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcCorpInfoMapper {
    long countByExample(ChcCorpInfoExample example);

    int deleteByExample(ChcCorpInfoExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(ChcCorpInfo record);

    int insertSelective(ChcCorpInfo record);

    List<ChcCorpInfo> selectByExample(ChcCorpInfoExample example);

    ChcCorpInfo selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") ChcCorpInfo record, @Param("example") ChcCorpInfoExample example);

    int updateByExample(@Param("record") ChcCorpInfo record, @Param("example") ChcCorpInfoExample example);

    int updateByPrimaryKeySelective(ChcCorpInfo record);

    int updateByPrimaryKey(ChcCorpInfo record);
}