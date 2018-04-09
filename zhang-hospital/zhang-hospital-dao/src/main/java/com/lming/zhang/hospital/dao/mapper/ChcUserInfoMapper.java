package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcUserInfo;
import com.lming.zhang.hospital.dao.model.ChcUserInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcUserInfoMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    long countByExample(ChcUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int deleteByExample(ChcUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(@Param("id") Integer id, @Param("openid") String openid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int insert(ChcUserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int insertSelective(ChcUserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    List<ChcUserInfo> selectByExample(ChcUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    ChcUserInfo selectByPrimaryKey(@Param("id") Integer id, @Param("openid") String openid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") ChcUserInfo record, @Param("example") ChcUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") ChcUserInfo record, @Param("example") ChcUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(ChcUserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_user_info
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(ChcUserInfo record);
}