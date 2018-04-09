package com.lming.zhang.hospital.rpc;

import com.lming.zhang.common.util.SpringContextUtil;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication
@ImportResource(value = {"classpath:dubbo-provider.xml"})
@MapperScan("com.lming.zhang.hospital.dao.mapper")
@ServletComponentScan
public class ZhangHospitalRpcServiceApplication {

	public static void main(String[] args) {
		ApplicationContext app = SpringApplication.run(ZhangHospitalRpcServiceApplication.class, args);
		SpringContextUtil.setApplicationContext(app);
	}
}
