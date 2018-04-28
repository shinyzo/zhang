package com.lming.zhang.upms.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.http.HttpStatus;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@ComponentScan("com.lming.zhang.**")
@ImportResource(value = {"classpath:dubbo-consumer.xml"})
public class ZhangUpmsServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZhangUpmsServerApplication.class, args);
	}

}
