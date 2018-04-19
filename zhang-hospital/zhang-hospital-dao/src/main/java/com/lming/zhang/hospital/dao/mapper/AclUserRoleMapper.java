package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.AclUserRole;
import com.lming.zhang.hospital.dao.model.AclUserRoleExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AclUserRoleMapper {
    long countByExample(AclUserRoleExample example);

    int deleteByExample(AclUserRoleExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(AclUserRole record);

    int insertSelective(AclUserRole record);

    List<AclUserRole> selectByExample(AclUserRoleExample example);

    AclUserRole selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") AclUserRole record, @Param("example") AclUserRoleExample example);

    int updateByExample(@Param("record") AclUserRole record, @Param("example") AclUserRoleExample example);

    int updateByPrimaryKeySelective(AclUserRole record);

    int updateByPrimaryKey(AclUserRole record);
}