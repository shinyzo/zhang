package com.lming.zhang.common.base;

/**
 * 统一返回结果类
 * Created by shuzheng on 2017/2/18.
 */
public class BaseResult<T> {

    /**
     * 状态码：1成功，其他为失败
     */
    public Integer code;

    /**
     * 成功为success，其他为失败原因
     */
    public String message;

    /**
     * 数据结果集
     */
    public T data;

    public BaseResult() {

    }

    public BaseResult(Integer code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

}
