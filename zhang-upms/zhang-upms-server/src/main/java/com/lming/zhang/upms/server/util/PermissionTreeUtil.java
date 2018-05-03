package com.lming.zhang.upms.server.util;

import com.lming.zhang.upms.dao.model.UpmsPermission;

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

    public static List<Map<String,Object>> rightTree(List<UpmsPermission> list, Integer parentId) {
        List<Map<String,Object>> comboTreeList  = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> map = null;
            UpmsPermission upmsPermission =  list.get(i);
            if (upmsPermission.getPid() == parentId) {
                map = new HashMap<String, Object>();
                //这里必须要将对象角色的id、name转换成ComboTree在页面的显示形式id、text
                //ComboTree,不是数据表格，没有在页面通过columns转换数据的属性
                map.put("id", upmsPermission.getPermissionId());         //id
                map.put("text",upmsPermission.getName());      //角色名
                map.put("children", rightTreeChildren(list, upmsPermission.getPermissionId()));
            }
            if (map != null)
                comboTreeList.add(map);
        }
        return comboTreeList;
    }


    /**
     * 递归设置role树
     * @param list
     * @param parentId
     * @return
     */
    private static List<Map<String, Object>> rightTreeChildren(List<UpmsPermission> list, Integer parentId) {
        List<Map<String, Object>> childList = new ArrayList<Map<String, Object>>();
        for (int j = 0; j < list.size(); j++) {
            Map<String, Object> map = null;
            UpmsPermission treeChild =  list.get(j);
            if (treeChild.getPid()==parentId) {
                map = new HashMap<String, Object>();
                //这里必须要将对象角色的id、name转换成ComboTree在页面的显示形式id、text
                //ComboTree,不是数据表格，没有在页面通过columns转换数据的属性
                map.put("id", treeChild.getPermissionId());
                map.put("text", treeChild.getName());
                map.put("children", rightTreeChildren(list, treeChild.getPermissionId()));
            }

            if (map != null)
                childList.add(map);
        }
        return childList;
    }
}
