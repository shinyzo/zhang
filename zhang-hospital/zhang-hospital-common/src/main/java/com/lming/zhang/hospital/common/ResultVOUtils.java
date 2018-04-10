package com.lming.zhang.hospital.common;

/**
 * Auth : shinyzo
 * Date : 2018/4/10
 * description : xxxx
 */
public class ResultVOUtils {

    public static ResultVO success(){

        return  new ResultVO(ResultEnum.SUCCESS.getCode(),ResultEnum.SUCCESS.getMessage(),null);
    }

    public static ResultVO success(Object data){

        return  new ResultVO(ResultEnum.SUCCESS.getCode(),ResultEnum.SUCCESS.getMessage(),data);
    }

    public static ResultVO error(ResultEnum resultEnum){

        return  new ResultVO(resultEnum.getCode(),resultEnum.getMessage(),null);
    }



}
