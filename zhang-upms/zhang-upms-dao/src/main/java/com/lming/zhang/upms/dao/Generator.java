package com.lming.zhang.upms.dao;



import com.lming.zhang.common.util.MybatisGeneratorUtil;
import com.lming.zhang.common.util.PropertiesFileUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * 代码生成工具
 * 工具将会自动生成dao,rpc-api,rpc-service对应数据库文件
 * Created by ZhangShuzheng on 2017/1/10.
 */
public class Generator {


	private static boolean controller = false;

	// 根据命名规范，只修改此常量值即可
	private static String MODULE = "zhang-upms";
	private static String DATABASE = "chc";
	private static String TABLE_PREFIX = "upms_";
	private static String PACKAGE_NAME = "com.lming.zhang.upms";
	private static String JDBC_DRIVER = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.driver");
	private static String JDBC_URL = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.url");
	private static String JDBC_USERNAME = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.username");
	private static String JDBC_PASSWORD = PropertiesFileUtil.getInstance("generator").get("generator.jdbc.password");
	// 需要insert后返回主键的表配置，key:表名,value:主键名
	private static Map<String, String> LAST_INSERT_ID_TABLES = new HashMap<String,String>();
	static {
		//LAST_INSERT_ID_TABLES.put("upms_user", "user_id");
	}

	/**
	 * 自动代码生成
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		MybatisGeneratorUtil.generator(JDBC_DRIVER, JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD, MODULE, DATABASE, TABLE_PREFIX, PACKAGE_NAME, LAST_INSERT_ID_TABLES);
	}

}
