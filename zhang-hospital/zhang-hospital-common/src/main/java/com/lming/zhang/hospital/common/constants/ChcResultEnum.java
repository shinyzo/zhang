package com.lming.zhang.hospital.common.constants;

import com.lming.zhang.common.base.BaseEnum;
import com.lming.zhang.common.base.BaseInterface;
import lombok.Data;

/**
 * Auth : shinyzo
 * Date : 2018/5/2
 * description : xxxx
 */
public enum ChcResultEnum {

    SUCCESS(0,"成功"),
    FAILED(1,"失败"),
    ;

    private Integer code;

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    private String msg;

    ChcResultEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    ChcResultEnum() {
    }
}
