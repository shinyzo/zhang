package com.lming.zhang.upms.server.config;

import com.lming.zhang.common.util.SpringContextUtil;
import com.lming.zhang.upms.shiro.session.UpmsSessionDao;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@Component
public class UpmsConfig {

    @Bean
    public UpmsSessionDao upmsSessionDao(){
        return new UpmsSessionDao();
    }



}
