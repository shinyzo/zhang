package com.lming.zhang.hospital.admin.controller.manage;

import com.lming.zhang.hospital.dao.model.ChcDoctorInfo;
import com.lming.zhang.hospital.dao.model.ChcDoctorInfoExample;
import com.lming.zhang.hospital.rpc.api.ChcDoctorInfoService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/manage/doctor")
public class DoctorController {

    @Autowired
    private ChcDoctorInfoService chcDoctorInfoService;

    @ApiOperation(value = "医师首页")
    @RequiresPermissions("upms:doctor:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "/manage/doctor/index";
    }


    @ApiOperation(value = "医师列表")
    @RequiresPermissions("upms:doctor:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(
            @RequestParam(required = false, defaultValue = "1", value = "page") int page,
            @RequestParam(required = false, defaultValue = "10", value = "rows") int rows,
            @RequestParam(required = false, defaultValue = "", value = "search") String search,
            @RequestParam(required = false, value = "sort") String sort,
            @RequestParam(required = false, value = "order") String order) {
        ChcDoctorInfoExample example = new ChcDoctorInfoExample();
        if (!StringUtils.isBlank(sort) && !StringUtils.isBlank(order)) {
            example.setOrderByClause(sort + " " + order);
        }
        if (StringUtils.isNotBlank(search)) {
            example.or()
                    .andDoctorNameEqualTo("%" + search + "%");
        }
        List<ChcDoctorInfo> chcDoctorInfoList = chcDoctorInfoService.selectByExampleForStartPage(example,page,rows);
        long total = chcDoctorInfoService.countByExample(example);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", chcDoctorInfoList);
        result.put("total", total);
        return result;
    }

}
