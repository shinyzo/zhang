package com.lming.zhang.common.base;

/**
 * Auth : shinyzo
 * Date : 2018/5/2
 * description : xxxx
 */
public enum BaseEnum {

    SUCCESS(0,"成功"),
    FAILED(1,"失败"),
    ;

    private Integer code;
    private String msg;

    BaseEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    BaseEnum() {
    }
}
