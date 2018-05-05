package com.lming.zhang.upms.rpc.service.impl;

import com.lming.zhang.common.annotation.BaseService;
import com.lming.zhang.common.base.BaseServiceImpl;
import com.lming.zhang.upms.dao.mapper.UpmsUserPermissionMapper;
import com.lming.zhang.upms.dao.model.UpmsUserPermission;
import com.lming.zhang.upms.dao.model.UpmsUserPermissionExample;
import com.lming.zhang.upms.rpc.api.UpmsUserPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;

/**
* UpmsUserPermissionService实现
* Created by zhanglm on 2018/4/26.
*/
@Service
@Transactional
@BaseService
public class UpmsUserPermissionServiceImpl extends BaseServiceImpl<UpmsUserPermissionMapper, UpmsUserPermission, UpmsUserPermissionExample> implements UpmsUserPermissionService {


    @Autowired
    UpmsUserPermissionMapper upmsUserPermissionMapper;



    @Transactional
    @Override
    public int userPermission(Integer userId, List<Integer> addPermissionList, List<Integer> minusPermissionList) {
        // 删除原先的加减权限
        UpmsUserPermissionExample example = new UpmsUserPermissionExample();
        example.createCriteria().andUserIdEqualTo(userId);
        upmsUserPermissionMapper.deleteByExample(example);

        int count = 0;
        // 新增加权限
        if(!CollectionUtils.isEmpty(addPermissionList)){
            for(Integer permissionid :addPermissionList)
            {
                UpmsUserPermission upmsUserPermission = new UpmsUserPermission();
                upmsUserPermission.setUserId(userId);
                upmsUserPermission.setPermissionId(permissionid);
                upmsUserPermission.setType((byte) 1);
                count += upmsUserPermissionMapper.insertSelective(upmsUserPermission);

            }
        }


        // 新增减权限
        if(!CollectionUtils.isEmpty(minusPermissionList)){
            for(Integer permissionid :minusPermissionList)
            {
                UpmsUserPermission upmsUserPermission = new UpmsUserPermission();
                upmsUserPermission.setUserId(userId);
                upmsUserPermission.setPermissionId(permissionid);
                upmsUserPermission.setType((byte) -1);
                count += upmsUserPermissionMapper.insertSelective(upmsUserPermission);
            }
        }


        return count;
    }
}