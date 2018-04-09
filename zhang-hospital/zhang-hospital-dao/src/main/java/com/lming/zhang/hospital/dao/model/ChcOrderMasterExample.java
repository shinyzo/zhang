package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ChcOrderMasterExample implements Serializable {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private static final long serialVersionUID = 1L;

    public ChcOrderMasterExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria implements Serializable {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andOrderIdIsNull() {
            addCriterion("order_id is null");
            return (Criteria) this;
        }

        public Criteria andOrderIdIsNotNull() {
            addCriterion("order_id is not null");
            return (Criteria) this;
        }

        public Criteria andOrderIdEqualTo(String value) {
            addCriterion("order_id =", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdNotEqualTo(String value) {
            addCriterion("order_id <>", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdGreaterThan(String value) {
            addCriterion("order_id >", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdGreaterThanOrEqualTo(String value) {
            addCriterion("order_id >=", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdLessThan(String value) {
            addCriterion("order_id <", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdLessThanOrEqualTo(String value) {
            addCriterion("order_id <=", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdLike(String value) {
            addCriterion("order_id like", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdNotLike(String value) {
            addCriterion("order_id not like", value, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdIn(List<String> values) {
            addCriterion("order_id in", values, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdNotIn(List<String> values) {
            addCriterion("order_id not in", values, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdBetween(String value1, String value2) {
            addCriterion("order_id between", value1, value2, "orderId");
            return (Criteria) this;
        }

        public Criteria andOrderIdNotBetween(String value1, String value2) {
            addCriterion("order_id not between", value1, value2, "orderId");
            return (Criteria) this;
        }

        public Criteria andReserveIdIsNull() {
            addCriterion("reserve_id is null");
            return (Criteria) this;
        }

        public Criteria andReserveIdIsNotNull() {
            addCriterion("reserve_id is not null");
            return (Criteria) this;
        }

        public Criteria andReserveIdEqualTo(String value) {
            addCriterion("reserve_id =", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdNotEqualTo(String value) {
            addCriterion("reserve_id <>", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdGreaterThan(String value) {
            addCriterion("reserve_id >", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdGreaterThanOrEqualTo(String value) {
            addCriterion("reserve_id >=", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdLessThan(String value) {
            addCriterion("reserve_id <", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdLessThanOrEqualTo(String value) {
            addCriterion("reserve_id <=", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdLike(String value) {
            addCriterion("reserve_id like", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdNotLike(String value) {
            addCriterion("reserve_id not like", value, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdIn(List<String> values) {
            addCriterion("reserve_id in", values, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdNotIn(List<String> values) {
            addCriterion("reserve_id not in", values, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdBetween(String value1, String value2) {
            addCriterion("reserve_id between", value1, value2, "reserveId");
            return (Criteria) this;
        }

        public Criteria andReserveIdNotBetween(String value1, String value2) {
            addCriterion("reserve_id not between", value1, value2, "reserveId");
            return (Criteria) this;
        }

        public Criteria andFromUseridIsNull() {
            addCriterion("from_userid is null");
            return (Criteria) this;
        }

        public Criteria andFromUseridIsNotNull() {
            addCriterion("from_userid is not null");
            return (Criteria) this;
        }

        public Criteria andFromUseridEqualTo(Integer value) {
            addCriterion("from_userid =", value, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridNotEqualTo(Integer value) {
            addCriterion("from_userid <>", value, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridGreaterThan(Integer value) {
            addCriterion("from_userid >", value, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridGreaterThanOrEqualTo(Integer value) {
            addCriterion("from_userid >=", value, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridLessThan(Integer value) {
            addCriterion("from_userid <", value, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridLessThanOrEqualTo(Integer value) {
            addCriterion("from_userid <=", value, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridIn(List<Integer> values) {
            addCriterion("from_userid in", values, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridNotIn(List<Integer> values) {
            addCriterion("from_userid not in", values, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridBetween(Integer value1, Integer value2) {
            addCriterion("from_userid between", value1, value2, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andFromUseridNotBetween(Integer value1, Integer value2) {
            addCriterion("from_userid not between", value1, value2, "fromUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridIsNull() {
            addCriterion("to_userid is null");
            return (Criteria) this;
        }

        public Criteria andToUseridIsNotNull() {
            addCriterion("to_userid is not null");
            return (Criteria) this;
        }

        public Criteria andToUseridEqualTo(Integer value) {
            addCriterion("to_userid =", value, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridNotEqualTo(Integer value) {
            addCriterion("to_userid <>", value, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridGreaterThan(Integer value) {
            addCriterion("to_userid >", value, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridGreaterThanOrEqualTo(Integer value) {
            addCriterion("to_userid >=", value, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridLessThan(Integer value) {
            addCriterion("to_userid <", value, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridLessThanOrEqualTo(Integer value) {
            addCriterion("to_userid <=", value, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridIn(List<Integer> values) {
            addCriterion("to_userid in", values, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridNotIn(List<Integer> values) {
            addCriterion("to_userid not in", values, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridBetween(Integer value1, Integer value2) {
            addCriterion("to_userid between", value1, value2, "toUserid");
            return (Criteria) this;
        }

        public Criteria andToUseridNotBetween(Integer value1, Integer value2) {
            addCriterion("to_userid not between", value1, value2, "toUserid");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionIsNull() {
            addCriterion("condition_description is null");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionIsNotNull() {
            addCriterion("condition_description is not null");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionEqualTo(String value) {
            addCriterion("condition_description =", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionNotEqualTo(String value) {
            addCriterion("condition_description <>", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionGreaterThan(String value) {
            addCriterion("condition_description >", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionGreaterThanOrEqualTo(String value) {
            addCriterion("condition_description >=", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionLessThan(String value) {
            addCriterion("condition_description <", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionLessThanOrEqualTo(String value) {
            addCriterion("condition_description <=", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionLike(String value) {
            addCriterion("condition_description like", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionNotLike(String value) {
            addCriterion("condition_description not like", value, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionIn(List<String> values) {
            addCriterion("condition_description in", values, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionNotIn(List<String> values) {
            addCriterion("condition_description not in", values, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionBetween(String value1, String value2) {
            addCriterion("condition_description between", value1, value2, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andConditionDescriptionNotBetween(String value1, String value2) {
            addCriterion("condition_description not between", value1, value2, "conditionDescription");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionIsNull() {
            addCriterion("diagnosis_opinion is null");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionIsNotNull() {
            addCriterion("diagnosis_opinion is not null");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionEqualTo(String value) {
            addCriterion("diagnosis_opinion =", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionNotEqualTo(String value) {
            addCriterion("diagnosis_opinion <>", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionGreaterThan(String value) {
            addCriterion("diagnosis_opinion >", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionGreaterThanOrEqualTo(String value) {
            addCriterion("diagnosis_opinion >=", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionLessThan(String value) {
            addCriterion("diagnosis_opinion <", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionLessThanOrEqualTo(String value) {
            addCriterion("diagnosis_opinion <=", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionLike(String value) {
            addCriterion("diagnosis_opinion like", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionNotLike(String value) {
            addCriterion("diagnosis_opinion not like", value, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionIn(List<String> values) {
            addCriterion("diagnosis_opinion in", values, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionNotIn(List<String> values) {
            addCriterion("diagnosis_opinion not in", values, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionBetween(String value1, String value2) {
            addCriterion("diagnosis_opinion between", value1, value2, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andDiagnosisOpinionNotBetween(String value1, String value2) {
            addCriterion("diagnosis_opinion not between", value1, value2, "diagnosisOpinion");
            return (Criteria) this;
        }

        public Criteria andAttachmentIsNull() {
            addCriterion("attachment is null");
            return (Criteria) this;
        }

        public Criteria andAttachmentIsNotNull() {
            addCriterion("attachment is not null");
            return (Criteria) this;
        }

        public Criteria andAttachmentEqualTo(String value) {
            addCriterion("attachment =", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentNotEqualTo(String value) {
            addCriterion("attachment <>", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentGreaterThan(String value) {
            addCriterion("attachment >", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentGreaterThanOrEqualTo(String value) {
            addCriterion("attachment >=", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentLessThan(String value) {
            addCriterion("attachment <", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentLessThanOrEqualTo(String value) {
            addCriterion("attachment <=", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentLike(String value) {
            addCriterion("attachment like", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentNotLike(String value) {
            addCriterion("attachment not like", value, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentIn(List<String> values) {
            addCriterion("attachment in", values, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentNotIn(List<String> values) {
            addCriterion("attachment not in", values, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentBetween(String value1, String value2) {
            addCriterion("attachment between", value1, value2, "attachment");
            return (Criteria) this;
        }

        public Criteria andAttachmentNotBetween(String value1, String value2) {
            addCriterion("attachment not between", value1, value2, "attachment");
            return (Criteria) this;
        }

        public Criteria andSignnameIsNull() {
            addCriterion("signname is null");
            return (Criteria) this;
        }

        public Criteria andSignnameIsNotNull() {
            addCriterion("signname is not null");
            return (Criteria) this;
        }

        public Criteria andSignnameEqualTo(String value) {
            addCriterion("signname =", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameNotEqualTo(String value) {
            addCriterion("signname <>", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameGreaterThan(String value) {
            addCriterion("signname >", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameGreaterThanOrEqualTo(String value) {
            addCriterion("signname >=", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameLessThan(String value) {
            addCriterion("signname <", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameLessThanOrEqualTo(String value) {
            addCriterion("signname <=", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameLike(String value) {
            addCriterion("signname like", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameNotLike(String value) {
            addCriterion("signname not like", value, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameIn(List<String> values) {
            addCriterion("signname in", values, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameNotIn(List<String> values) {
            addCriterion("signname not in", values, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameBetween(String value1, String value2) {
            addCriterion("signname between", value1, value2, "signname");
            return (Criteria) this;
        }

        public Criteria andSignnameNotBetween(String value1, String value2) {
            addCriterion("signname not between", value1, value2, "signname");
            return (Criteria) this;
        }

        public Criteria andOrderamtIsNull() {
            addCriterion("orderAmt is null");
            return (Criteria) this;
        }

        public Criteria andOrderamtIsNotNull() {
            addCriterion("orderAmt is not null");
            return (Criteria) this;
        }

        public Criteria andOrderamtEqualTo(BigDecimal value) {
            addCriterion("orderAmt =", value, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtNotEqualTo(BigDecimal value) {
            addCriterion("orderAmt <>", value, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtGreaterThan(BigDecimal value) {
            addCriterion("orderAmt >", value, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("orderAmt >=", value, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtLessThan(BigDecimal value) {
            addCriterion("orderAmt <", value, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtLessThanOrEqualTo(BigDecimal value) {
            addCriterion("orderAmt <=", value, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtIn(List<BigDecimal> values) {
            addCriterion("orderAmt in", values, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtNotIn(List<BigDecimal> values) {
            addCriterion("orderAmt not in", values, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("orderAmt between", value1, value2, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderamtNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("orderAmt not between", value1, value2, "orderamt");
            return (Criteria) this;
        }

        public Criteria andOrderStatusIsNull() {
            addCriterion("order_status is null");
            return (Criteria) this;
        }

        public Criteria andOrderStatusIsNotNull() {
            addCriterion("order_status is not null");
            return (Criteria) this;
        }

        public Criteria andOrderStatusEqualTo(String value) {
            addCriterion("order_status =", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotEqualTo(String value) {
            addCriterion("order_status <>", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusGreaterThan(String value) {
            addCriterion("order_status >", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusGreaterThanOrEqualTo(String value) {
            addCriterion("order_status >=", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusLessThan(String value) {
            addCriterion("order_status <", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusLessThanOrEqualTo(String value) {
            addCriterion("order_status <=", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusLike(String value) {
            addCriterion("order_status like", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotLike(String value) {
            addCriterion("order_status not like", value, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusIn(List<String> values) {
            addCriterion("order_status in", values, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotIn(List<String> values) {
            addCriterion("order_status not in", values, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusBetween(String value1, String value2) {
            addCriterion("order_status between", value1, value2, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andOrderStatusNotBetween(String value1, String value2) {
            addCriterion("order_status not between", value1, value2, "orderStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusIsNull() {
            addCriterion("pay_status is null");
            return (Criteria) this;
        }

        public Criteria andPayStatusIsNotNull() {
            addCriterion("pay_status is not null");
            return (Criteria) this;
        }

        public Criteria andPayStatusEqualTo(String value) {
            addCriterion("pay_status =", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusNotEqualTo(String value) {
            addCriterion("pay_status <>", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusGreaterThan(String value) {
            addCriterion("pay_status >", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusGreaterThanOrEqualTo(String value) {
            addCriterion("pay_status >=", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusLessThan(String value) {
            addCriterion("pay_status <", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusLessThanOrEqualTo(String value) {
            addCriterion("pay_status <=", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusLike(String value) {
            addCriterion("pay_status like", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusNotLike(String value) {
            addCriterion("pay_status not like", value, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusIn(List<String> values) {
            addCriterion("pay_status in", values, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusNotIn(List<String> values) {
            addCriterion("pay_status not in", values, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusBetween(String value1, String value2) {
            addCriterion("pay_status between", value1, value2, "payStatus");
            return (Criteria) this;
        }

        public Criteria andPayStatusNotBetween(String value1, String value2) {
            addCriterion("pay_status not between", value1, value2, "payStatus");
            return (Criteria) this;
        }

        public Criteria andNextIdIsNull() {
            addCriterion("next_id is null");
            return (Criteria) this;
        }

        public Criteria andNextIdIsNotNull() {
            addCriterion("next_id is not null");
            return (Criteria) this;
        }

        public Criteria andNextIdEqualTo(String value) {
            addCriterion("next_id =", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdNotEqualTo(String value) {
            addCriterion("next_id <>", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdGreaterThan(String value) {
            addCriterion("next_id >", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdGreaterThanOrEqualTo(String value) {
            addCriterion("next_id >=", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdLessThan(String value) {
            addCriterion("next_id <", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdLessThanOrEqualTo(String value) {
            addCriterion("next_id <=", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdLike(String value) {
            addCriterion("next_id like", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdNotLike(String value) {
            addCriterion("next_id not like", value, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdIn(List<String> values) {
            addCriterion("next_id in", values, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdNotIn(List<String> values) {
            addCriterion("next_id not in", values, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdBetween(String value1, String value2) {
            addCriterion("next_id between", value1, value2, "nextId");
            return (Criteria) this;
        }

        public Criteria andNextIdNotBetween(String value1, String value2) {
            addCriterion("next_id not between", value1, value2, "nextId");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria implements Serializable {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion implements Serializable {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}