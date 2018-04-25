package com.lming.zhang.common.aspect;

import com.alibaba.dubbo.rpc.RpcContext;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * rpc提供者和消费者日志打印
 * Created by ZhangShuzheng on 2017/4/19.
 */
@Aspect
@Component
public class RpcLogAspect {

	private static final Logger LOGGER = LoggerFactory.getLogger(RpcLogAspect.class);

	// 开始时间
	private long startTime = 0L;
	// 结束时间
	private long endTime = 0L;

	@Before("execution(* *..rpc..*.*(..))")
	public void doBeforeInServiceLayer(JoinPoint joinPoint) {
		LOGGER.info("==> doBeforeInServiceLayer");
		startTime = System.currentTimeMillis();
	}

	@After("execution(* *..rpc..*.*(..))")
	public void doAfterInServiceLayer(JoinPoint joinPoint) {
		LOGGER.info("==> doAfterInServiceLayer");
		endTime =  System.currentTimeMillis();
		LOGGER.info("耗时：{}ms",(endTime-startTime));
	}

	@Around("execution(* *..rpc..*.*(..))")
	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		Object result = pjp.proceed();
		RpcContext rpcContext = RpcContext.getContext();
		// 是否是消费端
		boolean consumerSide = RpcContext.getContext().isConsumerSide();
		// 获取最后一次提供方或调用方IP
		String ip = rpcContext.getRemoteHost();
        String methodName = rpcContext.getMethodName();
        String interfaceName = rpcContext.getUrl().getPath();
        Map<String,String> parameterMap = rpcContext.getUrl().getParameters();
		// 服务url
		String appName = rpcContext.getUrl().getParameter("application");
		LOGGER.info("appName={},consumerSide={}, ip={}, interfaceName={},methodName={}",
                appName,
                consumerSide,
                ip ,
                interfaceName,
                methodName
        );
		return result;
	}

}
