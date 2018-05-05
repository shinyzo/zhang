package com.lming.zhang.upms.server.util;

import com.lming.zhang.upms.server.vo.TreeNodeVO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Auth : shinyzo
 * Date : 2018/3/9
 * description : xxxx
 */
public class TreeUtil {


    public static List<Map<String,Object>> tree(List<TreeNodeVO> list, String parentId) {
        List<Map<String,Object>> treeList  = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> map = null;
            TreeNodeVO treeNode =  list.get(i);
            if (treeNode.getPid().equals(parentId)) {
                map = new HashMap<String, Object>();
                //这里必须要将对象角色的id、name转换成ComboTree在页面的显示形式id、text
                //ComboTree,不是数据表格，没有在页面通过columns转换数据的属性
                map.put("id", treeNode.getId());         //id
                map.put("text",treeNode.getText());      //角色名
                List<Map<String, Object>> children = treeChildren(list, treeNode.getId().toString());
                map.put("children", children);
                map.put("checked",treeNode.isChecked());
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
    private static List<Map<String, Object>> treeChildren(List<TreeNodeVO> list, String parentId) {
        List<Map<String, Object>> childList = new ArrayList<Map<String, Object>>();
        for (int j = 0; j < list.size(); j++) {
            Map<String, Object> map = null;
            TreeNodeVO childTreeNode =  list.get(j);
            if (childTreeNode.getPid().equals(parentId)) {
                map = new HashMap<String, Object>();
                //这里必须要将对象角色的id、name转换成ComboTree在页面的显示形式id、text
                //ComboTree,不是数据表格，没有在页面通过columns转换数据的属性
                map.put("id", childTreeNode.getId());
                map.put("text", childTreeNode.getText());
                map.put("children", treeChildren(list, childTreeNode.getId()));
                map.put("checked", childTreeNode.isChecked());
            }

            if (map != null)
                childList.add(map);
        }
        return childList;
    }
}
