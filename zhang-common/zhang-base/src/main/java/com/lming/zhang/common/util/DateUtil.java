package com.lming.zhang.common.util;



import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {


    //joda-time

    //str->Date
    //Date->str
    public static final String STANDARD_FORMAT = "yyyy-MM-dd HH:mm:ss";

    /**
     * 获取当前时间14位字符串
     * @return
     */
    public static String getCurrentTime(){
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        return sdf.format(date);
    }



}
