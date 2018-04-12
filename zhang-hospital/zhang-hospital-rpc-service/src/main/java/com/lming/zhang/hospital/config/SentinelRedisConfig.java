package com.lming.zhang.hospital.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisSentinelConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.util.StringUtils;
import redis.clients.jedis.JedisPoolConfig;

import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

/**
 * Auth : shinyzo
 * Date : 2018/4/12
 * description : xxxx
 */
@Configuration
@EnableCaching
public class SentinelRedisConfig {

    /**
     * 哨兵模式
     */
    @Value("${spring.redis.sentinel.master}")
    private String masterName;
    @Value("${spring.redis.sentinel.nodes}")
    private String nodes;

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {
        return RedisCacheManager.create(redisConnectionFactory);
//        RedisCacheManager cm = RedisCacheManager.builder(connectionFactory)
//                .cacheDefaults(defaultCacheConfig())
//                .initialCacheConfigurations(singletonMap("predefined", defaultCacheConfig().disableCachingNullValues()))
//                .transactionAware()
//                .build();
//        return cm;
    }

    @Bean
    public JedisConnectionFactory redisConnectionFactory(RedisSentinelConfiguration redisSentinelConfiguration, JedisPoolConfig jedisPoolConfig) {
        //JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
        return new JedisConnectionFactory(redisSentinelConfiguration,jedisPoolConfig);
    }

    @Bean
    public RedisSentinelConfiguration redisSentinelConfiguration(){

        Set<String> sentinelHostAndPorts = StringUtils.commaDelimitedListToSet(nodes);

        //sentinelHostAndPorts.add("127.0.0.1:6379");
        //sentinelHostAndPorts.add("127.0.0.1:6380");
        return new RedisSentinelConfiguration("master",sentinelHostAndPorts);
    }

    /**
     * 连接池配置
     * @Description:
     * @return
     */
    @Bean
    public JedisPoolConfig jedisPoolConfig() {
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxIdle(8);
        jedisPoolConfig.setMinIdle(0);
        return jedisPoolConfig;
    }


    @Bean
    public RedisCacheConfiguration defaultCacheConfig(){
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(1000))
                .disableCachingNullValues();
        return config;
    }
}
