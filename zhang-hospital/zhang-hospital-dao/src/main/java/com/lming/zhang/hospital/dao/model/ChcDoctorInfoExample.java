package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ChcDoctorInfoExample implements Serializable {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private static final long serialVersionUID = 1L;

    public ChcDoctorInfoExample() {
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

        public Criteria andDoctorIdIsNull() {
            addCriterion("doctor_id is null");
            return (Criteria) this;
        }

        public Criteria andDoctorIdIsNotNull() {
            addCriterion("doctor_id is not null");
            return (Criteria) this;
        }

        public Criteria andDoctorIdEqualTo(Integer value) {
            addCriterion("doctor_id =", value, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdNotEqualTo(Integer value) {
            addCriterion("doctor_id <>", value, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdGreaterThan(Integer value) {
            addCriterion("doctor_id >", value, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("doctor_id >=", value, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdLessThan(Integer value) {
            addCriterion("doctor_id <", value, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdLessThanOrEqualTo(Integer value) {
            addCriterion("doctor_id <=", value, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdIn(List<Integer> values) {
            addCriterion("doctor_id in", values, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdNotIn(List<Integer> values) {
            addCriterion("doctor_id not in", values, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdBetween(Integer value1, Integer value2) {
            addCriterion("doctor_id between", value1, value2, "doctorId");
            return (Criteria) this;
        }

        public Criteria andDoctorIdNotBetween(Integer value1, Integer value2) {
            addCriterion("doctor_id not between", value1, value2, "doctorId");
            return (Criteria) this;
        }

        public Criteria andIdCardNoIsNull() {
            addCriterion("id_card_no is null");
            return (Criteria) this;
        }

        public Criteria andIdCardNoIsNotNull() {
            addCriterion("id_card_no is not null");
            return (Criteria) this;
        }

        public Criteria andIdCardNoEqualTo(String value) {
            addCriterion("id_card_no =", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoNotEqualTo(String value) {
            addCriterion("id_card_no <>", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoGreaterThan(String value) {
            addCriterion("id_card_no >", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoGreaterThanOrEqualTo(String value) {
            addCriterion("id_card_no >=", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoLessThan(String value) {
            addCriterion("id_card_no <", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoLessThanOrEqualTo(String value) {
            addCriterion("id_card_no <=", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoLike(String value) {
            addCriterion("id_card_no like", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoNotLike(String value) {
            addCriterion("id_card_no not like", value, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoIn(List<String> values) {
            addCriterion("id_card_no in", values, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoNotIn(List<String> values) {
            addCriterion("id_card_no not in", values, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoBetween(String value1, String value2) {
            addCriterion("id_card_no between", value1, value2, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andIdCardNoNotBetween(String value1, String value2) {
            addCriterion("id_card_no not between", value1, value2, "idCardNo");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNull() {
            addCriterion("user_id is null");
            return (Criteria) this;
        }

        public Criteria andUserIdIsNotNull() {
            addCriterion("user_id is not null");
            return (Criteria) this;
        }

        public Criteria andUserIdEqualTo(Integer value) {
            addCriterion("user_id =", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotEqualTo(Integer value) {
            addCriterion("user_id <>", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThan(Integer value) {
            addCriterion("user_id >", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("user_id >=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThan(Integer value) {
            addCriterion("user_id <", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdLessThanOrEqualTo(Integer value) {
            addCriterion("user_id <=", value, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdIn(List<Integer> values) {
            addCriterion("user_id in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotIn(List<Integer> values) {
            addCriterion("user_id not in", values, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdBetween(Integer value1, Integer value2) {
            addCriterion("user_id between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andUserIdNotBetween(Integer value1, Integer value2) {
            addCriterion("user_id not between", value1, value2, "userId");
            return (Criteria) this;
        }

        public Criteria andDoctorNameIsNull() {
            addCriterion("doctor_name is null");
            return (Criteria) this;
        }

        public Criteria andDoctorNameIsNotNull() {
            addCriterion("doctor_name is not null");
            return (Criteria) this;
        }

        public Criteria andDoctorNameEqualTo(String value) {
            addCriterion("doctor_name =", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameNotEqualTo(String value) {
            addCriterion("doctor_name <>", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameGreaterThan(String value) {
            addCriterion("doctor_name >", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameGreaterThanOrEqualTo(String value) {
            addCriterion("doctor_name >=", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameLessThan(String value) {
            addCriterion("doctor_name <", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameLessThanOrEqualTo(String value) {
            addCriterion("doctor_name <=", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameLike(String value) {
            addCriterion("doctor_name like", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameNotLike(String value) {
            addCriterion("doctor_name not like", value, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameIn(List<String> values) {
            addCriterion("doctor_name in", values, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameNotIn(List<String> values) {
            addCriterion("doctor_name not in", values, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameBetween(String value1, String value2) {
            addCriterion("doctor_name between", value1, value2, "doctorName");
            return (Criteria) this;
        }

        public Criteria andDoctorNameNotBetween(String value1, String value2) {
            addCriterion("doctor_name not between", value1, value2, "doctorName");
            return (Criteria) this;
        }

        public Criteria andSexIsNull() {
            addCriterion("sex is null");
            return (Criteria) this;
        }

        public Criteria andSexIsNotNull() {
            addCriterion("sex is not null");
            return (Criteria) this;
        }

        public Criteria andSexEqualTo(String value) {
            addCriterion("sex =", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotEqualTo(String value) {
            addCriterion("sex <>", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexGreaterThan(String value) {
            addCriterion("sex >", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexGreaterThanOrEqualTo(String value) {
            addCriterion("sex >=", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLessThan(String value) {
            addCriterion("sex <", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLessThanOrEqualTo(String value) {
            addCriterion("sex <=", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexLike(String value) {
            addCriterion("sex like", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotLike(String value) {
            addCriterion("sex not like", value, "sex");
            return (Criteria) this;
        }

        public Criteria andSexIn(List<String> values) {
            addCriterion("sex in", values, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotIn(List<String> values) {
            addCriterion("sex not in", values, "sex");
            return (Criteria) this;
        }

        public Criteria andSexBetween(String value1, String value2) {
            addCriterion("sex between", value1, value2, "sex");
            return (Criteria) this;
        }

        public Criteria andSexNotBetween(String value1, String value2) {
            addCriterion("sex not between", value1, value2, "sex");
            return (Criteria) this;
        }

        public Criteria andBirthdayIsNull() {
            addCriterion("birthday is null");
            return (Criteria) this;
        }

        public Criteria andBirthdayIsNotNull() {
            addCriterion("birthday is not null");
            return (Criteria) this;
        }

        public Criteria andBirthdayEqualTo(String value) {
            addCriterion("birthday =", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayNotEqualTo(String value) {
            addCriterion("birthday <>", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayGreaterThan(String value) {
            addCriterion("birthday >", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayGreaterThanOrEqualTo(String value) {
            addCriterion("birthday >=", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayLessThan(String value) {
            addCriterion("birthday <", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayLessThanOrEqualTo(String value) {
            addCriterion("birthday <=", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayLike(String value) {
            addCriterion("birthday like", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayNotLike(String value) {
            addCriterion("birthday not like", value, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayIn(List<String> values) {
            addCriterion("birthday in", values, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayNotIn(List<String> values) {
            addCriterion("birthday not in", values, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayBetween(String value1, String value2) {
            addCriterion("birthday between", value1, value2, "birthday");
            return (Criteria) this;
        }

        public Criteria andBirthdayNotBetween(String value1, String value2) {
            addCriterion("birthday not between", value1, value2, "birthday");
            return (Criteria) this;
        }

        public Criteria andAvatarIsNull() {
            addCriterion("avatar is null");
            return (Criteria) this;
        }

        public Criteria andAvatarIsNotNull() {
            addCriterion("avatar is not null");
            return (Criteria) this;
        }

        public Criteria andAvatarEqualTo(String value) {
            addCriterion("avatar =", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotEqualTo(String value) {
            addCriterion("avatar <>", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarGreaterThan(String value) {
            addCriterion("avatar >", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarGreaterThanOrEqualTo(String value) {
            addCriterion("avatar >=", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarLessThan(String value) {
            addCriterion("avatar <", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarLessThanOrEqualTo(String value) {
            addCriterion("avatar <=", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarLike(String value) {
            addCriterion("avatar like", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotLike(String value) {
            addCriterion("avatar not like", value, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarIn(List<String> values) {
            addCriterion("avatar in", values, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotIn(List<String> values) {
            addCriterion("avatar not in", values, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarBetween(String value1, String value2) {
            addCriterion("avatar between", value1, value2, "avatar");
            return (Criteria) this;
        }

        public Criteria andAvatarNotBetween(String value1, String value2) {
            addCriterion("avatar not between", value1, value2, "avatar");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoIsNull() {
            addCriterion("qafca_cert_no is null");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoIsNotNull() {
            addCriterion("qafca_cert_no is not null");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoEqualTo(String value) {
            addCriterion("qafca_cert_no =", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoNotEqualTo(String value) {
            addCriterion("qafca_cert_no <>", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoGreaterThan(String value) {
            addCriterion("qafca_cert_no >", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoGreaterThanOrEqualTo(String value) {
            addCriterion("qafca_cert_no >=", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoLessThan(String value) {
            addCriterion("qafca_cert_no <", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoLessThanOrEqualTo(String value) {
            addCriterion("qafca_cert_no <=", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoLike(String value) {
            addCriterion("qafca_cert_no like", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoNotLike(String value) {
            addCriterion("qafca_cert_no not like", value, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoIn(List<String> values) {
            addCriterion("qafca_cert_no in", values, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoNotIn(List<String> values) {
            addCriterion("qafca_cert_no not in", values, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoBetween(String value1, String value2) {
            addCriterion("qafca_cert_no between", value1, value2, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertNoNotBetween(String value1, String value2) {
            addCriterion("qafca_cert_no not between", value1, value2, "qafcaCertNo");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgIsNull() {
            addCriterion("qafca_cert_img is null");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgIsNotNull() {
            addCriterion("qafca_cert_img is not null");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgEqualTo(String value) {
            addCriterion("qafca_cert_img =", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgNotEqualTo(String value) {
            addCriterion("qafca_cert_img <>", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgGreaterThan(String value) {
            addCriterion("qafca_cert_img >", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgGreaterThanOrEqualTo(String value) {
            addCriterion("qafca_cert_img >=", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgLessThan(String value) {
            addCriterion("qafca_cert_img <", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgLessThanOrEqualTo(String value) {
            addCriterion("qafca_cert_img <=", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgLike(String value) {
            addCriterion("qafca_cert_img like", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgNotLike(String value) {
            addCriterion("qafca_cert_img not like", value, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgIn(List<String> values) {
            addCriterion("qafca_cert_img in", values, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgNotIn(List<String> values) {
            addCriterion("qafca_cert_img not in", values, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgBetween(String value1, String value2) {
            addCriterion("qafca_cert_img between", value1, value2, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertImgNotBetween(String value1, String value2) {
            addCriterion("qafca_cert_img not between", value1, value2, "qafcaCertImg");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateIsNull() {
            addCriterion("qafca_cert_sign_date is null");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateIsNotNull() {
            addCriterion("qafca_cert_sign_date is not null");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateEqualTo(String value) {
            addCriterion("qafca_cert_sign_date =", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateNotEqualTo(String value) {
            addCriterion("qafca_cert_sign_date <>", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateGreaterThan(String value) {
            addCriterion("qafca_cert_sign_date >", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateGreaterThanOrEqualTo(String value) {
            addCriterion("qafca_cert_sign_date >=", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateLessThan(String value) {
            addCriterion("qafca_cert_sign_date <", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateLessThanOrEqualTo(String value) {
            addCriterion("qafca_cert_sign_date <=", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateLike(String value) {
            addCriterion("qafca_cert_sign_date like", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateNotLike(String value) {
            addCriterion("qafca_cert_sign_date not like", value, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateIn(List<String> values) {
            addCriterion("qafca_cert_sign_date in", values, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateNotIn(List<String> values) {
            addCriterion("qafca_cert_sign_date not in", values, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateBetween(String value1, String value2) {
            addCriterion("qafca_cert_sign_date between", value1, value2, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andQafcaCertSignDateNotBetween(String value1, String value2) {
            addCriterion("qafca_cert_sign_date not between", value1, value2, "qafcaCertSignDate");
            return (Criteria) this;
        }

        public Criteria andPractCertNoIsNull() {
            addCriterion("pract_cert_no is null");
            return (Criteria) this;
        }

        public Criteria andPractCertNoIsNotNull() {
            addCriterion("pract_cert_no is not null");
            return (Criteria) this;
        }

        public Criteria andPractCertNoEqualTo(String value) {
            addCriterion("pract_cert_no =", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoNotEqualTo(String value) {
            addCriterion("pract_cert_no <>", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoGreaterThan(String value) {
            addCriterion("pract_cert_no >", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoGreaterThanOrEqualTo(String value) {
            addCriterion("pract_cert_no >=", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoLessThan(String value) {
            addCriterion("pract_cert_no <", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoLessThanOrEqualTo(String value) {
            addCriterion("pract_cert_no <=", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoLike(String value) {
            addCriterion("pract_cert_no like", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoNotLike(String value) {
            addCriterion("pract_cert_no not like", value, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoIn(List<String> values) {
            addCriterion("pract_cert_no in", values, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoNotIn(List<String> values) {
            addCriterion("pract_cert_no not in", values, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoBetween(String value1, String value2) {
            addCriterion("pract_cert_no between", value1, value2, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertNoNotBetween(String value1, String value2) {
            addCriterion("pract_cert_no not between", value1, value2, "practCertNo");
            return (Criteria) this;
        }

        public Criteria andPractCertImgIsNull() {
            addCriterion("pract_cert_img is null");
            return (Criteria) this;
        }

        public Criteria andPractCertImgIsNotNull() {
            addCriterion("pract_cert_img is not null");
            return (Criteria) this;
        }

        public Criteria andPractCertImgEqualTo(String value) {
            addCriterion("pract_cert_img =", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgNotEqualTo(String value) {
            addCriterion("pract_cert_img <>", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgGreaterThan(String value) {
            addCriterion("pract_cert_img >", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgGreaterThanOrEqualTo(String value) {
            addCriterion("pract_cert_img >=", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgLessThan(String value) {
            addCriterion("pract_cert_img <", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgLessThanOrEqualTo(String value) {
            addCriterion("pract_cert_img <=", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgLike(String value) {
            addCriterion("pract_cert_img like", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgNotLike(String value) {
            addCriterion("pract_cert_img not like", value, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgIn(List<String> values) {
            addCriterion("pract_cert_img in", values, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgNotIn(List<String> values) {
            addCriterion("pract_cert_img not in", values, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgBetween(String value1, String value2) {
            addCriterion("pract_cert_img between", value1, value2, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertImgNotBetween(String value1, String value2) {
            addCriterion("pract_cert_img not between", value1, value2, "practCertImg");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateIsNull() {
            addCriterion("pract_cert_register_date is null");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateIsNotNull() {
            addCriterion("pract_cert_register_date is not null");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateEqualTo(String value) {
            addCriterion("pract_cert_register_date =", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateNotEqualTo(String value) {
            addCriterion("pract_cert_register_date <>", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateGreaterThan(String value) {
            addCriterion("pract_cert_register_date >", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateGreaterThanOrEqualTo(String value) {
            addCriterion("pract_cert_register_date >=", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateLessThan(String value) {
            addCriterion("pract_cert_register_date <", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateLessThanOrEqualTo(String value) {
            addCriterion("pract_cert_register_date <=", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateLike(String value) {
            addCriterion("pract_cert_register_date like", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateNotLike(String value) {
            addCriterion("pract_cert_register_date not like", value, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateIn(List<String> values) {
            addCriterion("pract_cert_register_date in", values, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateNotIn(List<String> values) {
            addCriterion("pract_cert_register_date not in", values, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateBetween(String value1, String value2) {
            addCriterion("pract_cert_register_date between", value1, value2, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andPractCertRegisterDateNotBetween(String value1, String value2) {
            addCriterion("pract_cert_register_date not between", value1, value2, "practCertRegisterDate");
            return (Criteria) this;
        }

        public Criteria andHospitalIdIsNull() {
            addCriterion("hospital_id is null");
            return (Criteria) this;
        }

        public Criteria andHospitalIdIsNotNull() {
            addCriterion("hospital_id is not null");
            return (Criteria) this;
        }

        public Criteria andHospitalIdEqualTo(Integer value) {
            addCriterion("hospital_id =", value, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdNotEqualTo(Integer value) {
            addCriterion("hospital_id <>", value, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdGreaterThan(Integer value) {
            addCriterion("hospital_id >", value, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("hospital_id >=", value, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdLessThan(Integer value) {
            addCriterion("hospital_id <", value, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdLessThanOrEqualTo(Integer value) {
            addCriterion("hospital_id <=", value, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdIn(List<Integer> values) {
            addCriterion("hospital_id in", values, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdNotIn(List<Integer> values) {
            addCriterion("hospital_id not in", values, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdBetween(Integer value1, Integer value2) {
            addCriterion("hospital_id between", value1, value2, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalIdNotBetween(Integer value1, Integer value2) {
            addCriterion("hospital_id not between", value1, value2, "hospitalId");
            return (Criteria) this;
        }

        public Criteria andHospitalNameIsNull() {
            addCriterion("hospital_name is null");
            return (Criteria) this;
        }

        public Criteria andHospitalNameIsNotNull() {
            addCriterion("hospital_name is not null");
            return (Criteria) this;
        }

        public Criteria andHospitalNameEqualTo(String value) {
            addCriterion("hospital_name =", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameNotEqualTo(String value) {
            addCriterion("hospital_name <>", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameGreaterThan(String value) {
            addCriterion("hospital_name >", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameGreaterThanOrEqualTo(String value) {
            addCriterion("hospital_name >=", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameLessThan(String value) {
            addCriterion("hospital_name <", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameLessThanOrEqualTo(String value) {
            addCriterion("hospital_name <=", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameLike(String value) {
            addCriterion("hospital_name like", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameNotLike(String value) {
            addCriterion("hospital_name not like", value, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameIn(List<String> values) {
            addCriterion("hospital_name in", values, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameNotIn(List<String> values) {
            addCriterion("hospital_name not in", values, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameBetween(String value1, String value2) {
            addCriterion("hospital_name between", value1, value2, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andHospitalNameNotBetween(String value1, String value2) {
            addCriterion("hospital_name not between", value1, value2, "hospitalName");
            return (Criteria) this;
        }

        public Criteria andSubjectIdIsNull() {
            addCriterion("subject_id is null");
            return (Criteria) this;
        }

        public Criteria andSubjectIdIsNotNull() {
            addCriterion("subject_id is not null");
            return (Criteria) this;
        }

        public Criteria andSubjectIdEqualTo(String value) {
            addCriterion("subject_id =", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdNotEqualTo(String value) {
            addCriterion("subject_id <>", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdGreaterThan(String value) {
            addCriterion("subject_id >", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdGreaterThanOrEqualTo(String value) {
            addCriterion("subject_id >=", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdLessThan(String value) {
            addCriterion("subject_id <", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdLessThanOrEqualTo(String value) {
            addCriterion("subject_id <=", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdLike(String value) {
            addCriterion("subject_id like", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdNotLike(String value) {
            addCriterion("subject_id not like", value, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdIn(List<String> values) {
            addCriterion("subject_id in", values, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdNotIn(List<String> values) {
            addCriterion("subject_id not in", values, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdBetween(String value1, String value2) {
            addCriterion("subject_id between", value1, value2, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectIdNotBetween(String value1, String value2) {
            addCriterion("subject_id not between", value1, value2, "subjectId");
            return (Criteria) this;
        }

        public Criteria andSubjectNameIsNull() {
            addCriterion("subject_name is null");
            return (Criteria) this;
        }

        public Criteria andSubjectNameIsNotNull() {
            addCriterion("subject_name is not null");
            return (Criteria) this;
        }

        public Criteria andSubjectNameEqualTo(String value) {
            addCriterion("subject_name =", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameNotEqualTo(String value) {
            addCriterion("subject_name <>", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameGreaterThan(String value) {
            addCriterion("subject_name >", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameGreaterThanOrEqualTo(String value) {
            addCriterion("subject_name >=", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameLessThan(String value) {
            addCriterion("subject_name <", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameLessThanOrEqualTo(String value) {
            addCriterion("subject_name <=", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameLike(String value) {
            addCriterion("subject_name like", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameNotLike(String value) {
            addCriterion("subject_name not like", value, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameIn(List<String> values) {
            addCriterion("subject_name in", values, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameNotIn(List<String> values) {
            addCriterion("subject_name not in", values, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameBetween(String value1, String value2) {
            addCriterion("subject_name between", value1, value2, "subjectName");
            return (Criteria) this;
        }

        public Criteria andSubjectNameNotBetween(String value1, String value2) {
            addCriterion("subject_name not between", value1, value2, "subjectName");
            return (Criteria) this;
        }

        public Criteria andLevelIdIsNull() {
            addCriterion("level_id is null");
            return (Criteria) this;
        }

        public Criteria andLevelIdIsNotNull() {
            addCriterion("level_id is not null");
            return (Criteria) this;
        }

        public Criteria andLevelIdEqualTo(String value) {
            addCriterion("level_id =", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdNotEqualTo(String value) {
            addCriterion("level_id <>", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdGreaterThan(String value) {
            addCriterion("level_id >", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdGreaterThanOrEqualTo(String value) {
            addCriterion("level_id >=", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdLessThan(String value) {
            addCriterion("level_id <", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdLessThanOrEqualTo(String value) {
            addCriterion("level_id <=", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdLike(String value) {
            addCriterion("level_id like", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdNotLike(String value) {
            addCriterion("level_id not like", value, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdIn(List<String> values) {
            addCriterion("level_id in", values, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdNotIn(List<String> values) {
            addCriterion("level_id not in", values, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdBetween(String value1, String value2) {
            addCriterion("level_id between", value1, value2, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelIdNotBetween(String value1, String value2) {
            addCriterion("level_id not between", value1, value2, "levelId");
            return (Criteria) this;
        }

        public Criteria andLevelNameIsNull() {
            addCriterion("level_name is null");
            return (Criteria) this;
        }

        public Criteria andLevelNameIsNotNull() {
            addCriterion("level_name is not null");
            return (Criteria) this;
        }

        public Criteria andLevelNameEqualTo(String value) {
            addCriterion("level_name =", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameNotEqualTo(String value) {
            addCriterion("level_name <>", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameGreaterThan(String value) {
            addCriterion("level_name >", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameGreaterThanOrEqualTo(String value) {
            addCriterion("level_name >=", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameLessThan(String value) {
            addCriterion("level_name <", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameLessThanOrEqualTo(String value) {
            addCriterion("level_name <=", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameLike(String value) {
            addCriterion("level_name like", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameNotLike(String value) {
            addCriterion("level_name not like", value, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameIn(List<String> values) {
            addCriterion("level_name in", values, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameNotIn(List<String> values) {
            addCriterion("level_name not in", values, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameBetween(String value1, String value2) {
            addCriterion("level_name between", value1, value2, "levelName");
            return (Criteria) this;
        }

        public Criteria andLevelNameNotBetween(String value1, String value2) {
            addCriterion("level_name not between", value1, value2, "levelName");
            return (Criteria) this;
        }

        public Criteria andDoctorNoIsNull() {
            addCriterion("doctor_no is null");
            return (Criteria) this;
        }

        public Criteria andDoctorNoIsNotNull() {
            addCriterion("doctor_no is not null");
            return (Criteria) this;
        }

        public Criteria andDoctorNoEqualTo(String value) {
            addCriterion("doctor_no =", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoNotEqualTo(String value) {
            addCriterion("doctor_no <>", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoGreaterThan(String value) {
            addCriterion("doctor_no >", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoGreaterThanOrEqualTo(String value) {
            addCriterion("doctor_no >=", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoLessThan(String value) {
            addCriterion("doctor_no <", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoLessThanOrEqualTo(String value) {
            addCriterion("doctor_no <=", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoLike(String value) {
            addCriterion("doctor_no like", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoNotLike(String value) {
            addCriterion("doctor_no not like", value, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoIn(List<String> values) {
            addCriterion("doctor_no in", values, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoNotIn(List<String> values) {
            addCriterion("doctor_no not in", values, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoBetween(String value1, String value2) {
            addCriterion("doctor_no between", value1, value2, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andDoctorNoNotBetween(String value1, String value2) {
            addCriterion("doctor_no not between", value1, value2, "doctorNo");
            return (Criteria) this;
        }

        public Criteria andCollegeNameIsNull() {
            addCriterion("college_name is null");
            return (Criteria) this;
        }

        public Criteria andCollegeNameIsNotNull() {
            addCriterion("college_name is not null");
            return (Criteria) this;
        }

        public Criteria andCollegeNameEqualTo(String value) {
            addCriterion("college_name =", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameNotEqualTo(String value) {
            addCriterion("college_name <>", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameGreaterThan(String value) {
            addCriterion("college_name >", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameGreaterThanOrEqualTo(String value) {
            addCriterion("college_name >=", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameLessThan(String value) {
            addCriterion("college_name <", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameLessThanOrEqualTo(String value) {
            addCriterion("college_name <=", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameLike(String value) {
            addCriterion("college_name like", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameNotLike(String value) {
            addCriterion("college_name not like", value, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameIn(List<String> values) {
            addCriterion("college_name in", values, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameNotIn(List<String> values) {
            addCriterion("college_name not in", values, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameBetween(String value1, String value2) {
            addCriterion("college_name between", value1, value2, "collegeName");
            return (Criteria) this;
        }

        public Criteria andCollegeNameNotBetween(String value1, String value2) {
            addCriterion("college_name not between", value1, value2, "collegeName");
            return (Criteria) this;
        }

        public Criteria andWorkAgeIsNull() {
            addCriterion("work_age is null");
            return (Criteria) this;
        }

        public Criteria andWorkAgeIsNotNull() {
            addCriterion("work_age is not null");
            return (Criteria) this;
        }

        public Criteria andWorkAgeEqualTo(String value) {
            addCriterion("work_age =", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeNotEqualTo(String value) {
            addCriterion("work_age <>", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeGreaterThan(String value) {
            addCriterion("work_age >", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeGreaterThanOrEqualTo(String value) {
            addCriterion("work_age >=", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeLessThan(String value) {
            addCriterion("work_age <", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeLessThanOrEqualTo(String value) {
            addCriterion("work_age <=", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeLike(String value) {
            addCriterion("work_age like", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeNotLike(String value) {
            addCriterion("work_age not like", value, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeIn(List<String> values) {
            addCriterion("work_age in", values, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeNotIn(List<String> values) {
            addCriterion("work_age not in", values, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeBetween(String value1, String value2) {
            addCriterion("work_age between", value1, value2, "workAge");
            return (Criteria) this;
        }

        public Criteria andWorkAgeNotBetween(String value1, String value2) {
            addCriterion("work_age not between", value1, value2, "workAge");
            return (Criteria) this;
        }

        public Criteria andFavSubjectIsNull() {
            addCriterion("fav_subject is null");
            return (Criteria) this;
        }

        public Criteria andFavSubjectIsNotNull() {
            addCriterion("fav_subject is not null");
            return (Criteria) this;
        }

        public Criteria andFavSubjectEqualTo(String value) {
            addCriterion("fav_subject =", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectNotEqualTo(String value) {
            addCriterion("fav_subject <>", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectGreaterThan(String value) {
            addCriterion("fav_subject >", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectGreaterThanOrEqualTo(String value) {
            addCriterion("fav_subject >=", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectLessThan(String value) {
            addCriterion("fav_subject <", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectLessThanOrEqualTo(String value) {
            addCriterion("fav_subject <=", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectLike(String value) {
            addCriterion("fav_subject like", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectNotLike(String value) {
            addCriterion("fav_subject not like", value, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectIn(List<String> values) {
            addCriterion("fav_subject in", values, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectNotIn(List<String> values) {
            addCriterion("fav_subject not in", values, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectBetween(String value1, String value2) {
            addCriterion("fav_subject between", value1, value2, "favSubject");
            return (Criteria) this;
        }

        public Criteria andFavSubjectNotBetween(String value1, String value2) {
            addCriterion("fav_subject not between", value1, value2, "favSubject");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneIsNull() {
            addCriterion("office_phone is null");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneIsNotNull() {
            addCriterion("office_phone is not null");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneEqualTo(String value) {
            addCriterion("office_phone =", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneNotEqualTo(String value) {
            addCriterion("office_phone <>", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneGreaterThan(String value) {
            addCriterion("office_phone >", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneGreaterThanOrEqualTo(String value) {
            addCriterion("office_phone >=", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneLessThan(String value) {
            addCriterion("office_phone <", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneLessThanOrEqualTo(String value) {
            addCriterion("office_phone <=", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneLike(String value) {
            addCriterion("office_phone like", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneNotLike(String value) {
            addCriterion("office_phone not like", value, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneIn(List<String> values) {
            addCriterion("office_phone in", values, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneNotIn(List<String> values) {
            addCriterion("office_phone not in", values, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneBetween(String value1, String value2) {
            addCriterion("office_phone between", value1, value2, "officePhone");
            return (Criteria) this;
        }

        public Criteria andOfficePhoneNotBetween(String value1, String value2) {
            addCriterion("office_phone not between", value1, value2, "officePhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneIsNull() {
            addCriterion("personal_phone is null");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneIsNotNull() {
            addCriterion("personal_phone is not null");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneEqualTo(String value) {
            addCriterion("personal_phone =", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneNotEqualTo(String value) {
            addCriterion("personal_phone <>", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneGreaterThan(String value) {
            addCriterion("personal_phone >", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneGreaterThanOrEqualTo(String value) {
            addCriterion("personal_phone >=", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneLessThan(String value) {
            addCriterion("personal_phone <", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneLessThanOrEqualTo(String value) {
            addCriterion("personal_phone <=", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneLike(String value) {
            addCriterion("personal_phone like", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneNotLike(String value) {
            addCriterion("personal_phone not like", value, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneIn(List<String> values) {
            addCriterion("personal_phone in", values, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneNotIn(List<String> values) {
            addCriterion("personal_phone not in", values, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneBetween(String value1, String value2) {
            addCriterion("personal_phone between", value1, value2, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andPersonalPhoneNotBetween(String value1, String value2) {
            addCriterion("personal_phone not between", value1, value2, "personalPhone");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(String value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(String value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(String value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(String value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(String value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(String value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLike(String value) {
            addCriterion("status like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotLike(String value) {
            addCriterion("status not like", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<String> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<String> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(String value1, String value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(String value1, String value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andInputTypeIsNull() {
            addCriterion("input_type is null");
            return (Criteria) this;
        }

        public Criteria andInputTypeIsNotNull() {
            addCriterion("input_type is not null");
            return (Criteria) this;
        }

        public Criteria andInputTypeEqualTo(String value) {
            addCriterion("input_type =", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeNotEqualTo(String value) {
            addCriterion("input_type <>", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeGreaterThan(String value) {
            addCriterion("input_type >", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeGreaterThanOrEqualTo(String value) {
            addCriterion("input_type >=", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeLessThan(String value) {
            addCriterion("input_type <", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeLessThanOrEqualTo(String value) {
            addCriterion("input_type <=", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeLike(String value) {
            addCriterion("input_type like", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeNotLike(String value) {
            addCriterion("input_type not like", value, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeIn(List<String> values) {
            addCriterion("input_type in", values, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeNotIn(List<String> values) {
            addCriterion("input_type not in", values, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeBetween(String value1, String value2) {
            addCriterion("input_type between", value1, value2, "inputType");
            return (Criteria) this;
        }

        public Criteria andInputTypeNotBetween(String value1, String value2) {
            addCriterion("input_type not between", value1, value2, "inputType");
            return (Criteria) this;
        }

        public Criteria andDescriptionIsNull() {
            addCriterion("description is null");
            return (Criteria) this;
        }

        public Criteria andDescriptionIsNotNull() {
            addCriterion("description is not null");
            return (Criteria) this;
        }

        public Criteria andDescriptionEqualTo(String value) {
            addCriterion("description =", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotEqualTo(String value) {
            addCriterion("description <>", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThan(String value) {
            addCriterion("description >", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThanOrEqualTo(String value) {
            addCriterion("description >=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThan(String value) {
            addCriterion("description <", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThanOrEqualTo(String value) {
            addCriterion("description <=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLike(String value) {
            addCriterion("description like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotLike(String value) {
            addCriterion("description not like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionIn(List<String> values) {
            addCriterion("description in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotIn(List<String> values) {
            addCriterion("description not in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionBetween(String value1, String value2) {
            addCriterion("description between", value1, value2, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotBetween(String value1, String value2) {
            addCriterion("description not between", value1, value2, "description");
            return (Criteria) this;
        }

        public Criteria andScoreIsNull() {
            addCriterion("score is null");
            return (Criteria) this;
        }

        public Criteria andScoreIsNotNull() {
            addCriterion("score is not null");
            return (Criteria) this;
        }

        public Criteria andScoreEqualTo(Float value) {
            addCriterion("score =", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotEqualTo(Float value) {
            addCriterion("score <>", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThan(Float value) {
            addCriterion("score >", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreGreaterThanOrEqualTo(Float value) {
            addCriterion("score >=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThan(Float value) {
            addCriterion("score <", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreLessThanOrEqualTo(Float value) {
            addCriterion("score <=", value, "score");
            return (Criteria) this;
        }

        public Criteria andScoreIn(List<Float> values) {
            addCriterion("score in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotIn(List<Float> values) {
            addCriterion("score not in", values, "score");
            return (Criteria) this;
        }

        public Criteria andScoreBetween(Float value1, Float value2) {
            addCriterion("score between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andScoreNotBetween(Float value1, Float value2) {
            addCriterion("score not between", value1, value2, "score");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNull() {
            addCriterion("create_time is null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIsNotNull() {
            addCriterion("create_time is not null");
            return (Criteria) this;
        }

        public Criteria andCreateTimeEqualTo(Date value) {
            addCriterion("create_time =", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotEqualTo(Date value) {
            addCriterion("create_time <>", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThan(Date value) {
            addCriterion("create_time >", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("create_time >=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThan(Date value) {
            addCriterion("create_time <", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeLessThanOrEqualTo(Date value) {
            addCriterion("create_time <=", value, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeIn(List<Date> values) {
            addCriterion("create_time in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotIn(List<Date> values) {
            addCriterion("create_time not in", values, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeBetween(Date value1, Date value2) {
            addCriterion("create_time between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andCreateTimeNotBetween(Date value1, Date value2) {
            addCriterion("create_time not between", value1, value2, "createTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNull() {
            addCriterion("update_time is null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIsNotNull() {
            addCriterion("update_time is not null");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeEqualTo(Date value) {
            addCriterion("update_time =", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotEqualTo(Date value) {
            addCriterion("update_time <>", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThan(Date value) {
            addCriterion("update_time >", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeGreaterThanOrEqualTo(Date value) {
            addCriterion("update_time >=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThan(Date value) {
            addCriterion("update_time <", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeLessThanOrEqualTo(Date value) {
            addCriterion("update_time <=", value, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeIn(List<Date> values) {
            addCriterion("update_time in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotIn(List<Date> values) {
            addCriterion("update_time not in", values, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeBetween(Date value1, Date value2) {
            addCriterion("update_time between", value1, value2, "updateTime");
            return (Criteria) this;
        }

        public Criteria andUpdateTimeNotBetween(Date value1, Date value2) {
            addCriterion("update_time not between", value1, value2, "updateTime");
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