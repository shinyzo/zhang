package com.lming.zhang.common.util;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Random;

/**
 * 图片验证码生成
 * @author Administrator
 *
 */
public class VerifyUtil {

	/**
	 * 随机字符串因子
	 */
    public static final String RAND_CHAR = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";

    public static final int DEFAULT_IMG_WIDTH = 80;							//图片宽
    public static final int DEFAULT_IMG_HEIGHT = 26;						//图片高
    public static final int DEFAULT_LINE_NUM = 40;						//干扰线数量
    public static final int DEFAULT_NUM = 4;						//随机产生字符数量
	public static final int MAX_NUM = 6;

	public static final String DEFAULT_FONT_FAMILY = "Fixedsys";
	public static final Integer DEFAULT_FONT_SIZE = 18;

	public static final Integer DEFAULT_LETTER_SPACE = (DEFAULT_IMG_WIDTH/DEFAULT_NUM)-5;

	Random random = new Random();

	public String getRandString(){
		return getRandString(DEFAULT_NUM);
	}
   
	public String getRandString(Integer randNum){

		if(randNum < 0 ) randNum = DEFAULT_NUM ;
		if(randNum > 6 ) randNum = MAX_NUM;
		StringBuffer buffer = new StringBuffer();
		for(int i=0;i < randNum;i++){
			Integer charIndex = new Random().nextInt(RAND_CHAR.length());
			char letterChar = RAND_CHAR.charAt(charIndex);
			buffer.append(letterChar);
		}
		return buffer.toString();
	}

	/**
	 * 绘制图片验证码
	 * @param response
	 * @param randString
	 */
	public  void drawRandImage(HttpServletResponse response,String randString)
	{
		BufferedImage image = new BufferedImage(
				DEFAULT_IMG_WIDTH,
				DEFAULT_IMG_HEIGHT,
				BufferedImage.TYPE_INT_BGR
		);

		Graphics g = image.getGraphics();
		g.fillRect(0, 0, DEFAULT_IMG_WIDTH, DEFAULT_IMG_HEIGHT);
		// 绘制干扰线
		drawRandLine(g);
		// 绘制随机字符
		drawString(g,randString);

		ServletOutputStream out=null;
		try
		{
			response.setContentType("image/jpeg");			//设置相应类型,告诉浏览器输出的内容为图片
			response.setHeader("Pragma", "No-cache");  	//设置响应头信息，告诉浏览器不要缓存此内容
			response.setHeader("Cache-Control", "no-cache");
			response.setDateHeader("Expire", 0);
			out=   response.getOutputStream();
			ImageIO.write(image, "JPEG", out);//将内存中的图片通过流动形式输出到客户端
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			g.dispose();
		}

	}


	/**
	 * 获取字符串字体
	 * @return
	 */
	private Font getFont()
	{
		return new Font(DEFAULT_FONT_FAMILY,Font.CENTER_BASELINE,DEFAULT_FONT_SIZE);
	}

	/**
	 * 获取随机颜色
	 * @param fc
	 * @param bc
	 * @return
	 */
	private  Color getRandColor(int fc,int bc)
	{
		if(fc > 255)         	fc = 255;
		if(bc > 255)            bc = 255;
		int r = fc + random.nextInt(bc-fc-16);
		int g = fc + random.nextInt(bc-fc-14);
		int b = fc + random.nextInt(bc-fc-18);
		return new Color(r,g,b);
	}

	/**
	 * 绘制字符串
	 * @param g
	 * @param randomString
	 */
	private void drawString(Graphics g,String randomString){
		for(int i=0;i<randomString.length();i++)
		{
			g.setFont(getFont());
			g.setColor(new Color(random.nextInt(101),random.nextInt(111),random.nextInt(121)));
			g.translate(random.nextInt(5),
					random.nextInt(5));
			g.drawString(randomString.substring(i,i+1),
					random.nextInt(5)+DEFAULT_LETTER_SPACE * i,
					random.nextInt(3)+(DEFAULT_IMG_HEIGHT/2));
		}
	}

	/**
	 * 绘制随机干扰线条
	 * @param g
	 */
	private void drawRandLine(Graphics g)
	{
		g.setFont(new Font("Times New Roman",Font.ROMAN_BASELINE,18));
		for(int i=0;i<=DEFAULT_LINE_NUM;i++) {
			int x = random.nextInt(DEFAULT_IMG_WIDTH);
			int y = random.nextInt(DEFAULT_IMG_HEIGHT);
			int xl = random.nextInt(13);
			int yl = random.nextInt(15);
			g.setColor(getRandColor(110, 133));       	 //绘制干扰线
			g.drawLine(x, y, x + xl, y + yl);
		}
	}





	public static void main(String[] args) {

	}



}
