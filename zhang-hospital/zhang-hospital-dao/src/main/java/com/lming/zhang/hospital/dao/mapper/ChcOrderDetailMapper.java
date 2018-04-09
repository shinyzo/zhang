package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcOrderDetail;
import com.lming.zhang.hospital.dao.model.ChcOrderDetailExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcOrderDetailMapper {
    long countByExample(ChcOrderDetailExample example);

    int deleteByExample(ChcOrderDetailExample example);

    int deleteByPrimaryKey(String detailId);

    int insert(ChcOrderDetail record);

    int insertSelective(ChcOrderDetail record);

    List<ChcOrderDetail> selectByExample(ChcOrderDetailExample example);

    ChcOrderDetail selectByPrimaryKey(String detailId);

    int updateByExampleSelective(@Param("record") ChcOrderDetail record, @Param("example") ChcOrderDetailExample example);

    int updateByExample(@Param("record") ChcOrderDetail record, @Param("example") ChcOrderDetailExample example);

    int updateByPrimaryKeySelective(ChcOrderDetail record);

    int updateByPrimaryKey(ChcOrderDetail record);
}