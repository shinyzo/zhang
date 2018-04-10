package com.lming.zhang.hospital.common;

import com.lming.zhang.common.base.BaseResult;

/**
 * Auth : shinyzo
 * Date : 2018/4/10
 * description : xxxx
 */
public class ResultVO<Data> extends BaseResult {

    public ResultVO(int code, String message, Data data) {
        super(code, message, data);
    }

    public ResultVO(ResultEnum resultEnum,Data data){
        super(resultEnum.getCode(),resultEnum.getMessage(),data);
    }


}
