package com.lming.zhang.hospital.message;

import com.lming.zhang.hospital.common.constants.QueueConstatns;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

/**
 * Auth : shinyzo
 * Date : 2018/4/16
 * description : xxxx
 */
@Component
@Slf4j
public class ActiveMQReceiver {

//    @JmsListener(destination = QueueConstatns.QUEUE_ORDER)
//    public void receiveQueue(String text) {
//        System.out.println("Consumer收到的报文为:"+text);
//    }
}
