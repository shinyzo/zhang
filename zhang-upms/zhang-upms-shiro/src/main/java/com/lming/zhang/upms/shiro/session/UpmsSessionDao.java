package com.lming.zhang.upms.shiro.session;

import com.lming.zhang.common.util.RedisUtil;
import com.lming.zhang.upms.common.UpmsConstants;
import com.lming.zhang.upms.config.OnlineStatus;
import com.lming.zhang.upms.util.SerializableUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.ObjectUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.ValidatingSession;
import org.apache.shiro.session.mgt.eis.CachingSessionDAO;
import redis.clients.jedis.Jedis;

import java.io.Serializable;
import java.util.*;

/**
 * 基于redis的sessionDao，缓存共享session
 * Created by shuzheng on 2017/2/23.
 */
@Slf4j
public class UpmsSessionDao extends CachingSessionDAO {

    @Override
    protected Serializable doCreate(Session session) {
        Serializable sessionId = generateSessionId(session);
        assignSessionId(session, sessionId);
        RedisUtil.set(UpmsConstants.ZHANG_UPMS_SHIRO_SESSION_ID + "_" + sessionId,
                           SerializableUtil.serialize(session),
                (int) session.getTimeout() / 1000);
        log.info("doCreate >>>>> sessionId={}", sessionId);
        return sessionId;
    }

    @Override
    protected Session doReadSession(Serializable sessionId) {
        String session = RedisUtil.get(UpmsConstants.ZHANG_UPMS_SHIRO_SESSION_ID + "_" + sessionId);
        // log.info("doReadSession >>>>> sessionId={}", sessionId);
        return SerializableUtil.deserialize(session);
    }

    @Override
    protected void doUpdate(Session session) {
        // 如果会话过期/停止 没必要再更新了
        if(session instanceof ValidatingSession && !((ValidatingSession)session).isValid()) {
            return;
        }
        // 更新session的最后一次访问时间
       // UpmsSession upmsSession = (UpmsSession) session;
        Session cacheUpmsSession = doReadSession(session.getId());
        if (null != cacheUpmsSession) {
           session.setAttribute("status",cacheUpmsSession.getAttribute("status"));
           session.setAttribute("FORCE_LOGOUT", cacheUpmsSession.getAttribute("FORCE_LOGOUT"));
        }
        RedisUtil.set(UpmsConstants.ZHANG_UPMS_SHIRO_SESSION_ID + "_" + session.getId(),
                SerializableUtil.serialize(session),
                (int) session.getTimeout() / 1000);
        // 更新ZHENG_UPMS_SERVER_SESSION_ID、ZHENG_UPMS_SERVER_CODE过期时间 TODO
        // log.info("doUpdate >>>>> sessionId={}", session.getId());
    }

    @Override
    protected void doDelete(Session session) {
        String sessionId = session.getId().toString();
        String upmsType = ObjectUtils.toString(session.getAttribute(UpmsConstants.UPMS_TYPE));
        if (UpmsConstants.CLIENT.equals(upmsType)) {
            // 删除局部会话和同一code注册的局部会话
            String code = RedisUtil.get(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_ID + "_" + sessionId);
            Jedis jedis = RedisUtil.getJedis();
            jedis.del(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_ID + "_" + sessionId);
            jedis.srem(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_IDS + "_" + code, sessionId);
            jedis.close();
        }
        if (UpmsConstants.SERVER.equals(upmsType)) {
            // 当前全局会话code
            String code = RedisUtil.get(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_ID + "_" + sessionId);
            // 清除全局会话
            RedisUtil.remove(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_ID + "_" + sessionId);
            // 清除code校验值
            RedisUtil.remove(UpmsConstants.ZHANG_UPMS_SERVER_CODE + "_" + code);
            // 清除所有局部会话
            Jedis jedis = RedisUtil.getJedis();
            Set<String> clientSessionIds = jedis.smembers(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_IDS + "_" + code);
            for (String clientSessionId : clientSessionIds) {
                jedis.del(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_ID + "_" + clientSessionId);
                jedis.srem(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_IDS + "_" + code, clientSessionId);
            }
            log.info("当前code={}，对应的注册系统个数：{}个", code, jedis.scard(UpmsConstants.ZHANG_UPMS_CLIENT_SESSION_IDS + "_" + code));
            jedis.close();
            // 维护会话id列表，提供会话分页管理
            RedisUtil.lrem(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_IDS, 1, sessionId);
        }
        // 删除session
        RedisUtil.remove(UpmsConstants.ZHANG_UPMS_SHIRO_SESSION_ID + "_" + sessionId);
        // log.info("doUpdate >>>>> sessionId={}", sessionId);
    }

    /**
     * 获取会话列表
     * @param offset
     * @param limit
     * @return
     */
    public Map getActiveSessions(int offset, int limit) {
        Map sessions = new HashMap();
        Jedis jedis = RedisUtil.getJedis();
        // 获取在线会话总数
        long total = jedis.llen(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_IDS);
        // 获取当前页会话详情
        List<String> ids = jedis.lrange(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_IDS, offset, (offset + limit - 1));
        List<Session> rows = new ArrayList<>();
        for (String id : ids) {
            String session = RedisUtil.get(UpmsConstants.ZHANG_UPMS_SHIRO_SESSION_ID + "_" + id);
            // 过滤redis过期session
            if (null == session) {
                RedisUtil.lrem(UpmsConstants.ZHANG_UPMS_SERVER_SESSION_IDS, 1, id);
                total = total - 1;
                continue;
            }
             rows.add(SerializableUtil.deserialize(session));
        }
        jedis.close();
        sessions.put("total", total);
        sessions.put("rows", rows);
        return sessions;
    }

    /**
     * 强制退出
     * @param ids
     * @return
     */
    public int forceout(String ids) {
        String[] sessionIds = ids.split(",");
        for (String sessionId : sessionIds) {
            // 会话增加强制退出属性标识，当此会话访问系统时，判断有该标识，则退出登录
            Session upmsSession = doReadSession(sessionId);
            upmsSession.setAttribute("FORCE_LOGOUT", "FORCE_LOGOUT");
            upmsSession.setAttribute("status",OnlineStatus.force_logout);
            RedisUtil.set(UpmsConstants.ZHANG_UPMS_SHIRO_SESSION_ID + "_" + sessionId,
                    SerializableUtil.serialize(upmsSession),
                    (int) upmsSession.getTimeout() / 1000);
        }
        return sessionIds.length;
    }

    /**
     * 更改在线状态
     *
     * @param sessionId
     * @param onlineStatus
     */
    public void updateStatus(Serializable sessionId, OnlineStatus onlineStatus) {
        Session session =  doReadSession(sessionId);
        if (null == session) {
            return;
        }
        session.setAttribute("status",onlineStatus);
        RedisUtil.set(UpmsConstants.ZHANG_UPMS_SHIRO_SESSION_ID + "_" + session.getId(), SerializableUtil.serialize(session), (int) session.getTimeout() / 1000);
    }

}
