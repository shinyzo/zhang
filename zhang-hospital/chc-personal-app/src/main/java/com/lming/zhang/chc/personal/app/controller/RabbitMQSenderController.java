package com.lming.zhang.chc.personal.app.controller;

import com.lming.zhang.hospital.common.constants.ExchangeConstants;
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

        amqpTemplate.convertAndSend(ExchangeConstants.EXCHANGE_ORDER,"order.xxx","hello order 1");

        amqpTemplate.convertAndSend(ExchangeConstants.EXCHANGE_ORDER,"xxxx.order.xxx","hello order 2");

        amqpTemplate.convertAndSend(ExchangeConstants.EXCHANGE_PRODUCT,"xxxx.product.xxx","hello product 3");

        amqpTemplate.convertAndSend(ExchangeConstants.EXCHANGE_PRODUCT,"xxxx.product.xxx.yyyyy","hello product 4");

    }
}
