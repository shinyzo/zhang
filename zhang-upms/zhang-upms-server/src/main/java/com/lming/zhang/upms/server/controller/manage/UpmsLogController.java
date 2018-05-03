package com.lming.zhang.upms.server.controller.manage;


import com.lming.zhang.common.util.StringUtil;
import com.lming.zhang.upms.common.UpmsPageVO;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.dao.model.UpmsLog;
import com.lming.zhang.upms.dao.model.UpmsLogExample;
import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.dao.model.UpmsPermissionExample;
import com.lming.zhang.upms.rpc.api.UpmsLogService;
import com.lming.zhang.upms.rpc.api.UpmsPermissionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 日志controller
 * Created by shuzheng on 2017/3/14.
 */
@Controller
@Api(value = "日志管理", description = "日志管理")
@RequestMapping("/manage/log")
public class UpmsLogController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UpmsLogController.class);

    @Autowired
    private UpmsLogService upmsLogService;
    @Autowired
    private UpmsPermissionService upmsPermissionService;

    @ApiOperation(value = "日志首页")
    @RequiresPermissions("upms:log:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@RequestParam("permissionId") Integer permissionId,
                        ModelMap modelMap) {
        // 加载菜单下的所有按钮
        UpmsPermissionExample example = new UpmsPermissionExample();
        example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

        List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
        modelMap.put("buttonPermissions",buttonPermissions);

        return "/manage/log/index";
    }

    @ApiOperation(value = "日志列表")
    @RequiresPermissions("upms:log:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(
            UpmsPageVO pageVO,
            @RequestParam(required = false, defaultValue = "", value = "username") String username,
            @RequestParam(required = false, defaultValue = "", value = "ip") String ip,
            @RequestParam(required = false, defaultValue = "", value = "description") String description) {
        UpmsLogExample upmsLogExample = new UpmsLogExample();
        if (!StringUtils.isBlank(pageVO.getSort()) && !StringUtils.isBlank(pageVO.getOrder())) {
            upmsLogExample.setOrderByClause(StringUtil.humpToLine(pageVO.getSort()) + " " + pageVO.getOrder());
        }
        if (StringUtils.isNotBlank(username)) {
            upmsLogExample.createCriteria()
                    .andUsernameEqualTo( username );
        }
        if (StringUtils.isNotBlank(description)) {
            upmsLogExample.createCriteria()
                    .andDescriptionLike("%" + description + "%");
        }
        if (StringUtils.isNotBlank(ip)) {
            upmsLogExample.createCriteria()
                    .andIpLike("%" + ip + "%");
        }
        List<UpmsLog> rows = upmsLogService.selectByExampleForStartPage(upmsLogExample, pageVO.getPage(), pageVO.getRows());
        long total = upmsLogService.countByExample(upmsLogExample);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }

    @ApiOperation(value = "删除日志")
    @RequiresPermissions("upms:log:delete")
    @RequestMapping(value = "/delete/{ids}", method = RequestMethod.GET)
    @ResponseBody
    public Object delete(@PathVariable("ids") String ids) {
        int count = upmsLogService.deleteByPrimaryKeys(ids);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

}