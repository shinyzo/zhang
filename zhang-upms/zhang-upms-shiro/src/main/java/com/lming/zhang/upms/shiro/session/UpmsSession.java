package com.lming.zhang.upms.shiro.session;

import com.lming.zhang.upms.config.OnlineStatus;
import org.apache.shiro.session.mgt.SimpleSession;

/**
 * 重写session
 * Created by shuzheng on 2017/2/27.
 */
public class UpmsSession extends SimpleSession {

    // 用户浏览器类型
    private String userAgent;

    // 在线状态
    private OnlineStatus status = OnlineStatus.off_line;

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public OnlineStatus getStatus() {
        return status;
    }

    public void setStatus(OnlineStatus status) {
        this.status = status;
    }
}
