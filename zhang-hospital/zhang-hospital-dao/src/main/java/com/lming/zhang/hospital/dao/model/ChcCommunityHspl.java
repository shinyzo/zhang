package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;

public class ChcCommunityHspl implements Serializable {
    private Integer id;

    private String hsplName;

    private String hsplPhone;

    private String workBegintime;

    private String workEndtime;

    private String businessCode;

    private String artificalName;

    private String idCardNo;

    private String hsplAddress;

    private String lat;

    private String lng;

    private Integer userId;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getHsplName() {
        return hsplName;
    }

    public void setHsplName(String hsplName) {
        this.hsplName = hsplName;
    }

    public String getHsplPhone() {
        return hsplPhone;
    }

    public void setHsplPhone(String hsplPhone) {
        this.hsplPhone = hsplPhone;
    }

    public String getWorkBegintime() {
        return workBegintime;
    }

    public void setWorkBegintime(String workBegintime) {
        this.workBegintime = workBegintime;
    }

    public String getWorkEndtime() {
        return workEndtime;
    }

    public void setWorkEndtime(String workEndtime) {
        this.workEndtime = workEndtime;
    }

    public String getBusinessCode() {
        return businessCode;
    }

    public void setBusinessCode(String businessCode) {
        this.businessCode = businessCode;
    }

    public String getArtificalName() {
        return artificalName;
    }

    public void setArtificalName(String artificalName) {
        this.artificalName = artificalName;
    }

    public String getIdCardNo() {
        return idCardNo;
    }

    public void setIdCardNo(String idCardNo) {
        this.idCardNo = idCardNo;
    }

    public String getHsplAddress() {
        return hsplAddress;
    }

    public void setHsplAddress(String hsplAddress) {
        this.hsplAddress = hsplAddress;
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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", hsplName=").append(hsplName);
        sb.append(", hsplPhone=").append(hsplPhone);
        sb.append(", workBegintime=").append(workBegintime);
        sb.append(", workEndtime=").append(workEndtime);
        sb.append(", businessCode=").append(businessCode);
        sb.append(", artificalName=").append(artificalName);
        sb.append(", idCardNo=").append(idCardNo);
        sb.append(", hsplAddress=").append(hsplAddress);
        sb.append(", lat=").append(lat);
        sb.append(", lng=").append(lng);
        sb.append(", userId=").append(userId);
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
        ChcCommunityHspl other = (ChcCommunityHspl) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getHsplName() == null ? other.getHsplName() == null : this.getHsplName().equals(other.getHsplName()))
            && (this.getHsplPhone() == null ? other.getHsplPhone() == null : this.getHsplPhone().equals(other.getHsplPhone()))
            && (this.getWorkBegintime() == null ? other.getWorkBegintime() == null : this.getWorkBegintime().equals(other.getWorkBegintime()))
            && (this.getWorkEndtime() == null ? other.getWorkEndtime() == null : this.getWorkEndtime().equals(other.getWorkEndtime()))
            && (this.getBusinessCode() == null ? other.getBusinessCode() == null : this.getBusinessCode().equals(other.getBusinessCode()))
            && (this.getArtificalName() == null ? other.getArtificalName() == null : this.getArtificalName().equals(other.getArtificalName()))
            && (this.getIdCardNo() == null ? other.getIdCardNo() == null : this.getIdCardNo().equals(other.getIdCardNo()))
            && (this.getHsplAddress() == null ? other.getHsplAddress() == null : this.getHsplAddress().equals(other.getHsplAddress()))
            && (this.getLat() == null ? other.getLat() == null : this.getLat().equals(other.getLat()))
            && (this.getLng() == null ? other.getLng() == null : this.getLng().equals(other.getLng()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getHsplName() == null) ? 0 : getHsplName().hashCode());
        result = prime * result + ((getHsplPhone() == null) ? 0 : getHsplPhone().hashCode());
        result = prime * result + ((getWorkBegintime() == null) ? 0 : getWorkBegintime().hashCode());
        result = prime * result + ((getWorkEndtime() == null) ? 0 : getWorkEndtime().hashCode());
        result = prime * result + ((getBusinessCode() == null) ? 0 : getBusinessCode().hashCode());
        result = prime * result + ((getArtificalName() == null) ? 0 : getArtificalName().hashCode());
        result = prime * result + ((getIdCardNo() == null) ? 0 : getIdCardNo().hashCode());
        result = prime * result + ((getHsplAddress() == null) ? 0 : getHsplAddress().hashCode());
        result = prime * result + ((getLat() == null) ? 0 : getLat().hashCode());
        result = prime * result + ((getLng() == null) ? 0 : getLng().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        return result;
    }
}