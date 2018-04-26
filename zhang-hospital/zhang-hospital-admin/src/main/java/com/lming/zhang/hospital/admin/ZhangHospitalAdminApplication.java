package com.lming.zhang.hospital.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@ComponentScan("com.lming.zhang")
@ImportResource(value = {"classpath:dubbo-consumer.xml"})
public class ZhangHospitalAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZhangHospitalAdminApplication.class, args);
	}
}
