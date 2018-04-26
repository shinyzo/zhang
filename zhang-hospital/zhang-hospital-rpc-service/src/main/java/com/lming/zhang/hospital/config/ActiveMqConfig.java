package com.lming.zhang.hospital.config;


import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.jms.Queue;

/**
 * Auth : shinyzo
 * Date : 2018/4/16
 * description : xxxx
 */
// @Configuration
public class ActiveMqConfig {

    @Bean
    public Queue queue(){
        return new ActiveMQQueue("queue");
    }
}
