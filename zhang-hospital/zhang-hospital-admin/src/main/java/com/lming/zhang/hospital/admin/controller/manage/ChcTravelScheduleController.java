package com.lming.zhang.hospital.admin.controller.manage;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import com.lming.zhang.hospital.common.constants.ChcPageVO;

import com.lming.zhang.hospital.dao.model.ChcTravelSchedule;
import com.lming.zhang.hospital.dao.model.ChcTravelScheduleExample;
import com.lming.zhang.hospital.rpc.api.ChcTravelScheduleService;
import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.dao.model.UpmsPermissionExample;
import com.lming.zhang.upms.rpc.api.UpmsPermissionService;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * ChcTravelSchedulecontroller
 * Created by zhanglm on 2018/5/2.
 */
@Controller
@Slf4j
@RequestMapping("/manage/chctravelschedule")
@Api(value = "ChcTravelSchedule控制器", description = "ChcTravelSchedule管理")
public class ChcTravelScheduleController {

    @Autowired
    private UpmsPermissionService upmsPermissionService;

    @Autowired
    private ChcTravelScheduleService chcTravelScheduleService;


    @ApiOperation(value = "ChcTravelSchedule首页")
    @RequiresPermissions("**:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@RequestParam("permissionId") Integer permissionId,
                        ModelMap modelMap) {
        // 加载菜单下的所有按钮
        UpmsPermissionExample example = new UpmsPermissionExample();
        example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

        List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
        modelMap.put("buttonPermissions",buttonPermissions);

        return "/manage/chctravelschedule/index";
    }

    @ApiOperation(value = "ChcTravelSchedule查询")
    @RequiresPermissions("**:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(ChcPageVO pageVO) {
        ChcTravelScheduleExample example = new ChcTravelScheduleExample();
        if (!StringUtils.isBlank(pageVO.getSort()) && !StringUtils.isBlank(pageVO.getOrder())) {
            example.setOrderByClause(pageVO.getSort() + " " + pageVO.getOrder());
        }

        List<ChcTravelSchedule> rows = chcTravelScheduleService.selectByExampleForStartPage(example,  pageVO.getPage(), pageVO.getRows());
        long total = chcTravelScheduleService.countByExample(example);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }



}