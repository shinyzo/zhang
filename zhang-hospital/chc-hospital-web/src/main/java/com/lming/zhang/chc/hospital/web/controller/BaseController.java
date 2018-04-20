package com.lming.zhang.chc.hospital.web.controller;

import com.lming.zhang.hospital.common.ResultEnum;
import com.lming.zhang.hospital.common.ResultVO;
import com.lming.zhang.hospital.common.ResultVOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Auth : shinyzo
 * Date : 2018/4/20
 * description : xxxx
 */
@ControllerAdvice
@Slf4j
public class BaseController {

    @ExceptionHandler(value=Exception.class)
    @ResponseBody
    public ResultVO allExceptionHandler(HttpServletRequest request,
                                        Exception exception) throws Exception
    {
        log.error("系统错误：{}",exception.getMessage());
        boolean isAjaxRequest = false;
        if(isAjaxRequest){

        }
        return ResultVOUtils.error(ResultEnum.SYS_ERROR);
    }

}
