package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;

public class ChcCorpInfo implements Serializable {
    /**
     * id自增长
     *
     * @mbg.generated
     */
    private Integer id;

    /**
     * 企业帐号
     *
     * @mbg.generated
     */
    private String corpId;

    /**
     * 企业名称
     *
     * @mbg.generated
     */
    private String corpName;

    /**
     * 营业执照号
     *
     * @mbg.generated
     */
    private String businessCode;

    /**
     * 法人姓名
     *
     * @mbg.generated
     */
    private String artificialName;

    /**
     * 法人身份证号
     *
     * @mbg.generated
     */
    private String idCardNo;

    /**
     * 企业电话
     *
     * @mbg.generated
     */
    private String corpPhone;

    /**
     * 商户Logo
     *
     * @mbg.generated
     */
    private String corpLogo;

    private String lat;

    private String lng;

    /**
     * 商户地址
     *
     * @mbg.generated
     */
    private String corpAddress;

    /**
     * 到期日
     *
     * @mbg.generated
     */
    private String expireDate;

    private String corpStatus;

    /**
     * 是否为平台内开放商户，0：否，1：是
     *
     * @mbg.generated
     */
    private String openStatus;

    /**
     * 备注信息,企业简介
     *
     * @mbg.generated
     */
    private String desc;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCorpId() {
        return corpId;
    }

    public void setCorpId(String corpId) {
        this.corpId = corpId;
    }

    public String getCorpName() {
        return corpName;
    }

    public void setCorpName(String corpName) {
        this.corpName = corpName;
    }

    public String getBusinessCode() {
        return businessCode;
    }

    public void setBusinessCode(String businessCode) {
        this.businessCode = businessCode;
    }

    public String getArtificialName() {
        return artificialName;
    }

    public void setArtificialName(String artificialName) {
        this.artificialName = artificialName;
    }

    public String getIdCardNo() {
        return idCardNo;
    }

    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }

    public String getCorpPhone() {
        return corpPhone;
    }

    public void setCorpPhone(String corpPhone) {
        this.corpPhone = corpPhone;
    }

    public String getCorpLogo() {
        return corpLogo;
    }

    public void setCorpLogo(String corpLogo) {
        this.corpLogo = corpLogo;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getCorpAddress() {
        return corpAddress;
    }

    public void setCorpAddress(String corpAddress) {
        this.corpAddress = corpAddress;
    }

    public String getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(String expireDate) {
        this.expireDate = expireDate;
    }

    public String getCorpStatus() {
        return corpStatus;
    }

    public void setCorpStatus(String corpStatus) {
        this.corpStatus = corpStatus;
    }

    public String getOpenStatus() {
        return openStatus;
    }

    public void setOpenStatus(String openStatus) {
        this.openStatus = openStatus;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", corpId=").append(corpId);
        sb.append(", corpName=").append(corpName);
        sb.append(", businessCode=").append(businessCode);
        sb.append(", artificialName=").append(artificialName);
        sb.append(", idCardNo=").append(idCardNo);
        sb.append(", corpPhone=").append(corpPhone);
        sb.append(", corpLogo=").append(corpLogo);
        sb.append(", lat=").append(lat);
        sb.append(", lng=").append(lng);
        sb.append(", corpAddress=").append(corpAddress);
        sb.append(", expireDate=").append(expireDate);
        sb.append(", corpStatus=").append(corpStatus);
        sb.append(", openStatus=").append(openStatus);
        sb.append(", desc=").append(desc);
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
        ChcCorpInfo other = (ChcCorpInfo) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getCorpId() == null ? other.getCorpId() == null : this.getCorpId().equals(other.getCorpId()))
            && (this.getCorpName() == null ? other.getCorpName() == null : this.getCorpName().equals(other.getCorpName()))
            && (this.getBusinessCode() == null ? other.getBusinessCode() == null : this.getBusinessCode().equals(other.getBusinessCode()))
            && (this.getArtificialName() == null ? other.getArtificialName() == null : this.getArtificialName().equals(other.getArtificialName()))
            && (this.getIdCardNo() == null ? other.getIdCardNo() == null : this.getIdCardNo().equals(other.getIdCardNo()))
            && (this.getCorpPhone() == null ? other.getCorpPhone() == null : this.getCorpPhone().equals(other.getCorpPhone()))
            && (this.getCorpLogo() == null ? other.getCorpLogo() == null : this.getCorpLogo().equals(other.getCorpLogo()))
            && (this.getLat() == null ? other.getLat() == null : this.getLat().equals(other.getLat()))
            && (this.getLng() == null ? other.getLng() == null : this.getLng().equals(other.getLng()))
            && (this.getCorpAddress() == null ? other.getCorpAddress() == null : this.getCorpAddress().equals(other.getCorpAddress()))
            && (this.getExpireDate() == null ? other.getExpireDate() == null : this.getExpireDate().equals(other.getExpireDate()))
            && (this.getCorpStatus() == null ? other.getCorpStatus() == null : this.getCorpStatus().equals(other.getCorpStatus()))
            && (this.getOpenStatus() == null ? other.getOpenStatus() == null : this.getOpenStatus().equals(other.getOpenStatus()))
            && (this.getDesc() == null ? other.getDesc() == null : this.getDesc().equals(other.getDesc()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getCorpId() == null) ? 0 : getCorpId().hashCode());
        result = prime * result + ((getCorpName() == null) ? 0 : getCorpName().hashCode());
        result = prime * result + ((getBusinessCode() == null) ? 0 : getBusinessCode().hashCode());
        result = prime * result + ((getArtificialName() == null) ? 0 : getArtificialName().hashCode());
        result = prime * result + ((getIdCardNo() == null) ? 0 : getIdCardNo().hashCode());
        result = prime * result + ((getCorpPhone() == null) ? 0 : getCorpPhone().hashCode());
        result = prime * result + ((getCorpLogo() == null) ? 0 : getCorpLogo().hashCode());
        result = prime * result + ((getLat() == null) ? 0 : getLat().hashCode());
        result = prime * result + ((getLng() == null) ? 0 : getLng().hashCode());
        result = prime * result + ((getCorpAddress() == null) ? 0 : getCorpAddress().hashCode());
        result = prime * result + ((getExpireDate() == null) ? 0 : getExpireDate().hashCode());
        result = prime * result + ((getCorpStatus() == null) ? 0 : getCorpStatus().hashCode());
        result = prime * result + ((getOpenStatus() == null) ? 0 : getOpenStatus().hashCode());
        result = prime * result + ((getDesc() == null) ? 0 : getDesc().hashCode());
        return result;
    }
}