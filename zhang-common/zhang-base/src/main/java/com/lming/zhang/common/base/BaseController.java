package com.lming.zhang.common.base;

import com.lming.zhang.common.util.RequestUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 控制器基类
 * Created by ZhangShuzheng on 2017/2/4.
 */
public abstract class BaseController {

	private final static Logger LOGGER = LoggerFactory.getLogger(BaseController.class);

	/**
	 * 统一异常处理
	 * @param request
	 * @param response
	 * @param exception
	 */
	@ExceptionHandler
	public Object exceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception exception) {
		LOGGER.error("统一异常处理：", exception);
		request.setAttribute("ex", exception);
		if (RequestUtil.isAjax(request)) {
			request.setAttribute("requestHeader", "ajax");
		}

		return "/error.jsp";
	}



}
