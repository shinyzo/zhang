package com.lming.zhang.chc.personal.app.controller;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Auth : shinyzo
 * Date : 2018/4/11
 * description : xxxx
 */
@RestController
public class RabbitMQSenderController {

    @Autowired
    private AmqpTemplate amqpTemplate;
    @RequestMapping(value = "/send",method = RequestMethod.GET)
    public void send(){
        amqpTemplate.convertAndSend("AAAA","AAAAAA");
        amqpTemplate.convertAndSend("queen1","hello world 1");
        amqpTemplate.convertAndSend("exchangeA","AA","hello workd 2");
        amqpTemplate.convertAndSend("exchangeA","MM.AA.bb","hello workd 3");
        amqpTemplate.convertAndSend("exchangeA","KK.AA.cc.FF","hello workd 4");
    }
}
