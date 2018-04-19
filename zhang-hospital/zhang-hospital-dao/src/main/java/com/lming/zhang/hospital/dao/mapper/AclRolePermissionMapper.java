package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.AclRolePermission;
import com.lming.zhang.hospital.dao.model.AclRolePermissionExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AclRolePermissionMapper {
    long countByExample(AclRolePermissionExample example);

    int deleteByExample(AclRolePermissionExample example);

    int deleteByPrimaryKey(Integer rolePermissionId);

    int insert(AclRolePermission record);

    int insertSelective(AclRolePermission record);

    List<AclRolePermission> selectByExample(AclRolePermissionExample example);

    AclRolePermission selectByPrimaryKey(Integer rolePermissionId);

    int updateByExampleSelective(@Param("record") AclRolePermission record, @Param("example") AclRolePermissionExample example);

    int updateByExample(@Param("record") AclRolePermission record, @Param("example") AclRolePermissionExample example);

    int updateByPrimaryKeySelective(AclRolePermission record);

    int updateByPrimaryKey(AclRolePermission record);
}