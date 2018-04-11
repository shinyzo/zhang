package com.lming.zhang.hospital.config.dynamic.datasource;

import com.lming.zhang.common.db.DataSourceEnum;
import com.lming.zhang.common.db.DynamicDataSource;
import com.lming.zhang.hospital.properties.MasterDbConfig;
import com.lming.zhang.hospital.properties.SlaveDbConfig;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Hikari 多数据源配置 进行主从库分离，主库进行增删改功能
 *       从库进行查询功能，提供效率
 *       据说比druid效率高，目前没看到监控功能，暂时不用
 */
@Slf4j
// @Configuration
public class HikariMultiDBConfig {


    @Autowired
    private MasterDbConfig masterDbConfig;

    @Autowired
    private SlaveDbConfig slaveDbConfig;


    /**
     * 主数据源
     * @return
     */
    @Bean(name = "masterDataSource")
    @Primary
    @ConfigurationProperties(prefix = "hikari.db.master") // application.properteis中对应属性的前缀
    public DataSource masterDataSource() {

        return DataSourceBuilder.create().build();
    }


    /**
     * 从数据源
     * @return
     */
    @Bean(name = "slaveDataSource")
    @ConfigurationProperties(prefix = "hikari.db.slave") // application.properteis中对应属性的前缀
    public DataSource slaveDataSource() {
        return DataSourceBuilder.create().build();

    }


    /**
     * 动态数据源: 通过AOP在不同数据源之间动态切换
     * @return
     */
    @Bean(name = "dynamicDataSource")
    public DataSource dynamicDataSource() {
        DynamicDataSource dynamicDataSource = new DynamicDataSource();
        // 默认数据源
        dynamicDataSource.setDefaultTargetDataSource(masterDataSource());

        // 配置多数据源
        Map<Object, Object> dsMap = new HashMap(5);
        dsMap.put(DataSourceEnum.MASTER.getName(), masterDataSource());
        dsMap.put(DataSourceEnum.SLAVE.getName(), slaveDataSource());

        dynamicDataSource.setTargetDataSources(dsMap);

        return dynamicDataSource;
    }


    @Bean(name="sqlSessionFactory")
    public SqlSessionFactoryBean sqlSessionFactory() {
        SqlSessionFactoryBean sqlSession = new SqlSessionFactoryBean();
        sqlSession.setDataSource(dynamicDataSource());
        sqlSession.setTypeAliasesPackage("com.lming.zhang.hospital.dao.model");
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        try {
            sqlSession.setMapperLocations(resolver.getResources("classpath:com/lming/zhang/hospital/dao/mapper/*.xml"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return sqlSession;
    }

    public MapperScannerConfigurer mapperScannerConfig() {
        MapperScannerConfigurer mapperScanner = new MapperScannerConfigurer();
        mapperScanner.setSqlSessionFactoryBeanName("sqlSessionFactory");
        mapperScanner.setBasePackage("com.lming.zhang.hospital.dao.mapper");
        return mapperScanner;
    }


}
