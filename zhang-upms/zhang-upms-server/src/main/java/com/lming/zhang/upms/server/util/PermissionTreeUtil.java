package com.lming.zhang.upms.server.util;

import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.server.vo.PermissionTreeDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Auth : shinyzo
 * Date : 2018/3/9
 * description : xxxx
 */
public class PermissionTreeUtil {


    public static List<Map<String,Object>> rightTree(List<PermissionTreeDTO> list, String parentId) {
        List<Map<String,Object>> treeList  = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> map = null;
            PermissionTreeDTO permissionTreeDTO =  list.get(i);
            if (permissionTreeDTO.getPid().equals(parentId)) {
                map = new HashMap<String, Object>();
                //这里必须要将对象角色的id、name转换成ComboTree在页面的显示形式id、text
                //ComboTree,不是数据表格，没有在页面通过columns转换数据的属性
                map.put("id", permissionTreeDTO.getId());         //id
                map.put("text",permissionTreeDTO.getText());      //角色名
                map.put("children", rightTreeChildren(list, permissionTreeDTO.getId().toString()));
                map.put("checked",permissionTreeDTO.isChecked());
            }
            if (map != null)
                treeList.add(map);
        }
        return treeList;
    }


    /**
     * 递归设置role树
     * @param list
     * @param parentId
     * @return
     */
    private static List<Map<String, Object>> rightTreeChildren(List<PermissionTreeDTO> list, String parentId) {
        List<Map<String, Object>> childList = new ArrayList<Map<String, Object>>();
        for (int j = 0; j < list.size(); j++) {
            Map<String, Object> map = null;
            PermissionTreeDTO childPermissionDTO =  list.get(j);
            if (childPermissionDTO.getPid().equals(parentId)) {
                map = new HashMap<String, Object>();
                //这里必须要将对象角色的id、name转换成ComboTree在页面的显示形式id、text
                //ComboTree,不是数据表格，没有在页面通过columns转换数据的属性
                map.put("id", childPermissionDTO.getId());
                map.put("text", childPermissionDTO.getText());
                map.put("children", rightTreeChildren(list, childPermissionDTO.getId()));
                map.put("checked",childPermissionDTO.isChecked());
            }

            if (map != null)
                childList.add(map);
        }
        return childList;
    }
}
