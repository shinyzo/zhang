package com.lming.zhang.upms.server.controller.manage;


import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.shiro.session.UpmsSessionDao;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * 会话管理controller
 * Created by shuzheng on 2017/2/28.
 */
@Controller
@Api(value = "会话管理", description = "会话管理")
@RequestMapping("/manage/session")
public class UpmsSessionController{

    private static final Logger LOGGER = LoggerFactory.getLogger(UpmsSessionController.class);

    @Autowired
    private UpmsSessionDao sessionDAO;

    @ApiOperation(value = "会话首页")
    @RequiresPermissions("upms:session:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "/manage/session/index";
    }

    @ApiOperation(value = "会话列表")
    @RequiresPermissions("upms:session:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(
            @RequestParam(required = false, defaultValue = "1", value = "page") int pageNum,
            @RequestParam(required = false, defaultValue = "10", value = "limit") int pageSize) {
        return sessionDAO.getActiveSessions(pageNum, pageSize);
    }

    @ApiOperation(value = "强制退出")
    @RequiresPermissions("upms:session:forceout")
    @RequestMapping(value = "/forceout/{ids}", method = RequestMethod.GET)
    @ResponseBody
    public Object forceout(@PathVariable("ids") String ids) {
        int count = sessionDAO.forceout(ids);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

}