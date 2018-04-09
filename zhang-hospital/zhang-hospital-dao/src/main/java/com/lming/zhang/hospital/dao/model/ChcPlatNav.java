package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;

public class ChcPlatNav implements Serializable {
    private Integer id;

    private String platType;

    private String navId;

    private static final long serialVersionUID = 1L;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPlatType() {
        return platType;
    }

    public void setPlatType(String platType) {
        this.platType = platType;
    }

    public String getNavId() {
        return navId;
    }

    public void setNavId(String navId) {
        this.navId = navId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", platType=").append(platType);
        sb.append(", navId=").append(navId);
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
        ChcPlatNav other = (ChcPlatNav) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getPlatType() == null ? other.getPlatType() == null : this.getPlatType().equals(other.getPlatType()))
            && (this.getNavId() == null ? other.getNavId() == null : this.getNavId().equals(other.getNavId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getPlatType() == null) ? 0 : getPlatType().hashCode());
        result = prime * result + ((getNavId() == null) ? 0 : getNavId().hashCode());
        return result;
    }
}