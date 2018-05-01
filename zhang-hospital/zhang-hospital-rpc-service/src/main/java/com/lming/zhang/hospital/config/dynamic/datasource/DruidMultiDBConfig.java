package com.lming.zhang.hospital.config.dynamic.datasource;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInterceptor;
import com.lming.zhang.common.db.DataSourceEnum;
import com.lming.zhang.common.db.DynamicDataSource;
import com.lming.zhang.hospital.properties.MasterDbConfig;
import com.lming.zhang.hospital.properties.SlaveDbConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.logging.stdout.StdOutImpl;
import org.apache.ibatis.plugin.Interceptor;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.mapper.MapperScannerConfigurer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * druid 多数据源配置 进行主从库分离，主库进行增删改功能
 *       从库进行查询功能，提供效率
 */
@Slf4j
@Configuration
public class DruidMultiDBConfig {

    @Autowired
    private MasterDbConfig masterDbConfig;

    @Autowired
    private SlaveDbConfig slaveDbConfig;

    @Value("${druid.username}")
    private String username;

    @Value("${druid.password}")
    private String password;

    /**
     * model,mapper,xml的包所在地址在mybatis配置型中已配置，此处可以不在配置
     *                  皮面重复，如果确实需要配置对下面三个变量去配置项属性值替换下面即可
     */
    /**
    private String modelScanPackage;
    private String mapperScanPackage;
    private String xmlScanPackage;
     **/


    /**
     * 主数据源
     * @return
     */
    @Bean(name = "masterDataSource")
    @Primary
    @ConfigurationProperties(prefix = "druid.db.master") // application.properteis中对应属性的前缀
    public DataSource masterDataSource() {
        DruidDataSource masterDataSource = new DruidDataSource();

        return initDataSourceInfo(masterDataSource);
    }


    public DruidDataSource initDataSourceInfo(DruidDataSource dataSource) {
        dataSource.setTimeBetweenConnectErrorMillis(dataSource.getTimeBetweenEvictionRunsMillis());
        dataSource.setMinEvictableIdleTimeMillis(dataSource.getMaxEvictableIdleTimeMillis());
        dataSource.setValidationQuery("select 1 from dual");
        dataSource.setTestWhileIdle(true);
        dataSource.setTestOnBorrow(true);
        dataSource.setTestOnReturn(false);
        dataSource.setPoolPreparedStatements(true);
        dataSource.setMaxPoolPreparedStatementPerConnectionSize(20);
        dataSource.setMaxWait(dataSource.getMaxWait());
        return dataSource;
    }

    /**
     * 从数据源
     * @return
     */
    @Bean(name = "slaveDataSource")
    @ConfigurationProperties(prefix = "druid.db.slave") // application.properteis中对应属性的前缀
    public DataSource slaveDataSource() {
        DruidDataSource slaveDataSource = new DruidDataSource();
        return initDataSourceInfo(slaveDataSource);

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
        // 配置分页拦截器级日志打印
        sqlSession.setConfigLocation(new ClassPathResource("/config/mybatis-config.xml"));
      //  sqlSession.setTypeAliasesPackage("com.lming.zhang.hospital.dao.model");
        ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
//        try {
//            sqlSession.setMapperLocations(resolver.getResources("classpath:com/lming/zhang/hospital/dao/mapper/*.xml"));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return sqlSession;
    }

    public MapperScannerConfigurer mapperScannerConfig() {
        MapperScannerConfigurer mapperScanner = new MapperScannerConfigurer();
        mapperScanner.setSqlSessionFactoryBeanName("sqlSessionFactory");
       // mapperScanner.setBasePackage("com.lming.zhang.hospital.dao.mapper");
        return mapperScanner;
    }


    @Bean
    public ServletRegistrationBean druidServlet() {
        ServletRegistrationBean reg = new ServletRegistrationBean();
        reg.setServlet(new StatViewServlet());
        reg.addUrlMappings("/druid/*");
        reg.addInitParameter("loginUsername", username);
        reg.addInitParameter("loginPassword", password);
        reg.addInitParameter("logSlowSql", "true");
        return reg;
    }


    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new WebStatFilter());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        filterRegistrationBean.addInitParameter("profileEnable", "true");
        return filterRegistrationBean;
    }

//    @Bean
//    public DataSource DruidDataSource() {
//        DruidDataSource datasource = new DruidDataSource();
//        datasource.setUrl(masterDbConfig.getJdbcUrl());
//        datasource.setUsername(masterDbConfig.getUsername());
//        datasource.setPassword(masterDbConfig.getPassword());
//        datasource.setDriverClassName(masterDbConfig.getDriverClassName());
//        datasource.setInitialSize(masterDbConfig.getInitialSize());
//        datasource.setMinIdle(masterDbConfig.getMinIdle());
//        datasource.setMaxActive(masterDbConfig.getMaxActive());
//        datasource.setMaxWait(masterDbConfig.getMaxWait());
//        try {
//            datasource.setFilters(masterDbConfig.getFilters());
//        } catch (SQLException e) {
//            log.error("druid configuration initialization filter", e);
//        }
//        return datasource;
//    }
//
//    @Bean
//    public DataSource slaveDruidDataSource() {
//        DruidDataSource datasource = new DruidDataSource();
//        datasource.setUrl(slaveDbConfig.getJdbcUrl());
//        datasource.setUsername(slaveDbConfig.getUsername());
//        datasource.setPassword(slaveDbConfig.getPassword());
//        datasource.setDriverClassName(slaveDbConfig.getDriverClassName());
//        datasource.setInitialSize(slaveDbConfig.getInitialSize());
//        datasource.setMinIdle(slaveDbConfig.getMinIdle());
//        datasource.setMaxActive(slaveDbConfig.getMaxActive());
//        datasource.setMaxWait(slaveDbConfig.getMaxWait());
//        try {
//            datasource.setFilters(slaveDbConfig.getFilters());
//        } catch (SQLException e) {
//            log.error("druid configuration initialization filter", e);
//        }
//        return datasource;
//    }


}
