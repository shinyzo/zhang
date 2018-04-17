package com.lming.zhang.hospital.message;

import com.lming.zhang.hospital.common.constants.QueueConstatns;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import reactor.util.concurrent.Queues;

/**
 *
 * rabbitmq 消息接受
 * Auth : shinyzo
 * Date : 2018/4/11
 * description : xxxx
 */
@Component
@Slf4j
public class RabbitMQReceiver {

    public static final String QUEUE_A = "queue_A";
    public static final String QUEUE_B = "queue_B";
    public static final String EXCHANGE_A = "exchangeA";
    public static final String EXCHANGE_B = "exchangeB";


    /**
     * 直接匹配AA
     * @param message
     */
//    @RabbitListener(queuesToDeclare = @Queue(QUEUE_B))
//    public void process(String message){
//
//        log.info("process : only declare ,nothing to do." );
//
//    }



    /**
     * 匹配AA开头的所有
     * @param message
     */
//    @RabbitListener(bindings = @QueueBinding(
//            exchange = @Exchange(value = EXCHANGE_A,type = "topic"),
//            key = "*.AA.#",
//            value = @Queue(QUEUE_B)
//    ))
//    public void process3(String message){
//
//        log.info("process3 receive message:" + message);
//    }



//    @RabbitListener(queues = QueueConstatns.QUEUE_ORDER)
//    public void orderQueueMessage(String message){
//
//        log.info("orderQueueMessage receive message:" + message);
//    }
//
//    @RabbitListener(queues = QueueConstatns.QUEUE_PRODUCT)
//    public void productQueueMessage(String message){
//
//        log.info("productQueueMessage receive message:" + message);
//    }

}
