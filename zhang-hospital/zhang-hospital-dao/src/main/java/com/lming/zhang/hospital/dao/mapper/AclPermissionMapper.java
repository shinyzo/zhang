package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.AclPermission;
import com.lming.zhang.hospital.dao.model.AclPermissionExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AclPermissionMapper {
    long countByExample(AclPermissionExample example);

    int deleteByExample(AclPermissionExample example);

    int deleteByPrimaryKey(Integer permissionId);

    int insert(AclPermission record);

    int insertSelective(AclPermission record);

    List<AclPermission> selectByExample(AclPermissionExample example);

    AclPermission selectByPrimaryKey(Integer permissionId);

    int updateByExampleSelective(@Param("record") AclPermission record, @Param("example") AclPermissionExample example);

    int updateByExample(@Param("record") AclPermission record, @Param("example") AclPermissionExample example);

    int updateByPrimaryKeySelective(AclPermission record);

    int updateByPrimaryKey(AclPermission record);
}