package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ChcCommunityHsplExample implements Serializable {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private static final long serialVersionUID = 1L;

    public ChcCommunityHsplExample() {
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

        public Criteria andIdIsNull() {
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andHsplNameIsNull() {
            addCriterion("hspl_name is null");
            return (Criteria) this;
        }

        public Criteria andHsplNameIsNotNull() {
            addCriterion("hspl_name is not null");
            return (Criteria) this;
        }

        public Criteria andHsplNameEqualTo(String value) {
            addCriterion("hspl_name =", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameNotEqualTo(String value) {
            addCriterion("hspl_name <>", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameGreaterThan(String value) {
            addCriterion("hspl_name >", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameGreaterThanOrEqualTo(String value) {
            addCriterion("hspl_name >=", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameLessThan(String value) {
            addCriterion("hspl_name <", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameLessThanOrEqualTo(String value) {
            addCriterion("hspl_name <=", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameLike(String value) {
            addCriterion("hspl_name like", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameNotLike(String value) {
            addCriterion("hspl_name not like", value, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameIn(List<String> values) {
            addCriterion("hspl_name in", values, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameNotIn(List<String> values) {
            addCriterion("hspl_name not in", values, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameBetween(String value1, String value2) {
            addCriterion("hspl_name between", value1, value2, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplNameNotBetween(String value1, String value2) {
            addCriterion("hspl_name not between", value1, value2, "hsplName");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneIsNull() {
            addCriterion("hspl_phone is null");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneIsNotNull() {
            addCriterion("hspl_phone is not null");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneEqualTo(String value) {
            addCriterion("hspl_phone =", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneNotEqualTo(String value) {
            addCriterion("hspl_phone <>", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneGreaterThan(String value) {
            addCriterion("hspl_phone >", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneGreaterThanOrEqualTo(String value) {
            addCriterion("hspl_phone >=", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneLessThan(String value) {
            addCriterion("hspl_phone <", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneLessThanOrEqualTo(String value) {
            addCriterion("hspl_phone <=", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneLike(String value) {
            addCriterion("hspl_phone like", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneNotLike(String value) {
            addCriterion("hspl_phone not like", value, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneIn(List<String> values) {
            addCriterion("hspl_phone in", values, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneNotIn(List<String> values) {
            addCriterion("hspl_phone not in", values, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneBetween(String value1, String value2) {
            addCriterion("hspl_phone between", value1, value2, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andHsplPhoneNotBetween(String value1, String value2) {
            addCriterion("hspl_phone not between", value1, value2, "hsplPhone");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeIsNull() {
            addCriterion("work_begintime is null");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeIsNotNull() {
            addCriterion("work_begintime is not null");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeEqualTo(String value) {
            addCriterion("work_begintime =", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeNotEqualTo(String value) {
            addCriterion("work_begintime <>", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeGreaterThan(String value) {
            addCriterion("work_begintime >", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeGreaterThanOrEqualTo(String value) {
            addCriterion("work_begintime >=", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeLessThan(String value) {
            addCriterion("work_begintime <", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeLessThanOrEqualTo(String value) {
            addCriterion("work_begintime <=", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeLike(String value) {
            addCriterion("work_begintime like", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeNotLike(String value) {
            addCriterion("work_begintime not like", value, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeIn(List<String> values) {
            addCriterion("work_begintime in", values, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeNotIn(List<String> values) {
            addCriterion("work_begintime not in", values, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeBetween(String value1, String value2) {
            addCriterion("work_begintime between", value1, value2, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkBegintimeNotBetween(String value1, String value2) {
            addCriterion("work_begintime not between", value1, value2, "workBegintime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeIsNull() {
            addCriterion("work_endtime is null");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeIsNotNull() {
            addCriterion("work_endtime is not null");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeEqualTo(String value) {
            addCriterion("work_endtime =", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeNotEqualTo(String value) {
            addCriterion("work_endtime <>", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeGreaterThan(String value) {
            addCriterion("work_endtime >", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeGreaterThanOrEqualTo(String value) {
            addCriterion("work_endtime >=", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeLessThan(String value) {
            addCriterion("work_endtime <", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeLessThanOrEqualTo(String value) {
            addCriterion("work_endtime <=", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeLike(String value) {
            addCriterion("work_endtime like", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeNotLike(String value) {
            addCriterion("work_endtime not like", value, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeIn(List<String> values) {
            addCriterion("work_endtime in", values, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeNotIn(List<String> values) {
            addCriterion("work_endtime not in", values, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeBetween(String value1, String value2) {
            addCriterion("work_endtime between", value1, value2, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andWorkEndtimeNotBetween(String value1, String value2) {
            addCriterion("work_endtime not between", value1, value2, "workEndtime");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeIsNull() {
            addCriterion("business_code is null");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeIsNotNull() {
            addCriterion("business_code is not null");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeEqualTo(String value) {
            addCriterion("business_code =", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeNotEqualTo(String value) {
            addCriterion("business_code <>", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeGreaterThan(String value) {
            addCriterion("business_code >", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeGreaterThanOrEqualTo(String value) {
            addCriterion("business_code >=", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeLessThan(String value) {
            addCriterion("business_code <", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeLessThanOrEqualTo(String value) {
            addCriterion("business_code <=", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeLike(String value) {
            addCriterion("business_code like", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeNotLike(String value) {
            addCriterion("business_code not like", value, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeIn(List<String> values) {
            addCriterion("business_code in", values, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeNotIn(List<String> values) {
            addCriterion("business_code not in", values, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeBetween(String value1, String value2) {
            addCriterion("business_code between", value1, value2, "businessCode");
            return (Criteria) this;
        }

        public Criteria andBusinessCodeNotBetween(String value1, String value2) {
            addCriterion("business_code not between", value1, value2, "businessCode");
            return (Criteria) this;
        }

        public Criteria andArtificalNameIsNull() {
            addCriterion("artifical_name is null");
            return (Criteria) this;
        }

        public Criteria andArtificalNameIsNotNull() {
            addCriterion("artifical_name is not null");
            return (Criteria) this;
        }

        public Criteria andArtificalNameEqualTo(String value) {
            addCriterion("artifical_name =", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameNotEqualTo(String value) {
            addCriterion("artifical_name <>", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameGreaterThan(String value) {
            addCriterion("artifical_name >", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameGreaterThanOrEqualTo(String value) {
            addCriterion("artifical_name >=", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameLessThan(String value) {
            addCriterion("artifical_name <", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameLessThanOrEqualTo(String value) {
            addCriterion("artifical_name <=", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameLike(String value) {
            addCriterion("artifical_name like", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameNotLike(String value) {
            addCriterion("artifical_name not like", value, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameIn(List<String> values) {
            addCriterion("artifical_name in", values, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameNotIn(List<String> values) {
            addCriterion("artifical_name not in", values, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameBetween(String value1, String value2) {
            addCriterion("artifical_name between", value1, value2, "artificalName");
            return (Criteria) this;
        }

        public Criteria andArtificalNameNotBetween(String value1, String value2) {
            addCriterion("artifical_name not between", value1, value2, "artificalName");
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

        public Criteria andHsplAddressIsNull() {
            addCriterion("hspl_address is null");
            return (Criteria) this;
        }

        public Criteria andHsplAddressIsNotNull() {
            addCriterion("hspl_address is not null");
            return (Criteria) this;
        }

        public Criteria andHsplAddressEqualTo(String value) {
            addCriterion("hspl_address =", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressNotEqualTo(String value) {
            addCriterion("hspl_address <>", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressGreaterThan(String value) {
            addCriterion("hspl_address >", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressGreaterThanOrEqualTo(String value) {
            addCriterion("hspl_address >=", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressLessThan(String value) {
            addCriterion("hspl_address <", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressLessThanOrEqualTo(String value) {
            addCriterion("hspl_address <=", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressLike(String value) {
            addCriterion("hspl_address like", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressNotLike(String value) {
            addCriterion("hspl_address not like", value, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressIn(List<String> values) {
            addCriterion("hspl_address in", values, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressNotIn(List<String> values) {
            addCriterion("hspl_address not in", values, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressBetween(String value1, String value2) {
            addCriterion("hspl_address between", value1, value2, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andHsplAddressNotBetween(String value1, String value2) {
            addCriterion("hspl_address not between", value1, value2, "hsplAddress");
            return (Criteria) this;
        }

        public Criteria andLatIsNull() {
            addCriterion("lat is null");
            return (Criteria) this;
        }

        public Criteria andLatIsNotNull() {
            addCriterion("lat is not null");
            return (Criteria) this;
        }

        public Criteria andLatEqualTo(String value) {
            addCriterion("lat =", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotEqualTo(String value) {
            addCriterion("lat <>", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatGreaterThan(String value) {
            addCriterion("lat >", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatGreaterThanOrEqualTo(String value) {
            addCriterion("lat >=", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLessThan(String value) {
            addCriterion("lat <", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLessThanOrEqualTo(String value) {
            addCriterion("lat <=", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatLike(String value) {
            addCriterion("lat like", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotLike(String value) {
            addCriterion("lat not like", value, "lat");
            return (Criteria) this;
        }

        public Criteria andLatIn(List<String> values) {
            addCriterion("lat in", values, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotIn(List<String> values) {
            addCriterion("lat not in", values, "lat");
            return (Criteria) this;
        }

        public Criteria andLatBetween(String value1, String value2) {
            addCriterion("lat between", value1, value2, "lat");
            return (Criteria) this;
        }

        public Criteria andLatNotBetween(String value1, String value2) {
            addCriterion("lat not between", value1, value2, "lat");
            return (Criteria) this;
        }

        public Criteria andLngIsNull() {
            addCriterion("lng is null");
            return (Criteria) this;
        }

        public Criteria andLngIsNotNull() {
            addCriterion("lng is not null");
            return (Criteria) this;
        }

        public Criteria andLngEqualTo(String value) {
            addCriterion("lng =", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngNotEqualTo(String value) {
            addCriterion("lng <>", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngGreaterThan(String value) {
            addCriterion("lng >", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngGreaterThanOrEqualTo(String value) {
            addCriterion("lng >=", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngLessThan(String value) {
            addCriterion("lng <", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngLessThanOrEqualTo(String value) {
            addCriterion("lng <=", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngLike(String value) {
            addCriterion("lng like", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngNotLike(String value) {
            addCriterion("lng not like", value, "lng");
            return (Criteria) this;
        }

        public Criteria andLngIn(List<String> values) {
            addCriterion("lng in", values, "lng");
            return (Criteria) this;
        }

        public Criteria andLngNotIn(List<String> values) {
            addCriterion("lng not in", values, "lng");
            return (Criteria) this;
        }

        public Criteria andLngBetween(String value1, String value2) {
            addCriterion("lng between", value1, value2, "lng");
            return (Criteria) this;
        }

        public Criteria andLngNotBetween(String value1, String value2) {
            addCriterion("lng not between", value1, value2, "lng");
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