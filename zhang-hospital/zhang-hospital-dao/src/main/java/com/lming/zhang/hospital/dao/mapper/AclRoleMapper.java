package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.AclRole;
import com.lming.zhang.hospital.dao.model.AclRoleExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AclRoleMapper {
    long countByExample(AclRoleExample example);

    int deleteByExample(AclRoleExample example);

    int deleteByPrimaryKey(Integer roleId);

    int insert(AclRole record);

    int insertSelective(AclRole record);

    List<AclRole> selectByExample(AclRoleExample example);

    AclRole selectByPrimaryKey(Integer roleId);

    int updateByExampleSelective(@Param("record") AclRole record, @Param("example") AclRoleExample example);

    int updateByExample(@Param("record") AclRole record, @Param("example") AclRoleExample example);

    int updateByPrimaryKeySelective(AclRole record);

    int updateByPrimaryKey(AclRole record);
}