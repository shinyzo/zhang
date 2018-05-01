package com.lming.zhang.hospital.admin.controller.manage;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfoExample;
import com.lming.zhang.hospital.rpc.api.ChcDoctorInfoService;
import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.dao.model.UpmsPermissionExample;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ChcDoctorInfocontroller
 * Created by zhanglm on 2018/5/1.
 */
@Controller
@RequestMapping("/manage/doctor")
@Api(value = "ChcDoctorInfo控制器", description = "ChcDoctorInfo管理")
public class ChcDoctorInfoController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ChcDoctorInfoController.class);


    @Autowired
    private UpmsPermissionService upmsPermissionService;

    @Autowired
    private ChcDoctorInfoService chcDoctorInfoService;


    @ApiOperation(value = "ChcDoctorInfo首页")
    @RequiresPermissions("upms:doctor:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@RequestParam("permissionId") Integer permissionId,
                        ModelMap modelMap) {
        // 加载菜单下的所有按钮
        UpmsPermissionExample example = new UpmsPermissionExample();
        example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

        List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
        modelMap.put("buttonPermissions",buttonPermissions);

        return "/manage/doctor/index";
    }

    @ApiOperation(value = "ChcDoctorInfo查询")
    @RequiresPermissions("upms:doctor:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(
        @RequestParam(required = false, defaultValue = "1", value = "page") int pageNum,
        @RequestParam(required = false, defaultValue = "10", value = "rows") int pageSize,
        @RequestParam(required = false, value = "sort") String sort,
        @RequestParam(required = false, value = "order") String order) {
        ChcDoctorInfoExample example = new ChcDoctorInfoExample();
        if (!StringUtils.isBlank(sort) && !StringUtils.isBlank(order)) {
            example.setOrderByClause(sort + " " + order);
        }

        List<ChcDoctorInfo> rows = chcDoctorInfoService.selectByExampleForStartPage(example, pageNum, pageSize);
        long total = chcDoctorInfoService.countByExample(example);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }



}