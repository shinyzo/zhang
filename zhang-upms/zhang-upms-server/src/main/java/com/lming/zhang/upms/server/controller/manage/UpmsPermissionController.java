package com.lming.zhang.upms.server.controller.manage;

import com.baidu.unbiz.fluentvalidator.ComplexResult;
import com.baidu.unbiz.fluentvalidator.FluentValidator;
import com.baidu.unbiz.fluentvalidator.ResultCollectors;
import com.lming.zhang.common.validator.LengthValidator;
import com.lming.zhang.upms.common.UpmsPageVO;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.dao.model.*;
import com.lming.zhang.upms.rpc.api.UpmsApiService;
import com.lming.zhang.upms.rpc.api.UpmsPermissionService;
import com.lming.zhang.upms.rpc.api.UpmsSystemService;
import com.lming.zhang.upms.server.util.PermissionTreeUtil;
import com.lming.zhang.upms.server.vo.PermissionTreeDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.omg.PortableInterceptor.Interceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 权限controller
 * Created by shuzheng on 2017/2/6.
 */
@Controller
@Api(value = "权限管理", description = "权限管理")
@RequestMapping("/manage/permission")
@Slf4j
public class UpmsPermissionController{

    private static final Logger LOGGER = LoggerFactory.getLogger(UpmsPermissionController.class);

    @Autowired
    private UpmsPermissionService upmsPermissionService;

    @Autowired
    private UpmsSystemService upmsSystemService;

    @Autowired
    private UpmsApiService upmsApiService;

    @ApiOperation(value = "权限首页")
    @RequiresPermissions("upms:permission:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(@RequestParam("permissionId") Integer permissionId,
                        ModelMap modelMap) {
        // 加载菜单下的所有按钮
        UpmsPermissionExample example = new UpmsPermissionExample();
        example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

        List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
        modelMap.put("buttonPermissions",buttonPermissions);

        //
        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria()
                .andStatusEqualTo((byte) 1);
        List<UpmsSystem> upmsSystems = upmsSystemService.selectByExample(upmsSystemExample);
        modelMap.put("upmsSystems",upmsSystems);

        return "/manage/permission/index";
    }

    @ApiOperation(value = "权限列表")
    @RequiresPermissions("upms:permission:read")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object list(
            UpmsPageVO pageVO,
            @RequestParam(required = false, defaultValue = "", value = "name") String name,
            @RequestParam(required = false, defaultValue = "0", value = "type") int type,
            @RequestParam(required = false, defaultValue = "0", value = "systemId") int systemId) {
        UpmsPermissionExample upmsPermissionExample = new UpmsPermissionExample();
        UpmsPermissionExample.Criteria criteria = upmsPermissionExample.createCriteria();
        if (0 != type) {
            criteria.andTypeEqualTo((byte) type);
        }
        if (0 != systemId) {
            criteria.andSystemIdEqualTo(systemId);
        }

        if (StringUtils.isNotBlank(name)) {
            criteria.andNameLike("%" + name + "%");
        }

        if (StringUtils.isNotBlank(pageVO.getSort()) && StringUtils.isNotBlank(pageVO.getOrder())) {
            upmsPermissionExample.setOrderByClause(pageVO.getSort() + " " + pageVO.getOrder());
        }

        List<UpmsPermission> rows = upmsPermissionService.selectByExampleForStartPage(upmsPermissionExample, pageVO.getPage(), pageVO.getRows());
        long total = upmsPermissionService.countByExample(upmsPermissionExample);
        Map<String, Object> result = new HashMap<>();
        result.put("rows", rows);
        result.put("total", total);
        return result;
    }

    @ApiOperation(value = "角色权限列表")
    @RequiresPermissions("upms:permission:read")
    @RequestMapping(value = "/role/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object role(@PathVariable("id") int id) {
       // return upmsPermissionService.getTreeByRoleId(id);
        return null;
    }

    @ApiOperation(value = "用户权限列表")
    @RequiresPermissions("upms:permission:read")
    @RequestMapping(value = "/user/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object user(@PathVariable("id") int id, HttpServletRequest request) {
        // return upmsPermissionService.getTreeByUserId(id, NumberUtils.toByte(request.getParameter("type")));
        return null;
    }

    @ApiOperation(value = "系统权限列表")
    @RequiresPermissions("upms:permission:read")
    @RequestMapping(value = "/tree", method = RequestMethod.GET)
    @ResponseBody
    public Object tree(HttpServletRequest request) {
        // return upmsPermissionService.getTreeByUserId(id, NumberUtils.toByte(request.getParameter("type")));
        // 前端高度不够时，点击展开会重新加载数据，此时获取id进行数据加载
        String id = (String) request.getParameter("id");
        if(!StringUtils.isEmpty(id))
        {
            UpmsPermissionExample example = new UpmsPermissionExample();
            example.createCriteria()
                    .andStatusEqualTo((byte) 1)
                    .andTypeIn(Arrays.asList((byte) 1,(byte)2))
                    .andSystemIdEqualTo(Integer.parseInt(id));
            // 加载所选系统id,一级二级菜单权限
             List<UpmsPermission> permissions = upmsPermissionService.selectByExample(example);

            return PermissionTreeUtil.rightTree(converter(permissions),"0");
        }


        // 加载所有系统权限数据
        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria()
                .andStatusEqualTo((byte) 1);
        List<UpmsSystem> upmsSystems = upmsSystemService.selectByExample(upmsSystemExample);
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i=0;i<upmsSystems.size();i++){
            // 加载菜单type=1,2的
            UpmsPermissionExample example = new UpmsPermissionExample();
            example.createCriteria()
                    .andStatusEqualTo((byte) 1)
                    .andTypeIn(Arrays.asList((byte) 1,(byte)2))
                    .andSystemIdEqualTo(upmsSystems.get(i).getSystemId());
            List<UpmsPermission> permissions = upmsPermissionService.selectByExample(example);

            Map<String,Object> systemMap = new HashMap<>();
            systemMap.put("id",upmsSystems.get(i).getSystemId());
            systemMap.put("text",upmsSystems.get(i).getTitle());
            systemMap.put("attributes","systemnode"); // 系统节点便于前端判断
            if(i>0){
                systemMap.put("state","closed");
            }

            systemMap.put("children",PermissionTreeUtil.rightTree(converter(permissions),"0"));
            list.add(systemMap);
        }
        return list;
    }





    @ApiOperation(value = "角色权限列表")
    @RequiresPermissions("upms:permission:read")
    @RequestMapping(value = "/role/{roleId}", method = RequestMethod.GET)
    @ResponseBody
    public Object role(@PathVariable("roleId") Integer roleId, HttpServletRequest request) {
        // 加载角色的所有权限id
        List<UpmsRolePermission> rolePermissions = upmsApiService.selectUpmsRolePermisstionByUpmsRoleId(roleId);
        // 展开某个节点
        String id = (String) request.getParameter("id");
        if(StringUtils.isNotBlank(id))
        {
            UpmsPermissionExample example = new UpmsPermissionExample();
            example.createCriteria()
                    .andStatusEqualTo((byte) 1)
                    .andTypeIn(Arrays.asList((byte) 1,(byte)2))
                    .andSystemIdEqualTo(Integer.parseInt(id));
            List<UpmsPermission> permissions = upmsPermissionService.selectByExample(example);

            List<Map<String,Object>> childTreeList = PermissionTreeUtil.rightTree(checkPermission(permissions,rolePermissions),"0");
            return childTreeList;
        }



        // 加载所有系统权限数据
        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria().andStatusEqualTo((byte) 1);
        List<UpmsSystem> upmsSystems = upmsSystemService.selectByExample(upmsSystemExample);
        List<Map<String,Object>> list = new ArrayList<>();
        for(int i=0;i<upmsSystems.size();i++){
            UpmsPermissionExample example = new UpmsPermissionExample();
            example.createCriteria()
                    .andStatusEqualTo((byte) 1)
                    .andSystemIdEqualTo(upmsSystems.get(i).getSystemId());
            List<UpmsPermission> permissions = upmsPermissionService.selectByExample(example);

            Map<String,Object> systemMap = new HashMap<>();
            systemMap.put("id",upmsSystems.get(i).getSystemId());
            systemMap.put("text",upmsSystems.get(i).getTitle());
            systemMap.put("attributes","systemnode");
            if(i>0){
                systemMap.put("state","closed");
            }
            systemMap.put("children",PermissionTreeUtil.rightTree(checkPermission(permissions,rolePermissions),"0"));
            list.add(systemMap);
        }
        return list;
    }

    /**
     * 权限属性字段转换
     * @param permissions
     * @return
     */
    private  List<PermissionTreeDTO> converter(List<UpmsPermission> permissions){
        List<PermissionTreeDTO> list = new ArrayList<>();
        for(int i=0;i<permissions.size();i++){
            PermissionTreeDTO permissionTreeDTO = new PermissionTreeDTO();
            permissionTreeDTO.setId(permissions.get(i).getPermissionId().toString());
            permissionTreeDTO.setText(permissions.get(i).getName());
            permissionTreeDTO.setChecked(false);
            permissionTreeDTO.setIconCls(permissions.get(i).getIcon());
            permissionTreeDTO.setPid(permissions.get(i).getPid().toString());
            list.add(permissionTreeDTO);
        }
        return list;
    }

    /**
     * 校验是否有权限，有则设置选中
     * @param permissions
     * @param rolePermissions
     * @return
     */
    private List<PermissionTreeDTO> checkPermission(List<UpmsPermission> permissions,List<UpmsRolePermission> rolePermissions){
        List<PermissionTreeDTO> list = new ArrayList<>();
        for(int i=0;i<permissions.size();i++)
        {
            boolean isChecked = false;
            for(int j=0;j<rolePermissions.size();j++)
            {
                if(permissions.get(i).getPermissionId()==rolePermissions.get(j).getPermissionId())
                {
                    isChecked = true;
                    break;
                }
            }

            PermissionTreeDTO permissionTreeDTO = new PermissionTreeDTO();
            permissionTreeDTO.setId(permissions.get(i).getPermissionId().toString());
            permissionTreeDTO.setText(permissions.get(i).getName());
            permissionTreeDTO.setChecked(isChecked);
            permissionTreeDTO.setIconCls(permissions.get(i).getIcon());
            permissionTreeDTO.setPid(permissions.get(i).getPid().toString());

            list.add(permissionTreeDTO);
        }
        return list;
    }


    @ApiOperation(value = "新增权限")
    @RequiresPermissions("upms:permission:create")
    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String create(ModelMap modelMap) {
        return "/manage/permission/create";
    }

    @ApiOperation(value = "新增权限")
    @RequiresPermissions("upms:permission:create")
    @ResponseBody
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public Object create(UpmsPermission upmsPermission) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsPermission.getName(), new LengthValidator(1, 20, "权限名称"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH.getCode(), result.getErrors().get(0).getErrorMsg());
        }

        // 选择了菜单节点
        if(upmsPermission.getPid() > 0 )
        {
            UpmsPermission uupermission =  upmsPermissionService.selectByPrimaryKey(upmsPermission.getPid());
            upmsPermission.setSystemId(uupermission.getSystemId()); // 获取该菜单所在的系统编号
            // 层级向下加1，但最多为3级按钮
            int type = (int)uupermission.getType() + 1;
            upmsPermission.setType((byte)(type >= 3 ? 3 : type) );;

            log.info(">>>> 添加二级菜单或按钮 pid=[{}],systemId=[{}],type=[{}]",upmsPermission.getPid(),uupermission.getSystemId(),type);
        }
        else
        {
            // 选择了系统节点
            upmsPermission.setType((byte) 1);
            log.info(">>>> 添加一级菜单");
        }


        long time = System.currentTimeMillis();
        upmsPermission.setCtime(time);
        upmsPermission.setOrders(time);
        int count = upmsPermissionService.insertSelective(upmsPermission);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

    @ApiOperation(value = "删除权限")
    @RequiresPermissions("upms:permission:delete")
    @RequestMapping(value = "/delete/{ids}",method = RequestMethod.GET)
    @ResponseBody
    public Object delete(@PathVariable("ids") String ids) {
        int count = upmsPermissionService.deleteByPrimaryKeys(ids);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

    @ApiOperation(value = "修改权限")
    @RequiresPermissions("upms:permission:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable("id") int id, ModelMap modelMap) {
        UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
        upmsSystemExample.createCriteria()
                .andStatusEqualTo((byte) 1);
        List<UpmsSystem> upmsSystems = upmsSystemService.selectByExample(upmsSystemExample);
        UpmsPermission permission = upmsPermissionService.selectByPrimaryKey(id);
        modelMap.put("permission", permission);
        modelMap.put("upmsSystems", upmsSystems);
        return "/manage/permission/update";
    }

    @ApiOperation(value = "修改权限")
    @RequiresPermissions("upms:permission:update")
    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    @ResponseBody
    public Object update(@PathVariable("id") int id, UpmsPermission upmsPermission) {
        ComplexResult result = FluentValidator.checkAll()
                .on(upmsPermission.getName(), new LengthValidator(1, 20, "名称"))
                .doValidate()
                .result(ResultCollectors.toComplex());
        if (!result.isSuccess()) {
            return new UpmsResult(UpmsResultEnum.INVALID_LENGTH, result.getErrors());
        }
        upmsPermission.setPermissionId(id);
        int count = upmsPermissionService.updateByPrimaryKeySelective(upmsPermission);
        return new UpmsResult(UpmsResultEnum.SUCCESS, count);
    }

}
