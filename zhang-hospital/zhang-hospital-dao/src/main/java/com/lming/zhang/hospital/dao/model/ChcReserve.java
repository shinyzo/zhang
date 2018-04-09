package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;
import java.util.Date;

public class ChcReserve implements Serializable {
    private String reserveId;

    private Integer fromUserid;

    private Integer toUserid;

    private Integer doctorId;

    private Date createTime;

    private String status;

    private String reserveTime;

    private Date reserveDate;

    private String reserveAddress;

    private String lat;

    private String lng;

    private static final long serialVersionUID = 1L;

    public String getReserveId() {
        return reserveId;
    }

    public void setReserveId(String reserveId) {
        this.reserveId = reserveId;
    }

    public Integer getFromUserid() {
        return fromUserid;
    }

    public void setFromUserid(Integer fromUserid) {
        this.fromUserid = fromUserid;
    }

    public Integer getToUserid() {
        return toUserid;
    }

    public void setToUserid(Integer toUserid) {
        this.toUserid = toUserid;
    }

    public Integer getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Integer doctorId) {
        this.doctorId = doctorId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReserveTime() {
        return reserveTime;
    }

    public void setReserveTime(String reserveTime) {
        this.reserveTime = reserveTime;
    }

    public Date getReserveDate() {
        return reserveDate;
    }

    public void setReserveDate(Date reserveDate) {
        this.reserveDate = reserveDate;
    }

    public String getReserveAddress() {
        return reserveAddress;
    }

    public void setReserveAddress(String reserveAddress) {
        this.reserveAddress = reserveAddress;
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

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", reserveId=").append(reserveId);
        sb.append(", fromUserid=").append(fromUserid);
        sb.append(", toUserid=").append(toUserid);
        sb.append(", doctorId=").append(doctorId);
        sb.append(", createTime=").append(createTime);
        sb.append(", status=").append(status);
        sb.append(", reserveTime=").append(reserveTime);
        sb.append(", reserveDate=").append(reserveDate);
        sb.append(", reserveAddress=").append(reserveAddress);
        sb.append(", lat=").append(lat);
        sb.append(", lng=").append(lng);
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
        ChcReserve other = (ChcReserve) that;
        return (this.getReserveId() == null ? other.getReserveId() == null : this.getReserveId().equals(other.getReserveId()))
            && (this.getFromUserid() == null ? other.getFromUserid() == null : this.getFromUserid().equals(other.getFromUserid()))
            && (this.getToUserid() == null ? other.getToUserid() == null : this.getToUserid().equals(other.getToUserid()))
            && (this.getDoctorId() == null ? other.getDoctorId() == null : this.getDoctorId().equals(other.getDoctorId()))
            && (this.getCreateTime() == null ? other.getCreateTime() == null : this.getCreateTime().equals(other.getCreateTime()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getReserveTime() == null ? other.getReserveTime() == null : this.getReserveTime().equals(other.getReserveTime()))
            && (this.getReserveDate() == null ? other.getReserveDate() == null : this.getReserveDate().equals(other.getReserveDate()))
            && (this.getReserveAddress() == null ? other.getReserveAddress() == null : this.getReserveAddress().equals(other.getReserveAddress()))
            && (this.getLat() == null ? other.getLat() == null : this.getLat().equals(other.getLat()))
            && (this.getLng() == null ? other.getLng() == null : this.getLng().equals(other.getLng()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getReserveId() == null) ? 0 : getReserveId().hashCode());
        result = prime * result + ((getFromUserid() == null) ? 0 : getFromUserid().hashCode());
        result = prime * result + ((getToUserid() == null) ? 0 : getToUserid().hashCode());
        result = prime * result + ((getDoctorId() == null) ? 0 : getDoctorId().hashCode());
        result = prime * result + ((getCreateTime() == null) ? 0 : getCreateTime().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getReserveTime() == null) ? 0 : getReserveTime().hashCode());
        result = prime * result + ((getReserveDate() == null) ? 0 : getReserveDate().hashCode());
        result = prime * result + ((getReserveAddress() == null) ? 0 : getReserveAddress().hashCode());
        result = prime * result + ((getLat() == null) ? 0 : getLat().hashCode());
        result = prime * result + ((getLng() == null) ? 0 : getLng().hashCode());
        return result;
    }
}