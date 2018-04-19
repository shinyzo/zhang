package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.AclUser;
import com.lming.zhang.hospital.dao.model.AclUserExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AclUserMapper {
    long countByExample(AclUserExample example);

    int deleteByExample(AclUserExample example);

    int deleteByPrimaryKey(@Param("userId") Integer userId, @Param("openid") String openid, @Param("loginName") String loginName);

    int insert(AclUser record);

    int insertSelective(AclUser record);

    List<AclUser> selectByExample(AclUserExample example);

    AclUser selectByPrimaryKey(@Param("userId") Integer userId, @Param("openid") String openid, @Param("loginName") String loginName);

    int updateByExampleSelective(@Param("record") AclUser record, @Param("example") AclUserExample example);

    int updateByExample(@Param("record") AclUser record, @Param("example") AclUserExample example);

    int updateByPrimaryKeySelective(AclUser record);

    int updateByPrimaryKey(AclUser record);
}