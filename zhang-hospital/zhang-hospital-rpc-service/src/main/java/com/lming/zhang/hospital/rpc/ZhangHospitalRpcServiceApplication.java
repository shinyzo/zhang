package com.lming.zhang.hospital.rpc;

import com.lming.zhang.common.util.SpringContextUtil;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
@ComponentScan("com.lming.zhang.hospital")
@MapperScan("com.lming.zhang.hospital.dao.mapper")
@ImportResource(value = {"classpath:dubbo-provider.xml"}) // 引入资源文件
@EnableCaching           // redis cache
// @ServletComponentScan   // druid filter
// @Configuration
// @EnableWebMvc
public class ZhangHospitalRpcServiceApplication {

	public static void main(String[] args) {
		ApplicationContext app = SpringApplication.run(ZhangHospitalRpcServiceApplication.class, args);
		// 将上下文注入
		SpringContextUtil.setApplicationContext(app);
	}
}
