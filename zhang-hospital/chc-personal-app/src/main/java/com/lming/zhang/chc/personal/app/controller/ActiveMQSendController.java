package com.lming.zhang.chc.personal.app.controller;

import com.lming.zhang.hospital.common.constants.QueueConstatns;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Auth : shinyzo
 * Date : 2018/4/16
 * description : xxxx
 */
@RestController
public class ActiveMQSendController {

    @Autowired
    private JmsTemplate jmsTemplate;

    @RequestMapping(value = "/activemq/send", method = RequestMethod.GET)
    public void send(){
        jmsTemplate.convertAndSend(QueueConstatns.QUEUE_ORDER," activemq order message");
    }
}
