package com.lming.zhang.hospital.config;

import com.lming.zhang.hospital.common.constants.ExchangeConstants;
import com.lming.zhang.hospital.common.constants.QueueConstatns;
import com.lming.zhang.hospital.common.constants.RoutingKeyConstants;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * Created by Jony 
 */
@Configuration
public class AmqpConfig {



    @Bean
    Queue orderQueue() {
        return new Queue(QueueConstatns.QUEUE_ORDER, false);
    }

    @Bean
    Queue productQueue() {
        return new Queue(QueueConstatns.QUEUE_PRODUCT, false);
    }

    @Bean
    TopicExchange orderExchange() {
        return new TopicExchange(ExchangeConstants.EXCHANGE_ORDER);
    }

    @Bean
    TopicExchange productExchange() {
        return new TopicExchange(ExchangeConstants.EXCHANGE_PRODUCT);
    }

    @Bean
    Binding orderBinding(Queue orderQueue, TopicExchange orderExchange) {
        return BindingBuilder.bind(orderQueue).to(orderExchange).with(RoutingKeyConstants.KEY_ORDER_FULL);
    }

    @Bean
    Binding productBinding(Queue productQueue, TopicExchange productExchange) {
        return BindingBuilder.bind(productQueue).to(productExchange).with(RoutingKeyConstants.KEY_PRODUCT_FULL);
    }




}
