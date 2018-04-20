package com.lming.zhang.hospital.common;

/**
 * Auth : shinyzo
 * Date : 2018/4/10
 * description : xxxx
 */
public enum ResultEnum{

    /**
     * 成功
     */
    SUCCESS(0, "成功"),
    /**
     * 失败
     */
    FAILED(1, "失败"),

    SYS_ERROR(2,"系统错误！"),
    ;

    public int code;

    public String message;

    ResultEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }



}
