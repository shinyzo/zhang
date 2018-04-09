package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcOrderMaster;
import com.lming.zhang.hospital.dao.model.ChcOrderMasterExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcOrderMasterMapper {
    long countByExample(ChcOrderMasterExample example);

    int deleteByExample(ChcOrderMasterExample example);

    int deleteByPrimaryKey(String orderId);

    int insert(ChcOrderMaster record);

    int insertSelective(ChcOrderMaster record);

    List<ChcOrderMaster> selectByExample(ChcOrderMasterExample example);

    ChcOrderMaster selectByPrimaryKey(String orderId);

    int updateByExampleSelective(@Param("record") ChcOrderMaster record, @Param("example") ChcOrderMasterExample example);

    int updateByExample(@Param("record") ChcOrderMaster record, @Param("example") ChcOrderMasterExample example);

    int updateByPrimaryKeySelective(ChcOrderMaster record);

    int updateByPrimaryKey(ChcOrderMaster record);
}