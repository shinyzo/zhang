package com.lming.zhang.upms.server.exception;

import com.lming.zhang.upms.common.UpmsResultEnum;

public class UpmsProcessException extends RuntimeException {

    private Integer code;

    public UpmsProcessException() {
        super();
    }

    public UpmsProcessException(UpmsResultEnum resultEnum) {
        super(resultEnum.getMsg());
        this.code = resultEnum.getCode();
    }

    public UpmsProcessException(Integer code,String msg) {

        super(msg);
        this.code = code;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
