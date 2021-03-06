package com.lming.zhang.upms.server.controller.manage;


import com.alibaba.fastjson.JSONArray;
import com.baidu.unbiz.fluentvalidator.ComplexResult;
import com.baidu.unbiz.fluentvalidator.FluentValidator;
import com.baidu.unbiz.fluentvalidator.ResultCollectors;
import com.lming.zhang.common.validator.LengthValidator;
import com.lming.zhang.common.validator.NotNullValidator;
import com.lming.zhang.upms.common.UpmsPageVO;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.dao.model.*;
import com.lming.zhang.upms.rpc.api.*;
import com.lming.zhang.upms.server.vo.TreeNodeVO;
import com.lming.zhang.upms.util.PasswordHelper;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.Transformer;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import sun.reflect.generics.tree.Tree;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 用户controller
 * Created by shuzheng on 2017/2/6.
 */
@Controller
@Slf4j
@RequestMapping("/manage/user")
public class UpmsUserController {


    @Autowired
    private UpmsUserService upmsUserService;

    @Autowired
    private UpmsPermissionService upmsPermissionService;

    @Autowired
    private UpmsRoleService upmsRoleService;

    @Autowired
    private UpmsUserRoleService upmsUserRoleService;

    @Autowired
    private UpmsUserPermissionService upmsUserPermissionService;

    @Autowired
    private UpmsUserOrganizationService upmsUserOrganizationService;

    @ApiOperation("用户页面")
    @RequiresPermissions("upms:user:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@RequestParam("permissionId") Integer permissionId,
                           ModelMap modelMap) {
        // 加载菜单下的所有按钮
        UpmsPermissionExample example = new UpmsPermissionExample();
        example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

        List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
        modelMap.put("buttonPermissions",buttonPermissions);

        return "/manage/user/index";
    }



    @ApiOperation("用户分页")
    @RequiresPermissions("upms:user:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(UpmsPageVO pageVO) {
        UpmsUserExample upmsUserExample = new UpmsUserExample();
        if (!StringUtils.isBlank(pageVO.getSort()) && !StringUtils.isBlank(pageVO.getOrder())) {
            upmsUserExample.setOrderByClause(pageVO.getSort() + " " + pageVO.getOrder());
        }
//        if (StringUtils.isNotBlank(search)) {
//            upmsUserExample.or()
//                    .andRealnameLike("%" + search + "%");
//            upmsUserExample.or()
//                    .andUsernameLike("%" + search + "%");
//        }
        List<UpmsUser> rows = upmsUserService.selectByExampleForStartPage(upmsUserExample, pageVO.getPage(), pageVO.getRows());
        long total = upmsUserService.countByExample(upmsUserExample);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }


    @ApiOperation(value = "新增用户页面")
    @RequiresPermissions("upms:user:create")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String create() {
        return "/manage/user/create";
    }

    @ApiOperation(value = "新增用户保存")
    @RequiresPermissions("upms:user:create")
    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Object create(UpmsUser upmsUser) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsUser.getUsername(), new LengthValidator(1, 20, "帐号"))
                .on(upmsUser.getPassword(), new LengthValidator(5, 32, "密码"))
                .on(upmsUser.getRealname(), new NotNullValidator("姓名"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH.getCode(),
                    result.getErrors().get(0).getErrorMsg());
        }
        long time = System.currentTimeMillis();
        String salt = UUID.randomUUID().toString().replaceAll("-", "");
        upmsUser.setSalt(salt);
        upmsUser.setPassword(PasswordHelper.encryptPassword(upmsUser.getPassword(),upmsUser.getSalt()));
        upmsUser.setCtime(time);
        upmsUser = upmsUserService.createUser(upmsUser);
        if (null == upmsUser) {
            return new UpmsResult(UpmsResultEnum.FAILED.getCode(), "帐号名已存在！");
        }
        log.info("新增用户，主键：userId={}", upmsUser.getUserId());
        return new UpmsResult(UpmsResultEnum.SUCCESS, 1);
    }

    @ApiOperation(value = "删除用户")
    @RequiresPermissions("upms:user:delete")
    @RequestMapping(value = "/delete/{ids}",method = RequestMethod.GET)
    @ResponseBody
    public Object delete(@PathVariable("ids") String ids) {
        int count = upmsUserService.deleteByPrimaryKeys(ids);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

    @ApiOperation(value = "修改用户页面")
    @RequiresPermissions("upms:user:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable("id") int id, ModelMap modelMap) {
        UpmsUser user = upmsUserService.selectByPrimaryKey(id);
        modelMap.put("user", user);
        return "/manage/user/update";
    }

    @ApiOperation(value = "修改用户保存")
    @RequiresPermissions("upms:user:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object update(@PathVariable("id") int id, UpmsUser upmsUser) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsUser.getUsername(), new LengthValidator(1, 20, "帐号"))
                .on(upmsUser.getRealname(), new NotNullValidator("姓名"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH.getCode(), result.getErrors().get(0).getErrorMsg());
        }
        // 不允许直接改密码
        upmsUser.setPassword(null);
        upmsUser.setUserId(id);
        int count = upmsUserService.updateByPrimaryKeySelective(upmsUser);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }


    @ApiOperation(value = "用户角色数据")
    @RequiresPermissions("upms:user:role")
    @RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Object role(@PathVariable("id") int id, ModelMap modelMap) {
        List<UpmsRole> upmsRoles = upmsRoleService.selectByExample(new UpmsRoleExample());
        // 用户拥有角色
        UpmsUserRoleExample upmsUserRoleExample = new UpmsUserRoleExample();
        upmsUserRoleExample.createCriteria()
                .andUserIdEqualTo(id);
        List<UpmsUserRole> upmsUserRoles = upmsUserRoleService.selectByExample(upmsUserRoleExample);

        List<TreeNodeVO> treeNodeVOList = new ArrayList<>();

        for(int i=0;i<upmsRoles.size();i++)
        {
            boolean isChecked =false;
            for(int j=0;j<upmsUserRoles.size();j++)
            {
                if(upmsRoles.get(i).getRoleId() == upmsUserRoles.get(j).getRoleId())
                {
                    isChecked = true;
                    break;
                }
            }
            TreeNodeVO treeNodeVO = new TreeNodeVO();
            treeNodeVO.setId(upmsRoles.get(i).getRoleId().toString());
            treeNodeVO.setText(upmsRoles.get(i).getTitle());
            treeNodeVO.setChecked(isChecked);
            treeNodeVOList.add(treeNodeVO);
        }
        return treeNodeVOList;
    }


    @ApiOperation(value = "用户角色修改")
    @RequiresPermissions("upms:user:role")
    @RequestMapping(value = "/role/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object role(@PathVariable("id") int id, HttpServletRequest request) {
        String roleIds = request.getParameter("roleId");
        String[] roleIdArray = roleIds.split(",");
        upmsUserRoleService.role(roleIdArray, id);
        return new UpmsResult(UpmsResultEnum.SUCCESS, "");
    }

    @ApiOperation(value = "用户权限页面")
    @RequiresPermissions("upms:user:permission")
    @RequestMapping(value = "/permission/{id}", method = RequestMethod.GET)
    public String permission(@PathVariable("id") int id, ModelMap modelMap) {
        UpmsUser user = upmsUserService.selectByPrimaryKey(id);
        modelMap.put("user", user);
        return "/manage/user/permission";
    }

    @ApiOperation(value = "用户权限数据")
    @RequiresPermissions("upms:user:permission")
    @RequestMapping(value = "/permission/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object permission(@PathVariable("id") int id, HttpServletRequest request) {

        String addPermissionids = request.getParameter("addids");
        String minusPermissionids = request.getParameter("minusids");

        List<Integer> addPermisssionList = new ArrayList<>();
        if(StringUtils.isNotEmpty(addPermissionids))
        {
            CollectionUtils.collect(Arrays.asList(addPermissionids.split(",")), new Transformer() {
                @Override
                public Object transform(Object o) {
                    return Integer.valueOf(o.toString());
                }
            }, addPermisssionList);
        }


        List<Integer> minusPermissionList = new ArrayList<>();
        if(StringUtils.isNotEmpty(minusPermissionids))
        {
            CollectionUtils.collect(Arrays.asList(minusPermissionids.split(",")), new Transformer() {
                @Override
                public Object transform(Object o) {
                    return Integer.valueOf(o.toString());
                }
            }, minusPermissionList);
        }

        int count = upmsUserPermissionService.userPermission(id,addPermisssionList,minusPermissionList);

        return new UpmsResult(UpmsResultEnum.SUCCESS,count);
    }


    @ApiOperation(value = "用户组织页面")
    @RequiresPermissions("upms:user:organization")
    @RequestMapping(value = "/organization/{id}", method = RequestMethod.GET)
    public String organization(@PathVariable("id") int id, ModelMap modelMap) {
        // 所有组织
        UpmsUser upmsUser = upmsUserService.selectByPrimaryKey(id);
        modelMap.put("user",upmsUser);

        return "/manage/user/organization";
    }

    @ApiOperation(value = "用户组织保存")
    @RequiresPermissions("upms:user:organization")
    @RequestMapping(value = "/organization/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object organization(@PathVariable("id") int id, HttpServletRequest request) {
//        String[] organizationIds = request.getParameterValues("organizationId");
        String organizationIds = request.getParameter("organizationIds");
        upmsUserOrganizationService.organization(organizationIds.split(","), id);
        return new UpmsResult(UpmsResultEnum.SUCCESS, "");

    }

}
