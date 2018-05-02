package com.lming.zhang.hospital.common.constants;

import com.lming.zhang.common.base.BaseResult;

/**
 * Auth : shinyzo
 * Date : 2018/5/2
 * description : xxxx
 */
public class ChcResult<T> extends BaseResult {

    public ChcResult(Integer code, String msg, T data) {
        super(code, msg, data);
    }

    public ChcResult(ChcResultEnum chcResultEnum,T data){

        super(chcResultEnum.getCode(),chcResultEnum.getMsg(),data);
    }


    public ChcResult(ChcResultEnum chcResultEnum){

        super(chcResultEnum.getCode(),chcResultEnum.getMsg(),null);
    }

}
