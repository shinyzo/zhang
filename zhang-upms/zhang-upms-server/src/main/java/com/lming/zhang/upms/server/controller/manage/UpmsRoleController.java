package com.lming.zhang.upms.server.controller.manage;

import com.alibaba.fastjson.JSONArray;
import com.baidu.unbiz.fluentvalidator.ComplexResult;
import com.baidu.unbiz.fluentvalidator.FluentValidator;
import com.baidu.unbiz.fluentvalidator.ResultCollectors;
import com.lming.zhang.common.validator.LengthValidator;
import com.lming.zhang.upms.common.UpmsPageVO;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.dao.model.*;
import com.lming.zhang.upms.rpc.api.UpmsPermissionService;
import com.lming.zhang.upms.rpc.api.UpmsRolePermissionService;
import com.lming.zhang.upms.rpc.api.UpmsRoleService;
import com.lming.zhang.upms.rpc.api.UpmsSystemService;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Auth : shinyzo
 * Date : 2018/4/27
 * description : xxxx
 */
@Controller
@RequestMapping("/manage/role")
public class UpmsRoleController {

    @Autowired
    private UpmsRoleService upmsRoleService;

    @Autowired
    private UpmsRolePermissionService upmsRolePermissionService;

    @Autowired
    private UpmsPermissionService upmsPermissionService;
    @Autowired
    private UpmsSystemService upmsSystemService;

    @ApiOperation("角色首页")
    @RequiresPermissions("upms:role:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@RequestParam("permissionId") Integer permissionId,
                        ModelMap modelMap) {
        // 加载菜单下的所有按钮
        UpmsPermissionExample example = new UpmsPermissionExample();
        example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

        List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
        modelMap.put("buttonPermissions",buttonPermissions);

        return "/manage/role/index";
    }


    @ApiOperation(value = "角色分页")
    @RequiresPermissions("upms:role:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(UpmsPageVO pageVO) {
        UpmsRoleExample upmsRoleExample = new UpmsRoleExample();
        if (!StringUtils.isBlank(pageVO.getSort()) && !StringUtils.isBlank(pageVO.getOrder())) {
            upmsRoleExample.setOrderByClause(pageVO.getSort() + " " + pageVO.getOrder());
        }

        List<UpmsRole> rows = upmsRoleService.selectByExampleForStartPage(upmsRoleExample, pageVO.getPage(), pageVO.getRows());
        long total = upmsRoleService.countByExample(upmsRoleExample);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }


    @ApiOperation(value = "新增角色页面")
    @RequiresPermissions("upms:role:create")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String create() {
        return "/manage/role/create";
    }

    @ApiOperation(value = "新增角色保存")
    @RequiresPermissions("upms:role:create")
    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Object create(UpmsRole upmsRole) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsRole.getName(), new LengthValidator(1, 20, "名称"))
                .on(upmsRole.getTitle(), new LengthValidator(1, 20, "标题"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH.getCode(),
                    result.getErrors().get(0).getErrorMsg());
        }
        long time = System.currentTimeMillis();
        upmsRole.setCtime(time);
        upmsRole.setOrders(time);
        int count = upmsRoleService.insertSelective(upmsRole);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }


    @ApiOperation(value = "修改角色页面")
    @RequiresPermissions("upms:role:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable("id") int id, ModelMap modelMap) {
        UpmsRole role = upmsRoleService.selectByPrimaryKey(id);
        modelMap.put("role", role);
        return "/manage/role/update";
    }

    @ApiOperation(value = "修改角色保存")
    @RequiresPermissions("upms:role:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object update(@PathVariable("id") int id, UpmsRole upmsRole) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsRole.getName(), new LengthValidator(1, 40, "名称"))
                .on(upmsRole.getTitle(), new LengthValidator(1, 40, "标题"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH.getCode(),
                    result.getErrors().get(0).getErrorMsg());
        }
        upmsRole.setRoleId(id);
        int count = upmsRoleService.updateByPrimaryKeySelective(upmsRole);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }


    @ApiOperation(value = "删除角色")
    @RequiresPermissions("upms:role:delete")
    @RequestMapping(value = "/delete/{ids}",method = RequestMethod.GET)
    @ResponseBody
    public Object delete(@PathVariable("ids") String ids) {
        // 删除角色前要删除角色下的所有权限,由于是分布式系统，此处应该在service中进行实物操作
       List<String> roleidList = Arrays.asList(ids.split("-"));
       int count = 0;
       for(String roleId:roleidList){
           count += upmsRoleService.deleteRoleAndPermissions(Integer.parseInt(roleId));
       }

        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }


    @ApiOperation(value = "角色权限页面")
    @RequiresPermissions("upms:role:permission")
    @RequestMapping(value = "/permission/{roleId}", method = RequestMethod.GET)
    public String permission(@PathVariable("roleId") Integer roleId,ModelMap modelMap) {
        UpmsRole upmsRole = upmsRoleService.selectByPrimaryKey(roleId);
        modelMap.put("upmsRole",upmsRole);

        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria()
                .andStatusEqualTo((byte) 1);
        List<UpmsSystem> upmsSystems = upmsSystemService.selectByExample(upmsSystemExample);
        modelMap.put("upmsSystems",upmsSystems);
        return "/manage/role/permission";
    }

    @ApiOperation(value = "角色权限分配")
    @RequiresPermissions("upms:role:permission")
    @RequestMapping(value = "/permission/{roleId}", method = RequestMethod.POST)
    @ResponseBody
    public UpmsResult permission(@PathVariable("roleId") int roleId, HttpServletRequest request) {
        String permissionIds = request.getParameter("permissionids");
        int count = upmsRolePermissionService.rolePermission(roleId, Arrays.asList(permissionIds.split(",")) );
        return new UpmsResult(UpmsResultEnum.SUCCESS,count);
    }

}
