package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcUserInfo;
import com.lming.zhang.hospital.dao.model.ChcUserInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcUserInfoMapper {
    long countByExample(ChcUserInfoExample example);

    int deleteByExample(ChcUserInfoExample example);

    int deleteByPrimaryKey(@Param("id") Integer id, @Param("openid") String openid);

    int insert(ChcUserInfo record);

    int insertSelective(ChcUserInfo record);

    List<ChcUserInfo> selectByExample(ChcUserInfoExample example);

    ChcUserInfo selectByPrimaryKey(@Param("id") Integer id, @Param("openid") String openid);

    int updateByExampleSelective(@Param("record") ChcUserInfo record, @Param("example") ChcUserInfoExample example);

    int updateByExample(@Param("record") ChcUserInfo record, @Param("example") ChcUserInfoExample example);

    int updateByPrimaryKeySelective(ChcUserInfo record);

    int updateByPrimaryKey(ChcUserInfo record);
}