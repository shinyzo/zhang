package com.lming.zhang.upms.config;

public enum OnlineStatus {
    /**
     * 在线
     */
    on_line("在线"),

    /**
     * 离线
     */
    off_line("离线"),

    /**
     * 强制退出
     */
    force_logout("强制退出");

    private final String info;

    private OnlineStatus(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }
}