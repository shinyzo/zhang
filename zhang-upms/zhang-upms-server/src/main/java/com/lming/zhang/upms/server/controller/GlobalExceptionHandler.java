package com.lming.zhang.upms.server.controller;

import com.lming.zhang.common.util.JsonUtil;
import com.lming.zhang.common.util.RequestUtil;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.server.exception.UpmsProcessException;
import com.lming.zhang.upms.server.exception.ViewException;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * Auth : shinyzo
 * Date : 2018/4/20
 * description : 全局异常处理
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {


    /**
     * 内部自定义异常处理
     * @param ex
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=UpmsProcessException.class)
    @ResponseBody
    public UpmsResult upmsProcessExceptionHandler(UpmsProcessException ex) throws Exception
    {
        log.info("自定义异常：{}",ex.getMessage());
        return new UpmsResult(ex.getCode(),ex.getMessage());
    }


    /**
     * shiro 登录异常
     * @param ex
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=AuthenticationException.class)
    @ResponseBody
    public UpmsResult AuthenticationException(AuthenticationException ex) throws Exception{
        log.error("shiro exception：{}",ex);
        if(ex instanceof UnknownAccountException){
            return new UpmsResult(UpmsResultEnum.USER_NOT_EXIST);
        }
        if(ex instanceof LockedAccountException){
            return new UpmsResult(UpmsResultEnum.USER_LOCKED);
        }
        if(ex instanceof IncorrectCredentialsException)
        {
            return new UpmsResult(UpmsResultEnum.LOGIN_FAILED);
        }

        return new UpmsResult(UpmsResultEnum.FAILED.getCode(),"登录异常！");
    }


    /**
     * ajax异常
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=Exception.class)
    @ResponseBody
    public UpmsResult errorHandler(HttpServletRequest request,
                                          Exception exception) throws Exception
    {
        log.error("全局异常：{}",exception);
        if(RequestUtil.isAjax(request))
        {
           return new UpmsResult(UpmsResultEnum.FAILED.getCode(),"系统错误，请稍后重试!");
        }
        // 页面异常
        throw new ViewException();
    }

    /**
     * 普通请求返回页面
     * @param request
     * @param exception
     * @return
     * @throws Exception
     */
    @ExceptionHandler(value=ViewException.class)
    public ModelAndView viewErrorHandler(HttpServletRequest request,
                                         ViewException exception) throws Exception
    {
        log.error("ViewException：{}",exception);
        ModelAndView mav = new ModelAndView();
        mav.addObject("msg","系统错误");
        mav.addObject("url",request.getRequestURI());
        // 页面异常
        return new ModelAndView("/error/error");
    }





}
