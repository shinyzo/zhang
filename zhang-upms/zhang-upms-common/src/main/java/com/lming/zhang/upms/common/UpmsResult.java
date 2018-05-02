package com.lming.zhang.upms.common;

import com.lming.zhang.common.base.BaseResult;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */
public class UpmsResult<T> extends BaseResult {


    /**
     *
     */
    public UpmsResult(){
        super(UpmsResultEnum.SUCCESS.getCode(),UpmsResultEnum.SUCCESS.getMsg(),null);
    }

    /**
     *
     * @param upmsResultEnum
     */
    public UpmsResult(UpmsResultEnum upmsResultEnum) {
        super(upmsResultEnum.getCode(),upmsResultEnum.getMsg(),null);
    }

    /**
     *
     * @param upmsResultEnum
     * @param data
     */
    public UpmsResult(UpmsResultEnum upmsResultEnum, T data) {
        super(upmsResultEnum.getCode(),upmsResultEnum.getMsg(),data);
    }

    /**
     * 成功 data
     * @param data
     */
    public UpmsResult(T data) {
        super(UpmsResultEnum.SUCCESS.getCode(),UpmsResultEnum.SUCCESS.getMsg(),data);
    }

    /**
     * 自定义code及msg
     * @param code
     * @param msg
     */
    public UpmsResult(Integer code,String msg) {
        super(code,msg,null);
    }

    /**
     * 自定义code,msg及data
     * @param code
     * @param msg
     * @param data
     */
    public UpmsResult(Integer code,String msg,T data) {
        super(code,msg,data);
    }


}
