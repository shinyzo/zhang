package com.lming.zhang.common.util;

/**
 * 当传过来的对象为空，则把传过来的默认值返回
 * 防止空指针异常，程序能正常运行
 *
 * 例如:分页没有给分页数据等，字符串转"",或给定默认值
 */

/**
 * @Author shinyZo
 * @date 2017-11-23
 * @description
 */
public class DefaultUtil<T> {

    public static <T> T getVal(T obj, T defaultVal) {
        if (obj == null) return defaultVal;
        return obj;
    }
}
