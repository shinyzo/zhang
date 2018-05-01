package com.lming.zhang.upms.server.controller;

import com.lming.zhang.common.util.RedisUtil;
import com.lming.zhang.common.util.VerifyUtil;
import com.lming.zhang.upms.common.UpmsConstants;
import com.lming.zhang.upms.dao.model.UpmsUser;
import com.lming.zhang.upms.dao.model.UpmsUserExample;
import com.lming.zhang.upms.rpc.api.UpmsUserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * Auth : shinyzo
 * Date : 2018/4/23
 * description : xxxx
 */
@Controller
public class IndexController {


    @RequestMapping("/")
    @ApiOperation("后台首页")
    public String upmsIndex(){
        return "redirect:/manage/index";
    }


    @RequestMapping("/index")
    @ApiOperation("前台首页")
    @ResponseBody
    public String index(){
        return "zhang-upms-server is started.";
    }

    /**
     * 加载验证码
     * @param request
     * @param response
     */
    @ApiOperation("验证码")
    @RequestMapping(value = "/loadvercode",method = RequestMethod.GET)
    public void createVercode(HttpServletRequest request, HttpServletResponse response)
    {
        VerifyUtil verifyUtil = new VerifyUtil();
        String randKey = verifyUtil.getRandString();
        RedisUtil.set( UpmsConstants.RAND_KEY,
                       randKey,
                 UpmsConstants.RAND_KEY_EXPIRE_TIME);

        verifyUtil.drawRandImage(response,randKey);
        return;
    }


}
