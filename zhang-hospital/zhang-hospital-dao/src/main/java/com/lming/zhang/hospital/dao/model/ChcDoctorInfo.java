package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;
import java.util.Date;

public class ChcDoctorInfo implements Serializable {
    /**
     * 系统主键
     *
     * @mbg.generated
     */
    private Integer doctorId;

    /**
     * 身份证号
     *
     * @mbg.generated
     */
    private String idCardNo;

    /**
     * 登录账号
     *
     * @mbg.generated
     */
    private Integer userId;

    /**
     * 医生姓名
     *
     * @mbg.generated
     */
    private String doctorName;

    /**
     * 性别
     *
     * @mbg.generated
     */
    private String sex;

    /**
     * 生日
     *
     * @mbg.generated
     */
    private String birthday;

    /**
     * 头像图片
     *
     * @mbg.generated
     */
    private String avatar;

    /**
     * 医师资格证书编号
     *
     * @mbg.generated
     */
    private String qafcaCertNo;

    /**
     * 医师资格证书图片
     *
     * @mbg.generated
     */
    private String qafcaCertImg;

    /**
     * 发证日期
     *
     * @mbg.generated
     */
    private String qafcaCertSignDate;

    /**
     * 执业资格证书
     *
     * @mbg.generated
     */
    private String practCertNo;

    /**
     * 执业资格证书图片
     *
     * @mbg.generated
     */
    private String practCertImg;

    /**
     * 执业资格证书注册日期
     *
     * @mbg.generated
     */
    private String practCertRegisterDate;

    /**
     * 医院
     *
     * @mbg.generated
     */
    private Integer hospitalId;

    private String hospitalName;

    /**
     * 科室
     *
     * @mbg.generated
     */
    private String subjectId;

    private String subjectName;

    /**
     * 职务级别
     *
     * @mbg.generated
     */
    private String levelId;

    private String levelName;

    /**
     * 医师编号
     *
     * @mbg.generated
     */
    private String doctorNo;

    /**
     * 大学名称
     *
     * @mbg.generated
     */
    private String collegeName;

    /**
     * 工作年限
     *
     * @mbg.generated
     */
    private String workAge;

    /**
     * 擅长领域
     *
     * @mbg.generated
     */
    private String favSubject;

    /**
     * 办公电话-固话
     *
     * @mbg.generated
     */
    private String officePhone;

    /**
     * 个人电话
     *
     * @mbg.generated
     */
    private String personalPhone;

    /**
     * 状态
     *
     * @mbg.generated
     */
    private String status;

    /**
     * 数据录入方式1：内部录入，0：个人注册
     *
     * @mbg.generated
     */
    private String inputType;

    /**
     * 医师简介
     *
     * @mbg.generated
     */
    private String description;

    private Float score;

    private Date createTime;

    private Date updateTime;

    private static final long serialVersionUID = 1L;

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public String getIdCardNo() {
        return idCardNo;
    }

    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getQafcaCertNo() {
        return qafcaCertNo;
    }

    public void setQafcaCertNo(String qafcaCertNo) {
        this.qafcaCertNo = qafcaCertNo;
    }

    public String getQafcaCertImg() {
        return qafcaCertImg;
    }

    public void setQafcaCertImg(String qafcaCertImg) {
        this.qafcaCertImg = qafcaCertImg;
    }

    public String getQafcaCertSignDate() {
        return qafcaCertSignDate;
    }

    public void setQafcaCertSignDate(String qafcaCertSignDate) {
        this.qafcaCertSignDate = qafcaCertSignDate;
    }

    public String getPractCertNo() {
        return practCertNo;
    }

    public void setPractCertNo(String practCertNo) {
        this.practCertNo = practCertNo;
    }

    public String getPractCertImg() {
        return practCertImg;
    }

    public void setPractCertImg(String practCertImg) {
        this.practCertImg = practCertImg;
    }

    public String getPractCertRegisterDate() {
        return practCertRegisterDate;
    }

    public void setPractCertRegisterDate(String practCertRegisterDate) {
        this.practCertRegisterDate = practCertRegisterDate;
    }

    public Integer getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Integer hospitalId) {
        this.hospitalId = hospitalId;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public String getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(String subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getLevelId() {
        return levelId;
    }

    public void setLevelId(String levelId) {
        this.levelId = levelId;
    }

    public String getLevelName() {
        return levelName;
    }

    public void setLevelName(String levelName) {
        this.levelName = levelName;
    }

    public String getDoctorNo() {
        return doctorNo;
    }

    public void setDoctorNo(String doctorNo) {
        this.doctorNo = doctorNo;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getWorkAge() {
        return workAge;
    }

    public void setWorkAge(String workAge) {
        this.workAge = workAge;
    }

    public String getFavSubject() {
        return favSubject;
    }

    public void setFavSubject(String favSubject) {
        this.favSubject = favSubject;
    }

    public String getOfficePhone() {
        return officePhone;
    }

    public void setOfficePhone(String officePhone) {
        this.officePhone = officePhone;
    }

    public String getPersonalPhone() {
        return personalPhone;
    }

    public void setPersonalPhone(String personalPhone) {
        this.personalPhone = personalPhone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInputType() {
        return inputType;
    }

    public void setInputType(String inputType) {
        this.inputType = inputType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", doctorId=").append(doctorId);
        sb.append(", idCardNo=").append(idCardNo);
        sb.append(", userId=").append(userId);
        sb.append(", doctorName=").append(doctorName);
        sb.append(", sex=").append(sex);
        sb.append(", birthday=").append(birthday);
        sb.append(", avatar=").append(avatar);
        sb.append(", qafcaCertNo=").append(qafcaCertNo);
        sb.append(", qafcaCertImg=").append(qafcaCertImg);
        sb.append(", qafcaCertSignDate=").append(qafcaCertSignDate);
        sb.append(", practCertNo=").append(practCertNo);
        sb.append(", practCertImg=").append(practCertImg);
        sb.append(", practCertRegisterDate=").append(practCertRegisterDate);
        sb.append(", hospitalId=").append(hospitalId);
        sb.append(", hospitalName=").append(hospitalName);
        sb.append(", subjectId=").append(subjectId);
        sb.append(", subjectName=").append(subjectName);
        sb.append(", levelId=").append(levelId);
        sb.append(", levelName=").append(levelName);
        sb.append(", doctorNo=").append(doctorNo);
        sb.append(", collegeName=").append(collegeName);
        sb.append(", workAge=").append(workAge);
        sb.append(", favSubject=").append(favSubject);
        sb.append(", officePhone=").append(officePhone);
        sb.append(", personalPhone=").append(personalPhone);
        sb.append(", status=").append(status);
        sb.append(", inputType=").append(inputType);
        sb.append(", description=").append(description);
        sb.append(", score=").append(score);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append("]");
        return sb.toString();
    }

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        ChcDoctorInfo other = (ChcDoctorInfo) that;
        return (this.getDoctorId() == null ? other.getDoctorId() == null : this.getDoctorId().equals(other.getDoctorId()))
            && (this.getIdCardNo() == null ? other.getIdCardNo() == null : this.getIdCardNo().equals(other.getIdCardNo()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getDoctorName() == null ? other.getDoctorName() == null : this.getDoctorName().equals(other.getDoctorName()))
            && (this.getSex() == null ? other.getSex() == null : this.getSex().equals(other.getSex()))
            && (this.getBirthday() == null ? other.getBirthday() == null : this.getBirthday().equals(other.getBirthday()))
            && (this.getAvatar() == null ? other.getAvatar() == null : this.getAvatar().equals(other.getAvatar()))
            && (this.getQafcaCertNo() == null ? other.getQafcaCertNo() == null : this.getQafcaCertNo().equals(other.getQafcaCertNo()))
            && (this.getQafcaCertImg() == null ? other.getQafcaCertImg() == null : this.getQafcaCertImg().equals(other.getQafcaCertImg()))
            && (this.getQafcaCertSignDate() == null ? other.getQafcaCertSignDate() == null : this.getQafcaCertSignDate().equals(other.getQafcaCertSignDate()))
            && (this.getPractCertNo() == null ? other.getPractCertNo() == null : this.getPractCertNo().equals(other.getPractCertNo()))
            && (this.getPractCertImg() == null ? other.getPractCertImg() == null : this.getPractCertImg().equals(other.getPractCertImg()))
            && (this.getPractCertRegisterDate() == null ? other.getPractCertRegisterDate() == null : this.getPractCertRegisterDate().equals(other.getPractCertRegisterDate()))
            && (this.getHospitalId() == null ? other.getHospitalId() == null : this.getHospitalId().equals(other.getHospitalId()))
            && (this.getHospitalName() == null ? other.getHospitalName() == null : this.getHospitalName().equals(other.getHospitalName()))
            && (this.getSubjectId() == null ? other.getSubjectId() == null : this.getSubjectId().equals(other.getSubjectId()))
            && (this.getSubjectName() == null ? other.getSubjectName() == null : this.getSubjectName().equals(other.getSubjectName()))
            && (this.getLevelId() == null ? other.getLevelId() == null : this.getLevelId().equals(other.getLevelId()))
            && (this.getLevelName() == null ? other.getLevelName() == null : this.getLevelName().equals(other.getLevelName()))
            && (this.getDoctorNo() == null ? other.getDoctorNo() == null : this.getDoctorNo().equals(other.getDoctorNo()))
            && (this.getCollegeName() == null ? other.getCollegeName() == null : this.getCollegeName().equals(other.getCollegeName()))
            && (this.getWorkAge() == null ? other.getWorkAge() == null : this.getWorkAge().equals(other.getWorkAge()))
            && (this.getFavSubject() == null ? other.getFavSubject() == null : this.getFavSubject().equals(other.getFavSubject()))
            && (this.getOfficePhone() == null ? other.getOfficePhone() == null : this.getOfficePhone().equals(other.getOfficePhone()))
            && (this.getPersonalPhone() == null ? other.getPersonalPhone() == null : this.getPersonalPhone().equals(other.getPersonalPhone()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getInputType() == null ? other.getInputType() == null : this.getInputType().equals(other.getInputType()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getScore() == null ? other.getScore() == null : this.getScore().equals(other.getScore()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getUpdateTime() == null ? other.getUpdateTime() == null : this.getUpdateTime().equals(other.getUpdateTime()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getDoctorId() == null) ? 0 : getDoctorId().hashCode());
        result = prime * result + ((getIdCardNo() == null) ? 0 : getIdCardNo().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + ((getDoctorName() == null) ? 0 : getDoctorName().hashCode());
        result = prime * result + ((getSex() == null) ? 0 : getSex().hashCode());
        result = prime * result + ((getBirthday() == null) ? 0 : getBirthday().hashCode());
        result = prime * result + ((getAvatar() == null) ? 0 : getAvatar().hashCode());
        result = prime * result + ((getQafcaCertNo() == null) ? 0 : getQafcaCertNo().hashCode());
        result = prime * result + ((getQafcaCertImg() == null) ? 0 : getQafcaCertImg().hashCode());
        result = prime * result + ((getQafcaCertSignDate() == null) ? 0 : getQafcaCertSignDate().hashCode());
        result = prime * result + ((getPractCertNo() == null) ? 0 : getPractCertNo().hashCode());
        result = prime * result + ((getPractCertImg() == null) ? 0 : getPractCertImg().hashCode());
        result = prime * result + ((getPractCertRegisterDate() == null) ? 0 : getPractCertRegisterDate().hashCode());
        result = prime * result + ((getHospitalId() == null) ? 0 : getHospitalId().hashCode());
        result = prime * result + ((getHospitalName() == null) ? 0 : getHospitalName().hashCode());
        result = prime * result + ((getSubjectId() == null) ? 0 : getSubjectId().hashCode());
        result = prime * result + ((getSubjectName() == null) ? 0 : getSubjectName().hashCode());
        result = prime * result + ((getLevelId() == null) ? 0 : getLevelId().hashCode());
        result = prime * result + ((getLevelName() == null) ? 0 : getLevelName().hashCode());
        result = prime * result + ((getDoctorNo() == null) ? 0 : getDoctorNo().hashCode());
        result = prime * result + ((getCollegeName() == null) ? 0 : getCollegeName().hashCode());
        result = prime * result + ((getWorkAge() == null) ? 0 : getWorkAge().hashCode());
        result = prime * result + ((getFavSubject() == null) ? 0 : getFavSubject().hashCode());
        result = prime * result + ((getOfficePhone() == null) ? 0 : getOfficePhone().hashCode());
        result = prime * result + ((getPersonalPhone() == null) ? 0 : getPersonalPhone().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getInputType() == null) ? 0 : getInputType().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getScore() == null) ? 0 : getScore().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getUpdateTime() == null) ? 0 : getUpdateTime().hashCode());
        return result;
    }
}