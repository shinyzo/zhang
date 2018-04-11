package com.lming.zhang.hospital.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "druid.db.slave")
@Data
public class SlaveDbConfig {

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
