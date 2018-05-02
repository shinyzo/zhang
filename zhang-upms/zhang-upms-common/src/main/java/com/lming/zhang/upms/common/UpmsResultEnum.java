package com.lming.zhang.upms.common;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */

public enum UpmsResultEnum{

    SUCCESS(0,"成功"),
    FAILED(1,"失败"),

    RAND_KEY_EMPTY(1001,"验证码不能为空！"),
    RAND_KEY_ERROR(1002,"验证码不正确！"),
    USER_NOT_EXIST(1004,"用户不存在！"),
    USER_LOCKED(1003,"用户已被锁定！"),
    LOGIN_FAILED(1005,"用户名或密码不正确！"),

    INVALID_LENGTH(1006,"%s长度不合法！"),

    APPID_EMPTY(1007,"appid为空！"),
    SYSTEM_NOT_REGISTER(1008,"未注册的系统");

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
