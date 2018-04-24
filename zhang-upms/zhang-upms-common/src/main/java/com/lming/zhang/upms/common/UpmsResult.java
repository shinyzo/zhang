package com.lming.zhang.upms.common;

import com.lming.zhang.common.base.BaseResult;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */
public class UpmsResult<T> extends BaseResult {

    public UpmsResult(UpmsResultEnum upmsResultEnum) {
        super(upmsResultEnum.getCode(),upmsResultEnum.getMsg(),null);
    }


    public UpmsResult(UpmsResultEnum upmsResultEnum, T data) {
        super(upmsResultEnum.getCode(),upmsResultEnum.getMsg(),data);
    }


    public UpmsResult(Integer code,String msg) {
        super(code,msg,null);
    }

    public UpmsResult(Integer code,String msg,T data) {
        super(code,msg,data);
    }



}
