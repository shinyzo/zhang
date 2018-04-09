package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcProductKu;
import com.lming.zhang.hospital.dao.model.ChcProductKuExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcProductKuMapper {
    long countByExample(ChcProductKuExample example);

    int deleteByExample(ChcProductKuExample example);

    int deleteByPrimaryKey(@Param("productId") String productId, @Param("productCode") String productCode);

    int insert(ChcProductKu record);

    int insertSelective(ChcProductKu record);

    List<ChcProductKu> selectByExample(ChcProductKuExample example);

    ChcProductKu selectByPrimaryKey(@Param("productId") String productId, @Param("productCode") String productCode);

    int updateByExampleSelective(@Param("record") ChcProductKu record, @Param("example") ChcProductKuExample example);

    int updateByExample(@Param("record") ChcProductKu record, @Param("example") ChcProductKuExample example);

    int updateByPrimaryKeySelective(ChcProductKu record);

    int updateByPrimaryKey(ChcProductKu record);
}