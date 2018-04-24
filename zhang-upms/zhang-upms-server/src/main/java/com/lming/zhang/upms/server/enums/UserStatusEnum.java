package com.lming.zhang.upms.server.enums;

import lombok.Data;
import lombok.Getter;

@Getter
public enum UserStatusEnum {

    LOCKED(1,"锁定"),
    NORMAL(0,"正常"),
    ;

    private Integer code;
    private String description;

    UserStatusEnum(Integer code, String description) {
        this.code = code;
        this.description = description;
    }

}
