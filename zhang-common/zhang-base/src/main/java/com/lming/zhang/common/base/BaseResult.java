package com.lming.zhang.common.base;

import java.io.Serializable;

/**
 * 统一返回结果类
 * Created by shuzheng on 2017/2/18.
 */
public class BaseResult<T> implements Serializable {

    /**
     * 状态码：1成功，其他为失败
     */
    public Integer code;

    /**
     * 成功为success，其他为失败原因
     */
    public String msg;

    /**
     * 数据结果集
     */
    public T data;

    public BaseResult(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
