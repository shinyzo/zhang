package com.lming.zhang.upms.server.controller.manage;

import com.alibaba.dubbo.common.json.JSONArray;
import com.baidu.unbiz.fluentvalidator.ComplexResult;
import com.baidu.unbiz.fluentvalidator.FluentValidator;
import com.baidu.unbiz.fluentvalidator.ResultCollectors;
import com.lming.zhang.common.validator.LengthValidator;
import com.lming.zhang.common.validator.NotNullValidator;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.dao.model.*;
import com.lming.zhang.upms.rpc.api.*;
import com.lming.zhang.upms.server.util.PasswordHelper;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 用户controller
 * Created by shuzheng on 2017/2/6.
 */
@Controller
@RequestMapping("/manage/user")
public class UpmsUserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UpmsUserController.class);

    @Autowired
    private UpmsUserService upmsUserService;


    @RequiresPermissions("upms:user:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "/manage/user/index";
    }



    @RequiresPermissions("upms:user:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(
            @RequestParam(required = false, defaultValue = "0", value = "offset") int offset,
            @RequestParam(required = false, defaultValue = "10", value = "limit") int limit,
            @RequestParam(required = false, defaultValue = "", value = "search") String search,
            @RequestParam(required = false, value = "sort") String sort,
            @RequestParam(required = false, value = "order") String order) {
        UpmsUserExample upmsUserExample = new UpmsUserExample();
        if (!StringUtils.isBlank(sort) && !StringUtils.isBlank(order)) {
            upmsUserExample.setOrderByClause(sort + " " + order);
        }
        if (StringUtils.isNotBlank(search)) {
            upmsUserExample.or()
                    .andRealnameLike("%" + search + "%");
            upmsUserExample.or()
                    .andUsernameLike("%" + search + "%");
        }
        List<UpmsUser> rows = upmsUserService.selectByExampleForOffsetPage(upmsUserExample, offset, limit);
        long total = upmsUserService.countByExample(upmsUserExample);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }


}