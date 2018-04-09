package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;
import java.math.BigDecimal;

public class ChcOrderMaster implements Serializable {
    private String orderId;

    /**
     * 预约单号
     *
     * @mbg.generated
     */
    private String reserveId;

    /**
     * 预约者id
     *
     * @mbg.generated
     */
    private Integer fromUserid;

    /**
     * 被预约者id
     *
     * @mbg.generated
     */
    private Integer toUserid;

    /**
     * 病情描述
     *
     * @mbg.generated
     */
    private String conditionDescription;

    /**
     * 诊断意见
     *
     * @mbg.generated
     */
    private String diagnosisOpinion;

    /**
     * 附件
     *
     * @mbg.generated
     */
    private String attachment;

    /**
     * 医师签名
     *
     * @mbg.generated
     */
    private String signname;

    /**
     * 订单金额
     *
     * @mbg.generated
     */
    private BigDecimal orderamt;

    /**
     * 订单状态
     *
     * @mbg.generated
     */
    private String orderStatus;

    /**
     * 支付状态
     *
     * @mbg.generated
     */
    private String payStatus;

    /**
     * 下一个流程id,0 标识已完结
     *
     * @mbg.generated
     */
    private String nextId;

    private static final long serialVersionUID = 1L;

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

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

    public String getConditionDescription() {
        return conditionDescription;
    }

    public void setConditionDescription(String conditionDescription) {
        this.conditionDescription = conditionDescription;
    }

    public String getDiagnosisOpinion() {
        return diagnosisOpinion;
    }

    public void setDiagnosisOpinion(String diagnosisOpinion) {
        this.diagnosisOpinion = diagnosisOpinion;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getSignname() {
        return signname;
    }

    public void setSignname(String signname) {
        this.signname = signname;
    }

    public BigDecimal getOrderamt() {
        return orderamt;
    }

    public void setOrderamt(BigDecimal orderamt) {
        this.orderamt = orderamt;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getPayStatus() {
        return payStatus;
    }

    public void setPayStatus(String payStatus) {
        this.payStatus = payStatus;
    }

    public String getNextId() {
        return nextId;
    }

    public void setNextId(String nextId) {
        this.nextId = nextId;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", orderId=").append(orderId);
        sb.append(", reserveId=").append(reserveId);
        sb.append(", fromUserid=").append(fromUserid);
        sb.append(", toUserid=").append(toUserid);
        sb.append(", conditionDescription=").append(conditionDescription);
        sb.append(", diagnosisOpinion=").append(diagnosisOpinion);
        sb.append(", attachment=").append(attachment);
        sb.append(", signname=").append(signname);
        sb.append(", orderamt=").append(orderamt);
        sb.append(", orderStatus=").append(orderStatus);
        sb.append(", payStatus=").append(payStatus);
        sb.append(", nextId=").append(nextId);
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
        ChcOrderMaster other = (ChcOrderMaster) that;
        return (this.getOrderId() == null ? other.getOrderId() == null : this.getOrderId().equals(other.getOrderId()))
            && (this.getReserveId() == null ? other.getReserveId() == null : this.getReserveId().equals(other.getReserveId()))
            && (this.getFromUserid() == null ? other.getFromUserid() == null : this.getFromUserid().equals(other.getFromUserid()))
            && (this.getToUserid() == null ? other.getToUserid() == null : this.getToUserid().equals(other.getToUserid()))
            && (this.getConditionDescription() == null ? other.getConditionDescription() == null : this.getConditionDescription().equals(other.getConditionDescription()))
            && (this.getDiagnosisOpinion() == null ? other.getDiagnosisOpinion() == null : this.getDiagnosisOpinion().equals(other.getDiagnosisOpinion()))
            && (this.getAttachment() == null ? other.getAttachment() == null : this.getAttachment().equals(other.getAttachment()))
            && (this.getSignname() == null ? other.getSignname() == null : this.getSignname().equals(other.getSignname()))
            && (this.getOrderamt() == null ? other.getOrderamt() == null : this.getOrderamt().equals(other.getOrderamt()))
            && (this.getOrderStatus() == null ? other.getOrderStatus() == null : this.getOrderStatus().equals(other.getOrderStatus()))
            && (this.getPayStatus() == null ? other.getPayStatus() == null : this.getPayStatus().equals(other.getPayStatus()))
            && (this.getNextId() == null ? other.getNextId() == null : this.getNextId().equals(other.getNextId()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getOrderId() == null) ? 0 : getOrderId().hashCode());
        result = prime * result + ((getReserveId() == null) ? 0 : getReserveId().hashCode());
        result = prime * result + ((getFromUserid() == null) ? 0 : getFromUserid().hashCode());
        result = prime * result + ((getToUserid() == null) ? 0 : getToUserid().hashCode());
        result = prime * result + ((getConditionDescription() == null) ? 0 : getConditionDescription().hashCode());
        result = prime * result + ((getDiagnosisOpinion() == null) ? 0 : getDiagnosisOpinion().hashCode());
        result = prime * result + ((getAttachment() == null) ? 0 : getAttachment().hashCode());
        result = prime * result + ((getSignname() == null) ? 0 : getSignname().hashCode());
        result = prime * result + ((getOrderamt() == null) ? 0 : getOrderamt().hashCode());
        result = prime * result + ((getOrderStatus() == null) ? 0 : getOrderStatus().hashCode());
        result = prime * result + ((getPayStatus() == null) ? 0 : getPayStatus().hashCode());
        result = prime * result + ((getNextId() == null) ? 0 : getNextId().hashCode());
        return result;
    }
}