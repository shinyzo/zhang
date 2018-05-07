package com.lming.zhang.upms.server.vo;

import lombok.Data;

import java.util.List;

/**
 * Auth : shinyzo
 * Date : 2018/5/4
 * description : xxxx
 */
@Data
public class TreeNodeVO {

    // 当前节点id
    private String id;
    // text
    private String text;
    // icon
    private String iconCls;
    // open/colsed
    private String state;
    // 是否选中
    private boolean checked;
    // 父节点id
    private String pid;
    // 子节点
    private List<TreeNodeVO> children;
    // 附加属性
    private String attributes;
}
