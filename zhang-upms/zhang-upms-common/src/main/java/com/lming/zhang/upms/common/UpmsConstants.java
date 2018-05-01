package com.lming.zhang.upms.common;

/**
 * Auth : shinyzo
 * Date : 2018/4/24
 * description : xxxx
 */
public class UpmsConstants {

    public static final String UPMS_TYPE = "zhang.upms.type";

    public static final String RAND_KEY = "zhang-upms-server-rand-key";

    public static final Integer RAND_KEY_EXPIRE_TIME = 1200;

    public static final String CLIENT = "client";
    public static final String SERVER = "server";

    // 服务端sessionid
    public final static String ZHANG_UPMS_SERVER_SESSION_ID = "zhang-upms-server-session-id";
    // 服务端sessionid列表
    public final static String ZHANG_UPMS_SERVER_SESSION_IDS = "zhang-upms-server-session-ids";
    // code key
    public final static String ZHANG_UPMS_SERVER_CODE = "zhang-upms-server-code";
    // shiro sessionid
    public final static String ZHANG_UPMS_SHIRO_SESSION_ID = "zhang-upms-shiro-session-id";
    // 客户端sessionid
    public final static String ZHANG_UPMS_CLIENT_SESSION_ID = "zhang-upms-client-session-id";
    // 单点同一个code所有局部会话key
    public final static String ZHANG_UPMS_CLIENT_SESSION_IDS = "zhang-upms-client-session-ids";


}
