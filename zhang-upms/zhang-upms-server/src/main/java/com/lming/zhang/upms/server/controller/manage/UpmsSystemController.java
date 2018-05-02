package com.lming.zhang.upms.server.controller.manage;

import com.baidu.unbiz.fluentvalidator.ComplexResult;
import com.baidu.unbiz.fluentvalidator.FluentValidator;
import com.baidu.unbiz.fluentvalidator.ResultCollectors;
import com.lming.zhang.common.validator.LengthValidator;
import com.lming.zhang.upms.common.UpmsPageVO;
import com.lming.zhang.upms.common.UpmsResult;
import com.lming.zhang.upms.common.UpmsResultEnum;
import com.lming.zhang.upms.dao.model.UpmsPermission;
import com.lming.zhang.upms.dao.model.UpmsPermissionExample;
import com.lming.zhang.upms.dao.model.UpmsSystem;
import com.lming.zhang.upms.dao.model.UpmsSystemExample;
import com.lming.zhang.upms.rpc.api.UpmsPermissionService;
import com.lming.zhang.upms.rpc.api.UpmsSystemService;
import com.lming.zhang.upms.server.form.UpmsSystemQuery;
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
 * 系统controller
 * Created by shuzheng on 2016/12/18.
 */
@Controller
@RequestMapping("/manage/system")
public class UpmsSystemController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UpmsSystemController.class);

	@Autowired
	private UpmsSystemService upmsSystemService;

	@Autowired
	private UpmsPermissionService upmsPermissionService;

	@ApiOperation(value = "系统首页")
	@RequiresPermissions("upms:system:read")
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(@RequestParam("permissionId") Integer permissionId,
						ModelMap modelMap) {
		// 加载菜单下的所有按钮
		UpmsPermissionExample example = new UpmsPermissionExample();
		example.or().andPidEqualTo(permissionId).andStatusEqualTo((byte) 1);

		List<UpmsPermission> buttonPermissions = upmsPermissionService.selectByExample(example);
		modelMap.put("buttonPermissions",buttonPermissions);

		return "/manage/system/index";
	}

	@ApiOperation(value = "系统列表")
	@RequiresPermissions("upms:system:read")
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	@ResponseBody
	public Object list(UpmsSystemQuery upmsSystemQuery, UpmsPageVO pageVO) {
		UpmsSystemExample upmsSystemExample = new UpmsSystemExample();
		if (!StringUtils.isBlank(pageVO.getSort()) && !StringUtils.isBlank(pageVO.getOrder())) {
			upmsSystemExample.setOrderByClause(pageVO.getSort() + " " + pageVO.getOrder());
		}
		if (StringUtils.isNotBlank(upmsSystemQuery.getTitle())) {
			upmsSystemExample.or()
					.andTitleLike("%" + upmsSystemQuery.getTitle() + "%");
		}

		List<UpmsSystem> upmsSystemList = upmsSystemService.selectByExampleForStartPage(upmsSystemExample, pageVO.getPage(), pageVO.getRows());
		long total = upmsSystemService.countByExample(upmsSystemExample);
		Map<String, Object> result = new HashMap<>();
		result.put("rows", upmsSystemList);
		result.put("total", total);
		return result;
	}

	@ApiOperation(value = "新增系统")
	@RequiresPermissions("upms:system:create")
	@RequestMapping(value = "/create", method = RequestMethod.GET)
	public String create() {
		return "/manage/system/create";
	}

	@ApiOperation(value = "新增系统")
	@RequiresPermissions("upms:system:create")
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	@ResponseBody
	public Object create(UpmsSystem upmsSystem) {
		ComplexResult result = FluentValidator.checkAll()
				.on(upmsSystem.getTitle(), new LengthValidator(1, 20, "标题"))
				.on(upmsSystem.getName(), new LengthValidator(1, 20, "名称"))
				.doValidate()
				.result(ResultCollectors.toComplex());
		if (!result.isSuccess()) {
			return new UpmsResult(UpmsResultEnum.INVALID_LENGTH.getCode(),
                    String.format(UpmsResultEnum.INVALID_LENGTH.getMsg(),result.getErrors().get(0).getField()));
		}
		long time = System.currentTimeMillis();
		upmsSystem.setCtime(time);
		upmsSystem.setOrders(time);
		int count = upmsSystemService.insertSelective(upmsSystem);
		return new UpmsResult(UpmsResultEnum.SUCCESS, count);
	}

	@ApiOperation(value = "删除系统")
	@RequiresPermissions("upms:system:delete")
	@RequestMapping(value = "/delete/{ids}",method = RequestMethod.GET)
	@ResponseBody
	public Object delete(@PathVariable("ids") String ids) {
		int count = upmsSystemService.deleteByPrimaryKeys(ids);
		return new UpmsResult(UpmsResultEnum.SUCCESS, count);
	}

	@ApiOperation(value = "修改系统")
	@RequiresPermissions("upms:system:update")
	@RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
	public String update(@PathVariable("id") int id, ModelMap modelMap) {
		UpmsSystem system = upmsSystemService.selectByPrimaryKey(id);
		modelMap.put("system", system);
		return "/manage/system/update.jsp";
	}

	@ApiOperation(value = "修改系统")
	@RequiresPermissions("upms:system:update")
	@RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
	@ResponseBody
	public Object update(@PathVariable("id") int id, UpmsSystem upmsSystem) {
		ComplexResult result = FluentValidator.checkAll()
				.on(upmsSystem.getTitle(), new LengthValidator(1, 20, "标题"))
				.on(upmsSystem.getName(), new LengthValidator(1, 20, "名称"))
				.doValidate()
				.result(ResultCollectors.toComplex());
		if (!result.isSuccess()) {
			return new UpmsResult(UpmsResultEnum.INVALID_LENGTH, result.getErrors());
		}
		upmsSystem.setSystemId(id);
		int count = upmsSystemService.updateByPrimaryKeySelective(upmsSystem);
		return new UpmsResult(UpmsResultEnum.SUCCESS, count);
	}

}