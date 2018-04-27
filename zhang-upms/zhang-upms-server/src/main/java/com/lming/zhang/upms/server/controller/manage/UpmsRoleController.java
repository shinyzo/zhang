package com.lming.zhang.upms.server.controller.manage;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Auth : shinyzo
 * Date : 2018/4/27
 * description : xxxx
 */
@Controller
@RequestMapping("/manage/role")
public class UpmsRoleController {

    @RequiresPermissions("upms:role:read")
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        return "/manage/role/index";
    }
}
