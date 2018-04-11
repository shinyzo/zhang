package com.lming.zhang.hospital.message;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

/**
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

    /**
     *
     * type = "topic" 需要人工自己去建立，
     * 系统只会建立 type="direct"
     */

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
     * 直接匹配AA
     * @param message
     */
    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = EXCHANGE_A),
            key = "AA",
            value = @Queue(QUEUE_B)
    ))
    public void process1(String message){

        log.info("process1 receive message:" + message);
    }

    /**
     * 匹配AA.*
     * @param message
     */
    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = EXCHANGE_A,type = "topic"),
            key = "*.AA.*",
            value = @Queue(QUEUE_B)
    ))
    public void process2(String message){

        log.info("process2 receive message:" + message);
    }


    /**
     * 匹配AA开头的所有
     * @param message
     */
    @RabbitListener(bindings = @QueueBinding(
            exchange = @Exchange(value = EXCHANGE_A,type = "topic"),
            key = "*.AA.#",
            value = @Queue(QUEUE_B)
    ))
    public void process3(String message){

        log.info("process3 receive message:" + message);
    }
    /**
     * 消息分组 key
     *
     * @param message
     */
//    @RabbitListener(bindings = @QueueBinding(
//            exchange=@Exchange("order"),
//            key="fruit",
//            value=@Queue("fruitOrder")
//    ))
//    public void  processFruit(String message){
//        log.info("mq receiver : {}" ,message);
//
//    }

}
