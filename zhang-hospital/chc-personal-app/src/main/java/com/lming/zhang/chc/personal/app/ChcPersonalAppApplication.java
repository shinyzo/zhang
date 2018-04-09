package com.lming.zhang.chc.personal.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@ImportResource(value = {"classpath:dubbo-customer.xml"})
public class ChcPersonalAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChcPersonalAppApplication.class, args);
	}
}
