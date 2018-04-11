package com.lming.zhang.hospital.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "druid.db.master")
@Data
public class MasterDbConfig {

    private String driverClassName;

    private String username;

    private String password;

    private String jdbcUrl;

    private Integer initialSize;

    private Integer minIdle;

    private Integer maxActive;

    private Integer maxWait;

    private String filters;
}
