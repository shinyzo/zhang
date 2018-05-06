package com.lming.zhang.upms.server.controller.manage;

import com.baidu.unbiz.fluentvalidator.ComplexResult;
import com.baidu.unbiz.fluentvalidator.FluentValidator;
import com.baidu.unbiz.fluentvalidator.ResultCollectors;
import com.lming.zhang.common.validator.LengthValidator;
import com.lming.zhang.upms.common.UpmsPageVO;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.dao.model.*;
import com.lming.zhang.upms.rpc.api.UpmsOrganizationService;
import com.lming.zhang.upms.rpc.api.UpmsPermissionService;
import com.lming.zhang.upms.rpc.api.UpmsUserOrganizationService;
import com.lming.zhang.upms.server.util.TreeUtil;
import com.lming.zhang.upms.server.vo.TreeNodeVO;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 组织controller
 * Created by shuzheng on 2017/2/6.
 */
@Controller
@Slf4j
@RequestMapping("/manage/organization")
public class UpmsOrganizationController {


    @Autowired
    private UpmsOrganizationService upmsOrganizationService;

    @Autowired
    private UpmsUserOrganizationService upmsUserOrganizationService;

    @Autowired
    private UpmsPermissionService upmsPermissionService;

    @ApiOperation(value = "组织首页")
    @RequiresPermissions("upms:organization:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@RequestParam("permissionId") Integer permissionId,
                        ModelMap modelMap) {
        // 加载菜单下的所有按钮
        UpmsPermissionExample example = new UpmsPermissionExample();
        example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

        List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
        modelMap.put("buttonPermissions",buttonPermissions);

        return "/manage/organization/index";
    }

    @ApiOperation(value = "组织分页")
    @RequiresPermissions("upms:organization:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(
            UpmsPageVO pageVO,
            @RequestParam(required = false, defaultValue = "", value = "search") String search) {
        UpmsOrganizationExample upmsOrganizationExample = new UpmsOrganizationExample();
        if (!StringUtils.isBlank(pageVO.getSort()) && !StringUtils.isBlank(pageVO.getOrder())) {
            upmsOrganizationExample.setOrderByClause(pageVO.getSort() + " " + pageVO.getOrder());
        }
        if (StringUtils.isNotBlank(search)) {
            upmsOrganizationExample.or()
                    .andNameLike("%" + search + "%");
        }
        List<UpmsOrganization> rows = upmsOrganizationService.selectByExampleForStartPage(upmsOrganizationExample, pageVO.getPage(), pageVO.getRows());
        long total = upmsOrganizationService.countByExample(upmsOrganizationExample);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }

    @ApiOperation(value = "新增组织页面")
    @RequiresPermissions("upms:organization:create")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String create() {
        log.info(">>> 新增组织");
        return "/manage/organization/create";
    }

    @ApiOperation(value = "新增组织保存")
    @RequiresPermissions("upms:organization:create")
    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public UpmsResult create(UpmsOrganization upmsOrganization) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsOrganization.getName(), new LengthValidator(1, 20, "组织名称"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH.getCode(), result.getErrors().get(0).getErrorMsg());
        }
        long time = System.currentTimeMillis();
        upmsOrganization.setCtime(time);
        int count = upmsOrganizationService.insertSelective(upmsOrganization);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

    @ApiOperation(value = "删除组织")
    @RequiresPermissions("upms:organization:delete")
    @RequestMapping(value = "/delete/{ids}",method = RequestMethod.GET)
    @ResponseBody
    public UpmsResult delete(@PathVariable("ids") String ids) {
        int count = upmsOrganizationService.deleteByPrimaryKeys(ids);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

    @ApiOperation(value = "修改组织页面")
    @RequiresPermissions("upms:organization:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable("id") int id, ModelMap modelMap) {
        UpmsOrganization organization = upmsOrganizationService.selectByPrimaryKey(id);
        modelMap.put("organization", organization);
        return "/manage/organization/update";
    }

    @ApiOperation(value = "修改组织保存")
    @RequiresPermissions("upms:organization:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object update(@PathVariable("id") int id, UpmsOrganization upmsOrganization) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsOrganization.getName(), new LengthValidator(1, 20, "名称"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH, result.getErrors());
        }
        upmsOrganization.setOrganizationId(id);
        int count = upmsOrganizationService.updateByPrimaryKeySelective(upmsOrganization);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }


    @ApiOperation(value = "树形组织")
    @RequiresPermissions("upms:organization:read")
    @ResponseBody
    @RequestMapping(value = "/tree", method = RequestMethod.GET)
    public Object tree() {
        List<UpmsOrganization> organizationList = upmsOrganizationService.selectByExample(new UpmsOrganizationExample());
        List<TreeNodeVO> treeNodeVOList = new ArrayList<>();
        for(int i=0;i<organizationList.size();i++)
        {
            TreeNodeVO treeNodeVO = new TreeNodeVO();
            treeNodeVO.setId(organizationList.get(i).getOrganizationId().toString());
            treeNodeVO.setText(organizationList.get(i).getName());
            treeNodeVO.setPid(organizationList.get(i).getPid() == null ? "0": organizationList.get(i).getPid().toString());
            treeNodeVOList.add(treeNodeVO);
        }
        List<Map<String,Object>> list = new ArrayList<>();
        Map<String,Object> root = new HashMap<>();
        root.put("id","0");
        root.put("text","根节点");
        root.put("children",TreeUtil.tree(treeNodeVOList,"0"));
        list.add(root);
        return list;
    }

    @ApiOperation(value = "用户组织树")
    @RequiresPermissions("upms:organization:read")
    @ResponseBody
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public Object user(@PathVariable("id") Integer id) {

        UpmsUserOrganizationExample upmsUserOrganizationExample = new UpmsUserOrganizationExample();
        upmsUserOrganizationExample.createCriteria().andUserIdEqualTo(id);
        List<UpmsUserOrganization> upmsUserOrganizations = upmsUserOrganizationService.selectByExample(upmsUserOrganizationExample);

        List<UpmsOrganization> organizationList = upmsOrganizationService.selectByExample(new UpmsOrganizationExample());
        List<Map<String,Object>> list = new ArrayList<>();
        Map<String,Object> root = new HashMap<>();
        root.put("id","0");
        root.put("text","根节点");
        root.put("children",TreeUtil.tree(checkUserOrganization(organizationList,upmsUserOrganizations),"0"));
        list.add(root);
        return list;
    }


    private List<TreeNodeVO> checkUserOrganization( List<UpmsOrganization> organizationList,List<UpmsUserOrganization> upmsUserOrganizations){
        List<TreeNodeVO> treeNodeVOList = new ArrayList<>();
        if(!CollectionUtils.isEmpty(organizationList))
        {
            for(int i=0;i<organizationList.size();i++)
            {
                TreeNodeVO treeNodeVO = new TreeNodeVO();
                treeNodeVO.setId(organizationList.get(i).getOrganizationId().toString());
                treeNodeVO.setText(organizationList.get(i).getName());
                treeNodeVO.setPid(organizationList.get(i).getPid() == null ? "0": organizationList.get(i).getPid().toString());
                boolean isChecked = false;
                for(int j=0;j<upmsUserOrganizations.size();j++)
                {
                    if(organizationList.get(i).getOrganizationId()==upmsUserOrganizations.get(j).getOrganizationId())
                    {
                        isChecked = true;
                        break;
                    }

                }
                treeNodeVO.setChecked(isChecked);


                treeNodeVOList.add(treeNodeVO);
            }
        }

        return treeNodeVOList;
    }

}
