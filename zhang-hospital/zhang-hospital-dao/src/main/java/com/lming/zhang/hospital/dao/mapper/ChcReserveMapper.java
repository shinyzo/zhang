package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcReserve;
import com.lming.zhang.hospital.dao.model.ChcReserveExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcReserveMapper {
    long countByExample(ChcReserveExample example);

    int deleteByExample(ChcReserveExample example);

    int deleteByPrimaryKey(String reserveId);

    int insert(ChcReserve record);

    int insertSelective(ChcReserve record);

    List<ChcReserve> selectByExample(ChcReserveExample example);

    ChcReserve selectByPrimaryKey(String reserveId);

    int updateByExampleSelective(@Param("record") ChcReserve record, @Param("example") ChcReserveExample example);

    int updateByExample(@Param("record") ChcReserve record, @Param("example") ChcReserveExample example);

    int updateByPrimaryKeySelective(ChcReserve record);

    int updateByPrimaryKey(ChcReserve record);
}