package com.lming.zhang.upms.server.converter;

import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.server.vo.TreeNodeVO;

import java.util.ArrayList;
import java.util.List;

/**
 * 权限资源管理转换成树形结构
 */
public class UpmsPermission2TreeNodeVOConverter {

    public static List<TreeNodeVO> converter(List<UpmsPermission> upmsPermissionList){
        List<TreeNodeVO> treeNodeVOList = new ArrayList<>();
        for(int i=0;i<upmsPermissionList.size();i++)
        {
            treeNodeVOList.add(converter(upmsPermissionList.get(i)));
        }
        return treeNodeVOList;
    }


    public static TreeNodeVO converter(UpmsPermission upmsPermission){
        TreeNodeVO treeNodeVO = new TreeNodeVO();
        treeNodeVO.setId(upmsPermission.getPermissionId().toString());
        treeNodeVO.setText(upmsPermission.getName());
        treeNodeVO.setChecked(false);
        treeNodeVO.setIconCls(upmsPermission.getIcon());
        treeNodeVO.setPid(upmsPermission.getPid().toString());
        return treeNodeVO;
    }
}
