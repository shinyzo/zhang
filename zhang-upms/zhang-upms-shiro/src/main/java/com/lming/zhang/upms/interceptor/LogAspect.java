package com.lming.zhang.upms.interceptor;


import com.lming.zhang.common.util.DateUtil;
import com.lming.zhang.common.util.JsonUtil;
import com.lming.zhang.common.util.RequestUtil;
import com.lming.zhang.upms.dao.model.UpmsLog;
import com.lming.zhang.upms.rpc.api.UpmsApiService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import net.sf.json.util.JSONUtils;
import org.apache.commons.lang.ObjectUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Map;

/**
 * 日志记录AOP实现
 * Created by ZhangShuzheng on 2017/3/14.
 */
@Aspect
@Component
@Slf4j
public class LogAspect {


	// 开始时间
	private long startTime = 0L;
	// 结束时间
	private long endTime = 0L;

	private String username="";

	@Autowired
	UpmsApiService upmsApiService;

	@Before("execution(* *..controller..*.*(..))")
	public void doBeforeInServiceLayer(JoinPoint joinPoint) {

		log.debug("==> doBeforeInServiceLayer");

		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
		HttpServletRequest request = servletRequestAttributes.getRequest();

		startTime = System.currentTimeMillis();
		// 退出的登录的时候doAround 取不到username
		username = ObjectUtils.toString(request.getUserPrincipal());
	}

	@After("execution(* *..controller..*.*(..))")
	public void doAfterInServiceLayer(JoinPoint joinPoint) {
		log.debug("==> doAfterInServiceLayer");
	}

	@Around("execution(* *..controller..*.*(..))")
	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		// 获取request
		RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
		HttpServletRequest request = servletRequestAttributes.getRequest();

		UpmsLog upmsLog = new UpmsLog();
		// 从注解中获取操作名称、获取响应结果
		Object result = pjp.proceed();
		Signature signature = pjp.getSignature();
		MethodSignature methodSignature = (MethodSignature) signature;
		Method method = methodSignature.getMethod();
		if (method.isAnnotationPresent(ApiOperation.class)) {
			ApiOperation log = method.getAnnotation(ApiOperation.class);
			upmsLog.setDescription(log.value());
		}
		if (method.isAnnotationPresent(RequiresPermissions.class)) {
			RequiresPermissions requiresPermissions = method.getAnnotation(RequiresPermissions.class);
			String[] permissions = requiresPermissions.value();
			if (permissions.length > 0) {
				upmsLog.setPermissions(permissions[0]);
			}
		}
		endTime = System.currentTimeMillis();

		upmsLog.setBasePath(RequestUtil.getBasePath(request));
		upmsLog.setIp(RequestUtil.getIpAddr(request));
		upmsLog.setMethod(request.getMethod());
		upmsLog.setOperTime(DateUtil.getCurrentTime());
		if ("GET".equalsIgnoreCase(request.getMethod())) {
			upmsLog.setParameter(request.getQueryString());
		} else {
			upmsLog.setParameter(RequestUtil.params2Json(request));
		}
		upmsLog.setResult(JsonUtil.obj2String(result));
		upmsLog.setStartTime(startTime);
		upmsLog.setSpendTime((int) (endTime - startTime));
		upmsLog.setUri(request.getRequestURI());
		upmsLog.setUrl(ObjectUtils.toString(request.getRequestURL()));
		upmsLog.setUserAgent(request.getHeader("User-Agent"));
		upmsLog.setUsername(username);

		upmsApiService.insertUpmsLogSelective(upmsLog);
		return result;
	}

}
