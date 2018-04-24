package com.lming.zhang.upms.common;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */

public enum UpmsResultEnum{

    SUCCESS(0,"成功"),
    FAILED(1,"失败"),
    ;

    private Integer code;

    private String msg;

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

    UpmsResultEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }


}
