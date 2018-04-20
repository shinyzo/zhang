package com.lming.zhang.chc.hospital.web.util;


import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

public class PasswordHelper {
	//private RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();
	private static String algorithmName = "md5";
	private static int hashIterations = 2;

	public static String  encryptPassword(String password,String salt) {
		//String salt=randomNumberGenerator.nextBytes().toHex();
		String newPassword = new SimpleHash(algorithmName, password,  ByteSource.Util.bytes(salt), hashIterations).toHex();
		//String newPassword = new SimpleHash(algorithmName, user.getPassword()).toHex();
		return newPassword;

	}
	public static void main(String[] args) {
		PasswordHelper passwordHelper = new PasswordHelper();

		String newPassword = passwordHelper.encryptPassword("123456","");
		System.out.println(newPassword);
	}
}
