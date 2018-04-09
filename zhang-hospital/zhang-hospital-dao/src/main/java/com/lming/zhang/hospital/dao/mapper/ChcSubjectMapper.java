package com.lming.zhang.hospital.dao.mapper;

import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.dao.model.ChcSubjectExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ChcSubjectMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    long countByExample(ChcSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int deleteByExample(ChcSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int deleteByPrimaryKey(String subjectId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int insert(ChcSubject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int insertSelective(ChcSubject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    List<ChcSubject> selectByExample(ChcSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    ChcSubject selectByPrimaryKey(String subjectId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int updateByExampleSelective(@Param("record") ChcSubject record, @Param("example") ChcSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int updateByExample(@Param("record") ChcSubject record, @Param("example") ChcSubjectExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int updateByPrimaryKeySelective(ChcSubject record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table chc_subject
     *
     * @mbg.generated
     */
    int updateByPrimaryKey(ChcSubject record);
}