package com.lming.zhang.upms.rpc.service;

import com.lming.zhang.common.util.SpringContextUtil;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ComponentScan({"com.lming.zhang.upms","com.lming.zhang.common.aspect"})
@MapperScan(value = {
        "com.lming.zhang.upms.**.dao.mapper"
})
@ImportResource(value = {"classpath:dubbo-provider.xml"}) // 引入资源文件
public class ZhangUpmsRpcServiceApplication {

	public static void main(String[] args) {
        ApplicationContext app = SpringApplication.run(ZhangUpmsRpcServiceApplication.class, args);
        // 将上下文注入
        SpringContextUtil.setApplicationContext(app);
	}
}
