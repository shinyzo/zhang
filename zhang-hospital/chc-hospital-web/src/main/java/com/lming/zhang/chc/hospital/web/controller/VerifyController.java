package com.lming.zhang.chc.hospital.web.controller;

import com.lming.zhang.chc.hospital.web.util.VerifyUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * 验证码
 * @author Administrator
 *
 */
@Controller
public class VerifyController {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 前台生成验证码调用接口
	 */
	@RequestMapping("/loadvercode")
	public void mkVercode(HttpServletRequest request, HttpServletResponse response)
	{
		 response.setContentType("image/jpeg");			//设置相应类型,告诉浏览器输出的内容为图片      
		 response.setHeader("Pragma", "No-cache");  	//设置响应头信息，告诉浏览器不要缓存此内容       
		 response.setHeader("Cache-Control", "no-cache");       
		 response.setDateHeader("Expire", 0);  
		 
		 VerifyUtil vu = new VerifyUtil();
		 try 
		 {           
			 vu.getRandcode(request, response);		//输出图片方法     
		 }
		 catch (Exception e) 
		 {        
			 e.printStackTrace();    
		 }
	
	}
	
	
	
	
}
