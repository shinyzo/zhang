package com.lming.zhang.common.base;

/**
 * Auth : shinyzo
 * Date : 2018/5/2
 * description : xxxx
 */
public class BasePage {

    private Integer page = 1;

    private Integer rows = 10;

    private String order;

    private String sort;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getRows() {
        return rows;
    }

    public void setRows(Integer rows) {
        this.rows = rows;
    }

    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        this.order = order;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}
