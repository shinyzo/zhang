package com.lming.zhang.upms.server.controller;

import com.lming.zhang.common.util.VerifyUtil;
import com.lming.zhang.upms.dao.model.UpmsUser;
import com.lming.zhang.upms.dao.model.UpmsUserExample;
import com.lming.zhang.upms.rpc.api.UpmsUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Auth : shinyzo
 * Date : 2018/4/23
 * description : xxxx
 */
@RestController
public class IndexController {



    @RequestMapping("/index")
    public String index(){
        return "zhang-upms-server is started.";
    }

    /**
     * 加载验证码
     * @param request
     * @param response
     */
    @RequestMapping(value = "/loadvercode",method = RequestMethod.GET)
    public void createVercode(HttpServletRequest request, HttpServletResponse response)
    {
        VerifyUtil verifyUtil = new VerifyUtil();
        String randStr = verifyUtil.getRandString();
        verifyUtil.drawRandImage(response,randStr);
        return;
    }


}
