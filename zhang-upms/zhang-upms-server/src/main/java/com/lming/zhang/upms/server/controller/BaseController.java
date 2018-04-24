package com.lming.zhang.upms.server.controller;

import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
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
    public UpmsResult allExceptionHandler(HttpServletRequest request,
                                          Exception exception) throws Exception
    {
        log.error("系统错误：{}",exception.getMessage());
        boolean isAjaxRequest = false;
        if(isAjaxRequest){

        }
        return new UpmsResult(UpmsResultEnum.SUCCESS,null);
    }

}
