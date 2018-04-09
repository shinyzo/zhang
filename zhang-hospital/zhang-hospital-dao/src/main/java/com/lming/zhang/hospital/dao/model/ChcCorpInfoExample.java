package com.lming.zhang.hospital.dao.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ChcCorpInfoExample implements Serializable {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    private static final long serialVersionUID = 1L;

    public ChcCorpInfoExample() {
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

        public Criteria andCorpIdIsNull() {
            addCriterion("corp_id is null");
            return (Criteria) this;
        }

        public Criteria andCorpIdIsNotNull() {
            addCriterion("corp_id is not null");
            return (Criteria) this;
        }

        public Criteria andCorpIdEqualTo(String value) {
            addCriterion("corp_id =", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotEqualTo(String value) {
            addCriterion("corp_id <>", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdGreaterThan(String value) {
            addCriterion("corp_id >", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdGreaterThanOrEqualTo(String value) {
            addCriterion("corp_id >=", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdLessThan(String value) {
            addCriterion("corp_id <", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdLessThanOrEqualTo(String value) {
            addCriterion("corp_id <=", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdLike(String value) {
            addCriterion("corp_id like", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotLike(String value) {
            addCriterion("corp_id not like", value, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdIn(List<String> values) {
            addCriterion("corp_id in", values, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotIn(List<String> values) {
            addCriterion("corp_id not in", values, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdBetween(String value1, String value2) {
            addCriterion("corp_id between", value1, value2, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpIdNotBetween(String value1, String value2) {
            addCriterion("corp_id not between", value1, value2, "corpId");
            return (Criteria) this;
        }

        public Criteria andCorpNameIsNull() {
            addCriterion("corp_name is null");
            return (Criteria) this;
        }

        public Criteria andCorpNameIsNotNull() {
            addCriterion("corp_name is not null");
            return (Criteria) this;
        }

        public Criteria andCorpNameEqualTo(String value) {
            addCriterion("corp_name =", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameNotEqualTo(String value) {
            addCriterion("corp_name <>", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameGreaterThan(String value) {
            addCriterion("corp_name >", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameGreaterThanOrEqualTo(String value) {
            addCriterion("corp_name >=", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameLessThan(String value) {
            addCriterion("corp_name <", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameLessThanOrEqualTo(String value) {
            addCriterion("corp_name <=", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameLike(String value) {
            addCriterion("corp_name like", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameNotLike(String value) {
            addCriterion("corp_name not like", value, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameIn(List<String> values) {
            addCriterion("corp_name in", values, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameNotIn(List<String> values) {
            addCriterion("corp_name not in", values, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameBetween(String value1, String value2) {
            addCriterion("corp_name between", value1, value2, "corpName");
            return (Criteria) this;
        }

        public Criteria andCorpNameNotBetween(String value1, String value2) {
            addCriterion("corp_name not between", value1, value2, "corpName");
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

        public Criteria andArtificialNameIsNull() {
            addCriterion("artificial_name is null");
            return (Criteria) this;
        }

        public Criteria andArtificialNameIsNotNull() {
            addCriterion("artificial_name is not null");
            return (Criteria) this;
        }

        public Criteria andArtificialNameEqualTo(String value) {
            addCriterion("artificial_name =", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameNotEqualTo(String value) {
            addCriterion("artificial_name <>", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameGreaterThan(String value) {
            addCriterion("artificial_name >", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameGreaterThanOrEqualTo(String value) {
            addCriterion("artificial_name >=", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameLessThan(String value) {
            addCriterion("artificial_name <", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameLessThanOrEqualTo(String value) {
            addCriterion("artificial_name <=", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameLike(String value) {
            addCriterion("artificial_name like", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameNotLike(String value) {
            addCriterion("artificial_name not like", value, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameIn(List<String> values) {
            addCriterion("artificial_name in", values, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameNotIn(List<String> values) {
            addCriterion("artificial_name not in", values, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameBetween(String value1, String value2) {
            addCriterion("artificial_name between", value1, value2, "artificialName");
            return (Criteria) this;
        }

        public Criteria andArtificialNameNotBetween(String value1, String value2) {
            addCriterion("artificial_name not between", value1, value2, "artificialName");
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

        public Criteria andCorpPhoneIsNull() {
            addCriterion("corp_phone is null");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneIsNotNull() {
            addCriterion("corp_phone is not null");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneEqualTo(String value) {
            addCriterion("corp_phone =", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneNotEqualTo(String value) {
            addCriterion("corp_phone <>", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneGreaterThan(String value) {
            addCriterion("corp_phone >", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneGreaterThanOrEqualTo(String value) {
            addCriterion("corp_phone >=", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneLessThan(String value) {
            addCriterion("corp_phone <", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneLessThanOrEqualTo(String value) {
            addCriterion("corp_phone <=", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneLike(String value) {
            addCriterion("corp_phone like", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneNotLike(String value) {
            addCriterion("corp_phone not like", value, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneIn(List<String> values) {
            addCriterion("corp_phone in", values, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneNotIn(List<String> values) {
            addCriterion("corp_phone not in", values, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneBetween(String value1, String value2) {
            addCriterion("corp_phone between", value1, value2, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpPhoneNotBetween(String value1, String value2) {
            addCriterion("corp_phone not between", value1, value2, "corpPhone");
            return (Criteria) this;
        }

        public Criteria andCorpLogoIsNull() {
            addCriterion("corp_logo is null");
            return (Criteria) this;
        }

        public Criteria andCorpLogoIsNotNull() {
            addCriterion("corp_logo is not null");
            return (Criteria) this;
        }

        public Criteria andCorpLogoEqualTo(String value) {
            addCriterion("corp_logo =", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoNotEqualTo(String value) {
            addCriterion("corp_logo <>", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoGreaterThan(String value) {
            addCriterion("corp_logo >", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoGreaterThanOrEqualTo(String value) {
            addCriterion("corp_logo >=", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoLessThan(String value) {
            addCriterion("corp_logo <", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoLessThanOrEqualTo(String value) {
            addCriterion("corp_logo <=", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoLike(String value) {
            addCriterion("corp_logo like", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoNotLike(String value) {
            addCriterion("corp_logo not like", value, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoIn(List<String> values) {
            addCriterion("corp_logo in", values, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoNotIn(List<String> values) {
            addCriterion("corp_logo not in", values, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoBetween(String value1, String value2) {
            addCriterion("corp_logo between", value1, value2, "corpLogo");
            return (Criteria) this;
        }

        public Criteria andCorpLogoNotBetween(String value1, String value2) {
            addCriterion("corp_logo not between", value1, value2, "corpLogo");
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

        public Criteria andCorpAddressIsNull() {
            addCriterion("corp_address is null");
            return (Criteria) this;
        }

        public Criteria andCorpAddressIsNotNull() {
            addCriterion("corp_address is not null");
            return (Criteria) this;
        }

        public Criteria andCorpAddressEqualTo(String value) {
            addCriterion("corp_address =", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressNotEqualTo(String value) {
            addCriterion("corp_address <>", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressGreaterThan(String value) {
            addCriterion("corp_address >", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressGreaterThanOrEqualTo(String value) {
            addCriterion("corp_address >=", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressLessThan(String value) {
            addCriterion("corp_address <", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressLessThanOrEqualTo(String value) {
            addCriterion("corp_address <=", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressLike(String value) {
            addCriterion("corp_address like", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressNotLike(String value) {
            addCriterion("corp_address not like", value, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressIn(List<String> values) {
            addCriterion("corp_address in", values, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressNotIn(List<String> values) {
            addCriterion("corp_address not in", values, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressBetween(String value1, String value2) {
            addCriterion("corp_address between", value1, value2, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andCorpAddressNotBetween(String value1, String value2) {
            addCriterion("corp_address not between", value1, value2, "corpAddress");
            return (Criteria) this;
        }

        public Criteria andExpireDateIsNull() {
            addCriterion("expire_date is null");
            return (Criteria) this;
        }

        public Criteria andExpireDateIsNotNull() {
            addCriterion("expire_date is not null");
            return (Criteria) this;
        }

        public Criteria andExpireDateEqualTo(String value) {
            addCriterion("expire_date =", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateNotEqualTo(String value) {
            addCriterion("expire_date <>", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateGreaterThan(String value) {
            addCriterion("expire_date >", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateGreaterThanOrEqualTo(String value) {
            addCriterion("expire_date >=", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateLessThan(String value) {
            addCriterion("expire_date <", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateLessThanOrEqualTo(String value) {
            addCriterion("expire_date <=", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateLike(String value) {
            addCriterion("expire_date like", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateNotLike(String value) {
            addCriterion("expire_date not like", value, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateIn(List<String> values) {
            addCriterion("expire_date in", values, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateNotIn(List<String> values) {
            addCriterion("expire_date not in", values, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateBetween(String value1, String value2) {
            addCriterion("expire_date between", value1, value2, "expireDate");
            return (Criteria) this;
        }

        public Criteria andExpireDateNotBetween(String value1, String value2) {
            addCriterion("expire_date not between", value1, value2, "expireDate");
            return (Criteria) this;
        }

        public Criteria andCorpStatusIsNull() {
            addCriterion("corp_status is null");
            return (Criteria) this;
        }

        public Criteria andCorpStatusIsNotNull() {
            addCriterion("corp_status is not null");
            return (Criteria) this;
        }

        public Criteria andCorpStatusEqualTo(String value) {
            addCriterion("corp_status =", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusNotEqualTo(String value) {
            addCriterion("corp_status <>", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusGreaterThan(String value) {
            addCriterion("corp_status >", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusGreaterThanOrEqualTo(String value) {
            addCriterion("corp_status >=", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusLessThan(String value) {
            addCriterion("corp_status <", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusLessThanOrEqualTo(String value) {
            addCriterion("corp_status <=", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusLike(String value) {
            addCriterion("corp_status like", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusNotLike(String value) {
            addCriterion("corp_status not like", value, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusIn(List<String> values) {
            addCriterion("corp_status in", values, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusNotIn(List<String> values) {
            addCriterion("corp_status not in", values, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusBetween(String value1, String value2) {
            addCriterion("corp_status between", value1, value2, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andCorpStatusNotBetween(String value1, String value2) {
            addCriterion("corp_status not between", value1, value2, "corpStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusIsNull() {
            addCriterion("open_status is null");
            return (Criteria) this;
        }

        public Criteria andOpenStatusIsNotNull() {
            addCriterion("open_status is not null");
            return (Criteria) this;
        }

        public Criteria andOpenStatusEqualTo(String value) {
            addCriterion("open_status =", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusNotEqualTo(String value) {
            addCriterion("open_status <>", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusGreaterThan(String value) {
            addCriterion("open_status >", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusGreaterThanOrEqualTo(String value) {
            addCriterion("open_status >=", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusLessThan(String value) {
            addCriterion("open_status <", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusLessThanOrEqualTo(String value) {
            addCriterion("open_status <=", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusLike(String value) {
            addCriterion("open_status like", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusNotLike(String value) {
            addCriterion("open_status not like", value, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusIn(List<String> values) {
            addCriterion("open_status in", values, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusNotIn(List<String> values) {
            addCriterion("open_status not in", values, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusBetween(String value1, String value2) {
            addCriterion("open_status between", value1, value2, "openStatus");
            return (Criteria) this;
        }

        public Criteria andOpenStatusNotBetween(String value1, String value2) {
            addCriterion("open_status not between", value1, value2, "openStatus");
            return (Criteria) this;
        }

        public Criteria andDescIsNull() {
            addCriterion("desc is null");
            return (Criteria) this;
        }

        public Criteria andDescIsNotNull() {
            addCriterion("desc is not null");
            return (Criteria) this;
        }

        public Criteria andDescEqualTo(String value) {
            addCriterion("desc =", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescNotEqualTo(String value) {
            addCriterion("desc <>", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescGreaterThan(String value) {
            addCriterion("desc >", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescGreaterThanOrEqualTo(String value) {
            addCriterion("desc >=", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescLessThan(String value) {
            addCriterion("desc <", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescLessThanOrEqualTo(String value) {
            addCriterion("desc <=", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescLike(String value) {
            addCriterion("desc like", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescNotLike(String value) {
            addCriterion("desc not like", value, "desc");
            return (Criteria) this;
        }

        public Criteria andDescIn(List<String> values) {
            addCriterion("desc in", values, "desc");
            return (Criteria) this;
        }

        public Criteria andDescNotIn(List<String> values) {
            addCriterion("desc not in", values, "desc");
            return (Criteria) this;
        }

        public Criteria andDescBetween(String value1, String value2) {
            addCriterion("desc between", value1, value2, "desc");
            return (Criteria) this;
        }

        public Criteria andDescNotBetween(String value1, String value2) {
            addCriterion("desc not between", value1, value2, "desc");
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