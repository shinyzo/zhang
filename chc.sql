/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1-root
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : chc

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-04-23 18:01:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `chc_community_hspl`
-- ----------------------------
DROP TABLE IF EXISTS `chc_community_hspl`;
CREATE TABLE `chc_community_hspl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hspl_name` varchar(100) DEFAULT NULL,
  `hspl_phone` varchar(20) DEFAULT NULL,
  `work_begintime` varchar(20) DEFAULT NULL,
  `work_endtime` varchar(20) DEFAULT NULL,
  `business_code` varchar(40) DEFAULT NULL,
  `artifical_name` varchar(20) DEFAULT NULL,
  `id_card_no` varchar(20) DEFAULT NULL,
  `hspl_address` varchar(100) DEFAULT NULL,
  `lat` varchar(20) DEFAULT NULL,
  `lng` varchar(20) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_community_hspl
-- ----------------------------
INSERT INTO `chc_community_hspl` VALUES ('1', '美兰社区医院', '0898-0987655', '7:00', '19:00', '121212122222', '111', '111111', '1111', '11', '11', '1');
INSERT INTO `chc_community_hspl` VALUES ('2', '龙华社区医院', '0898-3456789', '8:00', '22:00', '43546565', '34343', '433423', '432432', '234', '433', '2');

-- ----------------------------
-- Table structure for `chc_corp_info`
-- ----------------------------
DROP TABLE IF EXISTS `chc_corp_info`;
CREATE TABLE `chc_corp_info` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id自增长',
  `corp_id` varchar(20) DEFAULT NULL COMMENT '企业帐号',
  `corp_name` varchar(100) DEFAULT NULL COMMENT '企业名称',
  `business_code` varchar(40) DEFAULT NULL COMMENT '营业执照号',
  `artificial_name` varchar(100) DEFAULT NULL COMMENT '法人姓名',
  `id_card_no` varchar(40) NOT NULL COMMENT '法人身份证号',
  `corp_phone` varchar(20) DEFAULT NULL COMMENT '企业电话',
  `corp_logo` varchar(40) DEFAULT NULL COMMENT '商户Logo',
  `lat` varchar(12) DEFAULT NULL,
  `lng` varchar(12) DEFAULT NULL,
  `corp_address` varchar(100) DEFAULT NULL COMMENT '商户地址',
  `expire_date` varchar(10) DEFAULT NULL COMMENT '到期日',
  `corp_status` varchar(4) DEFAULT '0',
  `open_status` varchar(4) DEFAULT '0' COMMENT '是否为平台内开放商户，0：否，1：是',
  `desc` varchar(1000) DEFAULT NULL COMMENT '备注信息,企业简介',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_corp_info
-- ----------------------------
INSERT INTO `chc_corp_info` VALUES ('69', '0000', '企萌科技-后台管理系统', null, null, '360622198809201536', '15501700742', null, null, null, null, null, '0001', '0', null);
INSERT INTO `chc_corp_info` VALUES ('72', 'H000001', '海南裕兴昌药业股份有限公司', '11111111', '邓总', '360622198809201534', '15644337766', null, null, null, '', null, '0005', '0', null);
INSERT INTO `chc_corp_info` VALUES ('74', 'BGT', '海南百广堂药业有限公司', '11111111111', '小白', '345645654454323', '15501700733', null, null, null, '', null, '0000', '0', null);
INSERT INTO `chc_corp_info` VALUES ('75', 'SQYY', '社区医院（）', '111111111', '张三', '353323434332232', '15678988765', null, null, null, '111111', null, '0005', '0', null);

-- ----------------------------
-- Table structure for `chc_doctor_info`
-- ----------------------------
DROP TABLE IF EXISTS `chc_doctor_info`;
CREATE TABLE `chc_doctor_info` (
  `doctor_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '系统主键',
  `user_id` int(11) NOT NULL COMMENT '登录账号',
  `doctor_name` varchar(20) NOT NULL COMMENT '医生姓名',
  `sex` varchar(2) NOT NULL COMMENT '性别',
  `birthday` varchar(20) DEFAULT NULL COMMENT '生日',
  `id_card_no` varchar(20) NOT NULL DEFAULT '' COMMENT '身份证号',
  `avatar` varchar(100) DEFAULT NULL COMMENT '头像图片',
  `qafca_cert_no` varchar(40) NOT NULL COMMENT '医师资格证书编号',
  `qafca_cert_img` varchar(100) DEFAULT NULL COMMENT '医师资格证书图片',
  `qafca_cert_sign_date` varchar(14) DEFAULT NULL COMMENT '发证日期',
  `pract_cert_no` varchar(20) NOT NULL COMMENT '执业资格证书',
  `pract_cert_img` varchar(100) DEFAULT NULL COMMENT '执业资格证书图片',
  `pract_cert_register_date` varchar(20) DEFAULT NULL COMMENT '执业资格证书注册日期',
  `hospital_id` int(11) DEFAULT NULL COMMENT '医院',
  `hospital_name` varchar(100) DEFAULT NULL,
  `subject_id` varchar(20) DEFAULT NULL COMMENT '科室',
  `subject_name` varchar(40) DEFAULT NULL,
  `level_id` varchar(40) DEFAULT NULL COMMENT '职务级别',
  `level_name` varchar(40) DEFAULT NULL,
  `doctor_no` varchar(40) DEFAULT NULL COMMENT '医师编号',
  `college_name` varchar(100) DEFAULT NULL COMMENT '大学名称',
  `work_age` varchar(3) DEFAULT NULL COMMENT '工作年限',
  `fav_subject` varchar(100) DEFAULT NULL COMMENT '擅长领域',
  `office_phone` varchar(20) DEFAULT NULL COMMENT '办公电话-固话',
  `personal_phone` varchar(20) DEFAULT NULL COMMENT '个人电话',
  `status` varchar(4) DEFAULT NULL COMMENT '状态',
  `input_type` varchar(1) DEFAULT '1' COMMENT '数据录入方式1：内部录入，0：个人注册',
  `description` varchar(1000) DEFAULT NULL COMMENT '医师简介',
  `score` float(11,2) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`doctor_id`,`id_card_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_doctor_info
-- ----------------------------
INSERT INTO `chc_doctor_info` VALUES ('1', '1', '张医师', '男', '1988-09-20', '360622198809201536', null, 'A3423432432423', null, '2017-09-20', '1232132132', null, '2017-09-20', '1', null, '2', null, '1', null, null, null, '2', null, null, null, '0', '1', null, '0.00', null, null);
INSERT INTO `chc_doctor_info` VALUES ('2', '2', '李医师', '女 ', '1985-07-11', '360622198809201532', null, '22312321321', null, '2017-09-20', '1232132132', null, '2017-09-20', '1', null, '2', null, '3', null, null, null, '4', '眼科', '2321321321', '1111111', '0', '1', '32132132132132132', '0.00', null, null);

-- ----------------------------
-- Table structure for `chc_doctor_level`
-- ----------------------------
DROP TABLE IF EXISTS `chc_doctor_level`;
CREATE TABLE `chc_doctor_level` (
  `level_id` int(10) NOT NULL AUTO_INCREMENT,
  `level_name` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_doctor_level
-- ----------------------------
INSERT INTO `chc_doctor_level` VALUES ('1', '专家');
INSERT INTO `chc_doctor_level` VALUES ('2', '主任医师');
INSERT INTO `chc_doctor_level` VALUES ('3', '副主任医师');
INSERT INTO `chc_doctor_level` VALUES ('4', '医师');
INSERT INTO `chc_doctor_level` VALUES ('5', '助理');
INSERT INTO `chc_doctor_level` VALUES ('6', '实习医师');

-- ----------------------------
-- Table structure for `chc_hospital`
-- ----------------------------
DROP TABLE IF EXISTS `chc_hospital`;
CREATE TABLE `chc_hospital` (
  `hospital_id` int(11) NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(128) DEFAULT NULL,
  `hospital_type` varchar(20) DEFAULT NULL,
  `hospital_level` varchar(4) DEFAULT NULL,
  `telnum` varchar(16) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `lat` varchar(12) DEFAULT NULL,
  `lng` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`hospital_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_hospital
-- ----------------------------
INSERT INTO `chc_hospital` VALUES ('1', '海南省人民医院', '三级甲等', '1', '0898-222222', '海南省人民医院', '222', '2222');
INSERT INTO `chc_hospital` VALUES ('2', '海南省中医院', '三级甲等', '2', '0898-333333', '海南省中医院', '33333', '33333');

-- ----------------------------
-- Table structure for `chc_mobile_nav`
-- ----------------------------
DROP TABLE IF EXISTS `chc_mobile_nav`;
CREATE TABLE `chc_mobile_nav` (
  `nav_id` varchar(32) NOT NULL,
  `nav_name` varchar(16) DEFAULT NULL,
  `link_url` varchar(128) DEFAULT NULL,
  `icon` varchar(128) DEFAULT NULL,
  `sort` int(3) DEFAULT NULL,
  PRIMARY KEY (`nav_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_mobile_nav
-- ----------------------------
INSERT INTO `chc_mobile_nav` VALUES ('N000001', '首页', '/index', 'icon-home', '1');
INSERT INTO `chc_mobile_nav` VALUES ('N000002', '预约', '/doctor', 'icon-bubbles4', '2');
INSERT INTO `chc_mobile_nav` VALUES ('N000003', '诊单', '/order', 'icon-stack', '3');
INSERT INTO `chc_mobile_nav` VALUES ('N000004', '个人中心', '/owner', 'icon-compass2', '4');

-- ----------------------------
-- Table structure for `chc_order_detail`
-- ----------------------------
DROP TABLE IF EXISTS `chc_order_detail`;
CREATE TABLE `chc_order_detail` (
  `detail_id` varchar(16) NOT NULL COMMENT '订单明细id',
  `order_id` varchar(16) NOT NULL COMMENT '主订单id',
  `product_id` varchar(12) DEFAULT NULL COMMENT '产品id',
  `product_name` varchar(100) DEFAULT NULL COMMENT '产品名称',
  `category_id` varchar(12) DEFAULT NULL COMMENT '产品类别id',
  `count` int(9) DEFAULT NULL COMMENT '数量',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `total_price` decimal(10,2) DEFAULT NULL COMMENT '总金额',
  PRIMARY KEY (`detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_order_detail
-- ----------------------------

-- ----------------------------
-- Table structure for `chc_order_master`
-- ----------------------------
DROP TABLE IF EXISTS `chc_order_master`;
CREATE TABLE `chc_order_master` (
  `order_id` varchar(16) NOT NULL DEFAULT '订单id',
  `reserve_id` varchar(12) DEFAULT NULL COMMENT '预约单号',
  `from_userid` int(11) DEFAULT NULL COMMENT '预约者id',
  `to_userid` int(11) DEFAULT NULL COMMENT '被预约者id',
  `condition_description` varchar(400) DEFAULT NULL COMMENT '病情描述',
  `diagnosis_opinion` varchar(400) DEFAULT NULL COMMENT '诊断意见',
  `attachment` varchar(100) DEFAULT NULL COMMENT '附件',
  `signname` varchar(20) DEFAULT NULL COMMENT '医师签名',
  `orderAmt` decimal(10,2) DEFAULT NULL COMMENT '订单金额',
  `order_status` varchar(4) DEFAULT NULL COMMENT '订单状态',
  `pay_status` varchar(4) DEFAULT NULL COMMENT '支付状态',
  `next_id` varchar(16) DEFAULT NULL COMMENT '下一个流程id,0 标识已完结',
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_order_master
-- ----------------------------

-- ----------------------------
-- Table structure for `chc_plat_nav`
-- ----------------------------
DROP TABLE IF EXISTS `chc_plat_nav`;
CREATE TABLE `chc_plat_nav` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plat_type` varchar(1) NOT NULL,
  `nav_id` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_plat_nav
-- ----------------------------
INSERT INTO `chc_plat_nav` VALUES ('1', 'P', 'N000001');
INSERT INTO `chc_plat_nav` VALUES ('2', 'P', 'N000002');
INSERT INTO `chc_plat_nav` VALUES ('3', 'P', 'N000003');
INSERT INTO `chc_plat_nav` VALUES ('4', 'P', 'N000004');

-- ----------------------------
-- Table structure for `chc_product_category`
-- ----------------------------
DROP TABLE IF EXISTS `chc_product_category`;
CREATE TABLE `chc_product_category` (
  `category_id` varchar(12) NOT NULL,
  `category_name` varchar(64) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `parent_id` varchar(12) NOT NULL DEFAULT '0',
  `status` varchar(1) DEFAULT '0' COMMENT '0:显示，1：已删除',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `index_corpid_protypename` (`category_name`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_product_category
-- ----------------------------
INSERT INTO `chc_product_category` VALUES ('16', '生活用品1', 'icon-home', '17', '0');
INSERT INTO `chc_product_category` VALUES ('17', '建材1', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('18', '建材', '', '0', '0');
INSERT INTO `chc_product_category` VALUES ('19', '家用建材', '', '18', '0');
INSERT INTO `chc_product_category` VALUES ('20', '小家建材', '', '19', '0');
INSERT INTO `chc_product_category` VALUES ('21', '智能家居', '', '19', '0');
INSERT INTO `chc_product_category` VALUES ('22', '户外旅游', '', '4', '0');
INSERT INTO `chc_product_category` VALUES ('24', '男装', '', '5', '0');
INSERT INTO `chc_product_category` VALUES ('25', '咳嗽药类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('26', '医疗器械-器械', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('27', '咳嗽糖浆类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('28', '处方药类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('29', '眼药水及鼻剂类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('30', '搽剂类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('31', '保健食品', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('32', '贴膏类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('33', '非处方药', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('34', '妇科类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('35', '清热解毒类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('36', '补肾益气类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('37', '成人感冒药', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('38', '胃肠道类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('39', '风湿关节类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('4', '旅行休闲', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('40', '非处方外用药类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('41', '外用喷剂类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('42', '抗生素类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('43', '心脑血管类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('44', '小儿感冒药', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('45', '维生素矿物质类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('46', '凉茶类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('47', '含片类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('48', '外用处方药类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('49', '抗过敏类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('5', '服装服饰', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('50', '中药饮片类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('51', '中药参茸类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('52', '日用品类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('53', '保健礼品', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('54', '药酒类', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('55', '2222', null, '26', '0');
INSERT INTO `chc_product_category` VALUES ('6', '数码3C', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('7', '小吃零食', null, '0', '0');
INSERT INTO `chc_product_category` VALUES ('8', '饮料', null, '0', '0');

-- ----------------------------
-- Table structure for `chc_product_ku`
-- ----------------------------
DROP TABLE IF EXISTS `chc_product_ku`;
CREATE TABLE `chc_product_ku` (
  `product_id` varchar(12) NOT NULL COMMENT '产品id,系统唯一',
  `product_name` varchar(100) NOT NULL COMMENT '产品名称',
  `product_code` varchar(40) NOT NULL COMMENT '产品条码',
  `product_no` varchar(20) DEFAULT NULL,
  `category_id` varchar(12) DEFAULT NULL COMMENT '分类id',
  `remark` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`product_id`,`product_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_product_ku
-- ----------------------------
INSERT INTO `chc_product_ku` VALUES ('5900', '止咳祛痰颗粒-九连山', '6927749300151', '00002', '25', null);
INSERT INTO `chc_product_ku` VALUES ('5901', '杜斯邦加倍润滑避孕套（创美）', '6944553181493', '00009', '26', null);
INSERT INTO `chc_product_ku` VALUES ('5902', '小儿咳喘灵口服液（维萃）', '6941734700047', '00010', '27', null);
INSERT INTO `chc_product_ku` VALUES ('5903', '辛芩颗粒（康裕）', '6924426568194', '00029', '28', null);
INSERT INTO `chc_product_ku` VALUES ('5904', '熊胆视清护理液（创美）', '6970101010076', '00032', '29', null);
INSERT INTO `chc_product_ku` VALUES ('5905', '海马抑菌油-创美', '6970101011417', '00040', '30', null);

-- ----------------------------
-- Table structure for `chc_reserve`
-- ----------------------------
DROP TABLE IF EXISTS `chc_reserve`;
CREATE TABLE `chc_reserve` (
  `reserve_id` varchar(20) NOT NULL,
  `from_userid` int(11) DEFAULT NULL,
  `to_userid` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(4) DEFAULT NULL,
  `reserve_time` varchar(6) DEFAULT NULL,
  `reserve_date` date DEFAULT NULL,
  `reserve_address` varchar(100) DEFAULT NULL,
  `lat` varchar(12) DEFAULT NULL,
  `lng` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`reserve_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_reserve
-- ----------------------------
INSERT INTO `chc_reserve` VALUES ('20171128125533559794', '1', null, '2', null, '1', null, null, null, null, null);

-- ----------------------------
-- Table structure for `chc_subject`
-- ----------------------------
DROP TABLE IF EXISTS `chc_subject`;
CREATE TABLE `chc_subject` (
  `subject_id` int(10) NOT NULL AUTO_INCREMENT,
  `subject_no` varchar(20) DEFAULT NULL COMMENT '自定义编号',
  `subject_name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_subject
-- ----------------------------
INSERT INTO `chc_subject` VALUES ('1', 'A0001', 'wwwwww');
INSERT INTO `chc_subject` VALUES ('2', null, 'YYYYYYY');
INSERT INTO `chc_subject` VALUES ('3', null, 'MMMM7');
INSERT INTO `chc_subject` VALUES ('4', null, 'MMMMMM');
INSERT INTO `chc_subject` VALUES ('5', null, '妇科');
INSERT INTO `chc_subject` VALUES ('6', null, '脑外科');
INSERT INTO `chc_subject` VALUES ('7', null, '肿瘤科');
INSERT INTO `chc_subject` VALUES ('8', null, '皮肤科');
INSERT INTO `chc_subject` VALUES ('9', null, '心外科');
INSERT INTO `chc_subject` VALUES ('10', null, '放射科');

-- ----------------------------
-- Table structure for `chc_travel_schedule`
-- ----------------------------
DROP TABLE IF EXISTS `chc_travel_schedule`;
CREATE TABLE `chc_travel_schedule` (
  `travel_id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `business_date` date NOT NULL,
  `begin_time` varchar(6) DEFAULT NULL,
  `end_time` varchar(6) DEFAULT NULL,
  `travel_address` varchar(100) DEFAULT NULL,
  `lat` varchar(12) DEFAULT NULL,
  `lng` varchar(12) DEFAULT NULL,
  `status` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`travel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chc_travel_schedule
-- ----------------------------
INSERT INTO `chc_travel_schedule` VALUES ('1', '1', null, '2017-11-21', '7:00', '11:00', '海南省人民医院', '0.33311', '2.3312112', '1');

-- ----------------------------
-- Table structure for `upms_log`
-- ----------------------------
DROP TABLE IF EXISTS `upms_log`;
CREATE TABLE `upms_log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `description` varchar(100) DEFAULT NULL COMMENT '操作描述',
  `username` varchar(20) DEFAULT NULL COMMENT '操作用户',
  `start_time` bigint(20) DEFAULT NULL COMMENT '操作时间',
  `spend_time` int(11) DEFAULT NULL COMMENT '消耗时间',
  `base_path` varchar(500) DEFAULT NULL COMMENT '根路径',
  `uri` varchar(500) DEFAULT NULL COMMENT 'URI',
  `url` varchar(500) DEFAULT NULL COMMENT 'URL',
  `method` varchar(10) DEFAULT NULL COMMENT '请求类型',
  `parameter` mediumtext,
  `user_agent` varchar(500) DEFAULT NULL COMMENT '用户标识',
  `ip` varchar(30) DEFAULT NULL COMMENT 'IP地址',
  `result` mediumtext,
  `permissions` varchar(100) DEFAULT NULL COMMENT '权限值',
  PRIMARY KEY (`log_id`),
  KEY `log_id` (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='操作日志';

-- ----------------------------
-- Records of upms_log
-- ----------------------------

-- ----------------------------
-- Table structure for `upms_organization`
-- ----------------------------
DROP TABLE IF EXISTS `upms_organization`;
CREATE TABLE `upms_organization` (
  `organization_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `pid` int(10) DEFAULT NULL COMMENT '所属上级',
  `name` varchar(20) DEFAULT NULL COMMENT '组织名称',
  `description` varchar(1000) DEFAULT NULL COMMENT '组织描述',
  `ctime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COMMENT='组织';

-- ----------------------------
-- Records of upms_organization
-- ----------------------------
INSERT INTO `upms_organization` VALUES ('1', null, '总部', '北京总部', '1');
INSERT INTO `upms_organization` VALUES ('4', null, '河北分部', '河北石家庄', '1488122466236');
INSERT INTO `upms_organization` VALUES ('5', null, '河南分部', '河南郑州', '1488122480265');
INSERT INTO `upms_organization` VALUES ('6', null, '湖北分部', '湖北武汉', '1488122493265');
INSERT INTO `upms_organization` VALUES ('7', null, '湖南分部', '湖南长沙', '1488122502752');
INSERT INTO `upms_organization` VALUES ('8', null, '海南分部', '', '1512212274431');

-- ----------------------------
-- Table structure for `upms_permission`
-- ----------------------------
DROP TABLE IF EXISTS `upms_permission`;
CREATE TABLE `upms_permission` (
  `permission_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `system_id` int(10) unsigned NOT NULL COMMENT '所属系统',
  `pid` int(10) DEFAULT NULL COMMENT '所属上级',
  `name` varchar(20) DEFAULT NULL COMMENT '名称',
  `type` tinyint(4) DEFAULT NULL COMMENT '类型(1:目录,2:菜单,3:按钮)',
  `permission_value` varchar(50) DEFAULT NULL COMMENT '权限值',
  `uri` varchar(100) DEFAULT NULL COMMENT '路径',
  `icon` varchar(50) DEFAULT NULL COMMENT '图标',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态(0:禁止,1:正常)',
  `ctime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `orders` bigint(20) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COMMENT='权限';

-- ----------------------------
-- Records of upms_permission
-- ----------------------------
INSERT INTO `upms_permission` VALUES ('1', '1', '0', '系统组织管理', '1', '', '', 'zmdi zmdi-accounts-list', '1', '1', '1');
INSERT INTO `upms_permission` VALUES ('2', '1', '1', '系统管理', '2', 'upms:system:read', '/manage/system/index', '', '1', '2', '2');
INSERT INTO `upms_permission` VALUES ('3', '1', '1', '组织管理', '2', 'upms:organization:read', '/manage/organization/index', '', '1', '3', '3');
INSERT INTO `upms_permission` VALUES ('4', '1', '0', '角色用户管理', '1', '', '', 'zmdi zmdi-accounts', '1', '4', '4');
INSERT INTO `upms_permission` VALUES ('5', '1', '4', '角色管理', '2', 'upms:role:read', '/manage/role/index', '', '1', '6', '6');
INSERT INTO `upms_permission` VALUES ('6', '1', '4', '用户管理', '2', 'upms:user:read', '/manage/user/index', '', '1', '5', '5');
INSERT INTO `upms_permission` VALUES ('7', '1', '0', '权限资源管理', '1', '', '', 'zmdi zmdi-lock-outline', '1', '7', '7');
INSERT INTO `upms_permission` VALUES ('12', '1', '0', '其他数据管理', '1', '', '', 'zmdi zmdi-more', '1', '12', '12');
INSERT INTO `upms_permission` VALUES ('14', '1', '12', '会话管理', '2', 'upms:session:read', '/manage/session/index', '', '1', '14', '14');
INSERT INTO `upms_permission` VALUES ('15', '1', '12', '日志记录', '2', 'upms:log:read', '/manage/log/index', '', '1', '15', '15');
INSERT INTO `upms_permission` VALUES ('24', '1', '2', '新增系统', '3', 'upms:system:create', '/manage/system/create', 'zmdi zmdi-plus', '1', '24', '24');
INSERT INTO `upms_permission` VALUES ('25', '1', '2', '编辑系统', '3', 'upms:system:update', '/manage/system/update', 'zmdi zmdi-edit', '1', '25', '25');
INSERT INTO `upms_permission` VALUES ('26', '1', '2', '删除系统', '3', 'upms:system:delete', '/manage/system/delete', 'zmdi zmdi-close', '1', '26', '26');
INSERT INTO `upms_permission` VALUES ('27', '1', '3', '新增组织', '3', 'upms:organization:create', '/manage/organization/create', 'zmdi zmdi-plus', '1', '27', '27');
INSERT INTO `upms_permission` VALUES ('28', '1', '3', '编辑组织', '3', 'upms:organization:update', '/manage/organization/update', 'zmdi zmdi-edit', '1', '28', '28');
INSERT INTO `upms_permission` VALUES ('29', '1', '3', '删除组织', '3', 'upms:organization:delete', '/manage/organization/delete', 'zmdi zmdi-close', '1', '29', '29');
INSERT INTO `upms_permission` VALUES ('30', '1', '6', '新增用户', '3', 'upms:user:create', '/manage/user/create', 'zmdi zmdi-plus', '1', '30', '30');
INSERT INTO `upms_permission` VALUES ('31', '1', '6', '编辑用户', '3', 'upms:user:update', '/manage/user/update', 'zmdi zmdi-edit', '1', '31', '31');
INSERT INTO `upms_permission` VALUES ('32', '1', '6', '删除用户', '3', 'upms:user:delete', '/manage/user/delete', 'zmdi zmdi-close', '1', '32', '32');
INSERT INTO `upms_permission` VALUES ('33', '1', '5', '新增角色', '3', 'upms:role:create', '/manage/role/create', 'zmdi zmdi-plus', '1', '33', '33');
INSERT INTO `upms_permission` VALUES ('34', '1', '5', '编辑角色', '3', 'upms:role:update', '/manage/role/update', 'zmdi zmdi-edit', '1', '34', '34');
INSERT INTO `upms_permission` VALUES ('35', '1', '5', '删除角色', '3', 'upms:role:delete', '/manage/role/delete', 'zmdi zmdi-close', '1', '35', '35');
INSERT INTO `upms_permission` VALUES ('36', '1', '39', '新增权限', '3', 'upms:permission:create', '/manage/permission/create', 'zmdi zmdi-plus', '1', '36', '36');
INSERT INTO `upms_permission` VALUES ('37', '1', '39', '编辑权限', '3', 'upms:permission:update', '/manage/permission/update', 'zmdi zmdi-edit', '1', '37', '37');
INSERT INTO `upms_permission` VALUES ('38', '1', '39', '删除权限', '3', 'upms:permission:delete', '/manage/permission/delete', 'zmdi zmdi-close', '1', '38', '38');
INSERT INTO `upms_permission` VALUES ('39', '1', '7', '权限管理', '2', 'upms:permission:read', '/manage/permission/index', null, '1', '39', '39');
INSERT INTO `upms_permission` VALUES ('46', '1', '5', '角色权限', '3', 'upms:role:permission', '/manage/role/permission', 'zmdi zmdi-key', '1', '1488091928257', '1488091928257');
INSERT INTO `upms_permission` VALUES ('48', '1', '6', '用户组织', '3', 'upms:user:organization', '/manage/user/organization', 'zmdi zmdi-accounts-list', '1', '1488120011165', '1488120011165');
INSERT INTO `upms_permission` VALUES ('50', '1', '6', '用户角色', '3', 'upms:user:role', '/manage/user/role', 'zmdi zmdi-accounts', '1', '1488120554175', '1488120554175');
INSERT INTO `upms_permission` VALUES ('51', '1', '6', '用户权限', '3', 'upms:user:permission', '/manage/user/permission', 'zmdi zmdi-key', '1', '1488092013302', '1488092013302');
INSERT INTO `upms_permission` VALUES ('53', '1', '14', '强制退出', '3', 'upms:session:forceout', '/manage/session/forceout', 'zmdi zmdi-run', '1', '1488379514715', '1488379514715');
INSERT INTO `upms_permission` VALUES ('57', '1', '15', '删除权限', '3', 'upms:log:delete', '/manage/log/delete', 'zmdi zmdi-close', '1', '1489503867909', '1489503867909');

-- ----------------------------
-- Table structure for `upms_role`
-- ----------------------------
DROP TABLE IF EXISTS `upms_role`;
CREATE TABLE `upms_role` (
  `role_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(20) DEFAULT NULL COMMENT '角色名称',
  `title` varchar(20) DEFAULT NULL COMMENT '角色标题',
  `description` varchar(1000) DEFAULT NULL COMMENT '角色描述',
  `ctime` bigint(20) NOT NULL COMMENT '创建时间',
  `orders` bigint(20) NOT NULL COMMENT '排序',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='角色';

-- ----------------------------
-- Records of upms_role
-- ----------------------------
INSERT INTO `upms_role` VALUES ('1', 'super', '超级管理员', '拥有所有权限', '1', '1');
INSERT INTO `upms_role` VALUES ('2', 'admin', '管理员', '拥有除权限管理系统外的所有权限', '1487471013117', '1487471013117');
INSERT INTO `upms_role` VALUES ('3', 'user', '用户管理员', '', '1512748855459', '1512748855459');

-- ----------------------------
-- Table structure for `upms_role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `upms_role_permission`;
CREATE TABLE `upms_role_permission` (
  `role_permission_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `role_id` int(10) unsigned NOT NULL COMMENT '角色编号',
  `permission_id` int(10) unsigned NOT NULL COMMENT '权限编号',
  PRIMARY KEY (`role_permission_id`),
  KEY `FK_Reference_23` (`role_id`),
  CONSTRAINT `upms_role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `upms_role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COMMENT='角色权限关联表';

-- ----------------------------
-- Records of upms_role_permission
-- ----------------------------
INSERT INTO `upms_role_permission` VALUES ('1', '1', '1');
INSERT INTO `upms_role_permission` VALUES ('2', '1', '2');
INSERT INTO `upms_role_permission` VALUES ('3', '1', '3');
INSERT INTO `upms_role_permission` VALUES ('4', '1', '4');
INSERT INTO `upms_role_permission` VALUES ('5', '1', '5');
INSERT INTO `upms_role_permission` VALUES ('6', '1', '6');
INSERT INTO `upms_role_permission` VALUES ('7', '1', '7');
INSERT INTO `upms_role_permission` VALUES ('8', '1', '39');
INSERT INTO `upms_role_permission` VALUES ('12', '1', '12');
INSERT INTO `upms_role_permission` VALUES ('14', '1', '14');
INSERT INTO `upms_role_permission` VALUES ('15', '1', '15');
INSERT INTO `upms_role_permission` VALUES ('17', '1', '17');
INSERT INTO `upms_role_permission` VALUES ('19', '1', '19');
INSERT INTO `upms_role_permission` VALUES ('20', '1', '20');
INSERT INTO `upms_role_permission` VALUES ('21', '1', '21');
INSERT INTO `upms_role_permission` VALUES ('24', '1', '24');
INSERT INTO `upms_role_permission` VALUES ('27', '1', '27');
INSERT INTO `upms_role_permission` VALUES ('28', '1', '28');
INSERT INTO `upms_role_permission` VALUES ('29', '1', '29');
INSERT INTO `upms_role_permission` VALUES ('30', '1', '30');
INSERT INTO `upms_role_permission` VALUES ('31', '1', '31');
INSERT INTO `upms_role_permission` VALUES ('32', '1', '32');
INSERT INTO `upms_role_permission` VALUES ('33', '1', '33');
INSERT INTO `upms_role_permission` VALUES ('34', '1', '34');
INSERT INTO `upms_role_permission` VALUES ('35', '1', '35');
INSERT INTO `upms_role_permission` VALUES ('36', '1', '36');
INSERT INTO `upms_role_permission` VALUES ('37', '1', '37');
INSERT INTO `upms_role_permission` VALUES ('38', '1', '38');
INSERT INTO `upms_role_permission` VALUES ('39', '1', '46');
INSERT INTO `upms_role_permission` VALUES ('40', '1', '51');
INSERT INTO `upms_role_permission` VALUES ('44', '1', '48');
INSERT INTO `upms_role_permission` VALUES ('45', '1', '50');
INSERT INTO `upms_role_permission` VALUES ('47', '1', '53');
INSERT INTO `upms_role_permission` VALUES ('48', '1', '18');
INSERT INTO `upms_role_permission` VALUES ('49', '1', '54');
INSERT INTO `upms_role_permission` VALUES ('50', '1', '54');
INSERT INTO `upms_role_permission` VALUES ('51', '1', '55');
INSERT INTO `upms_role_permission` VALUES ('52', '1', '54');
INSERT INTO `upms_role_permission` VALUES ('53', '1', '55');
INSERT INTO `upms_role_permission` VALUES ('54', '1', '56');
INSERT INTO `upms_role_permission` VALUES ('55', '1', '57');
INSERT INTO `upms_role_permission` VALUES ('56', '1', '58');
INSERT INTO `upms_role_permission` VALUES ('57', '1', '58');
INSERT INTO `upms_role_permission` VALUES ('58', '1', '59');
INSERT INTO `upms_role_permission` VALUES ('59', '1', '60');
INSERT INTO `upms_role_permission` VALUES ('60', '1', '61');
INSERT INTO `upms_role_permission` VALUES ('61', '1', '62');
INSERT INTO `upms_role_permission` VALUES ('62', '1', '62');
INSERT INTO `upms_role_permission` VALUES ('63', '1', '63');
INSERT INTO `upms_role_permission` VALUES ('64', '1', '62');
INSERT INTO `upms_role_permission` VALUES ('65', '1', '63');
INSERT INTO `upms_role_permission` VALUES ('66', '1', '64');
INSERT INTO `upms_role_permission` VALUES ('67', '1', '62');
INSERT INTO `upms_role_permission` VALUES ('68', '1', '63');
INSERT INTO `upms_role_permission` VALUES ('69', '1', '64');
INSERT INTO `upms_role_permission` VALUES ('70', '1', '65');
INSERT INTO `upms_role_permission` VALUES ('71', '1', '62');
INSERT INTO `upms_role_permission` VALUES ('72', '1', '63');
INSERT INTO `upms_role_permission` VALUES ('73', '1', '64');
INSERT INTO `upms_role_permission` VALUES ('74', '1', '65');
INSERT INTO `upms_role_permission` VALUES ('75', '1', '66');
INSERT INTO `upms_role_permission` VALUES ('76', '1', '62');
INSERT INTO `upms_role_permission` VALUES ('77', '1', '63');
INSERT INTO `upms_role_permission` VALUES ('78', '1', '64');
INSERT INTO `upms_role_permission` VALUES ('79', '1', '65');
INSERT INTO `upms_role_permission` VALUES ('80', '1', '66');
INSERT INTO `upms_role_permission` VALUES ('81', '1', '67');
INSERT INTO `upms_role_permission` VALUES ('82', '1', '68');
INSERT INTO `upms_role_permission` VALUES ('83', '1', '69');
INSERT INTO `upms_role_permission` VALUES ('84', '1', '69');
INSERT INTO `upms_role_permission` VALUES ('85', '1', '70');
INSERT INTO `upms_role_permission` VALUES ('86', '1', '69');
INSERT INTO `upms_role_permission` VALUES ('87', '1', '70');
INSERT INTO `upms_role_permission` VALUES ('88', '1', '71');
INSERT INTO `upms_role_permission` VALUES ('89', '1', '72');
INSERT INTO `upms_role_permission` VALUES ('90', '1', '72');
INSERT INTO `upms_role_permission` VALUES ('91', '1', '73');
INSERT INTO `upms_role_permission` VALUES ('92', '1', '72');
INSERT INTO `upms_role_permission` VALUES ('93', '1', '73');
INSERT INTO `upms_role_permission` VALUES ('94', '1', '74');
INSERT INTO `upms_role_permission` VALUES ('95', '1', '72');
INSERT INTO `upms_role_permission` VALUES ('96', '1', '73');
INSERT INTO `upms_role_permission` VALUES ('97', '1', '74');
INSERT INTO `upms_role_permission` VALUES ('98', '1', '75');
INSERT INTO `upms_role_permission` VALUES ('99', '1', '76');
INSERT INTO `upms_role_permission` VALUES ('100', '1', '76');
INSERT INTO `upms_role_permission` VALUES ('101', '1', '77');
INSERT INTO `upms_role_permission` VALUES ('102', '1', '76');
INSERT INTO `upms_role_permission` VALUES ('103', '1', '77');
INSERT INTO `upms_role_permission` VALUES ('105', '1', '79');
INSERT INTO `upms_role_permission` VALUES ('106', '1', '80');
INSERT INTO `upms_role_permission` VALUES ('107', '1', '81');
INSERT INTO `upms_role_permission` VALUES ('108', '1', '81');
INSERT INTO `upms_role_permission` VALUES ('109', '1', '82');
INSERT INTO `upms_role_permission` VALUES ('110', '1', '81');
INSERT INTO `upms_role_permission` VALUES ('111', '1', '82');
INSERT INTO `upms_role_permission` VALUES ('112', '1', '83');
INSERT INTO `upms_role_permission` VALUES ('113', '1', '84');
INSERT INTO `upms_role_permission` VALUES ('114', '1', '84');
INSERT INTO `upms_role_permission` VALUES ('115', '1', '85');
INSERT INTO `upms_role_permission` VALUES ('121', '1', '78');
INSERT INTO `upms_role_permission` VALUES ('122', '1', '78');
INSERT INTO `upms_role_permission` VALUES ('124', '1', '25');
INSERT INTO `upms_role_permission` VALUES ('125', '1', '26');
INSERT INTO `upms_role_permission` VALUES ('126', '3', '17');
INSERT INTO `upms_role_permission` VALUES ('127', '3', '18');
INSERT INTO `upms_role_permission` VALUES ('128', '3', '54');
INSERT INTO `upms_role_permission` VALUES ('129', '3', '55');
INSERT INTO `upms_role_permission` VALUES ('130', '3', '56');
INSERT INTO `upms_role_permission` VALUES ('131', '3', '19');
INSERT INTO `upms_role_permission` VALUES ('132', '3', '58');
INSERT INTO `upms_role_permission` VALUES ('133', '3', '59');
INSERT INTO `upms_role_permission` VALUES ('134', '3', '60');
INSERT INTO `upms_role_permission` VALUES ('135', '3', '20');
INSERT INTO `upms_role_permission` VALUES ('136', '3', '21');
INSERT INTO `upms_role_permission` VALUES ('137', '3', '76');
INSERT INTO `upms_role_permission` VALUES ('138', '3', '77');
INSERT INTO `upms_role_permission` VALUES ('139', '3', '78');

-- ----------------------------
-- Table structure for `upms_system`
-- ----------------------------
DROP TABLE IF EXISTS `upms_system`;
CREATE TABLE `upms_system` (
  `system_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `icon` varchar(50) DEFAULT NULL COMMENT '图标',
  `banner` varchar(150) DEFAULT NULL COMMENT '背景',
  `theme` varchar(50) DEFAULT NULL COMMENT '主题',
  `basepath` varchar(100) DEFAULT NULL COMMENT '根目录',
  `status` tinyint(4) DEFAULT NULL COMMENT '状态(-1:黑名单,1:正常)',
  `name` varchar(20) DEFAULT NULL COMMENT '系统名称',
  `title` varchar(20) DEFAULT NULL COMMENT '系统标题',
  `description` varchar(300) DEFAULT NULL COMMENT '系统描述',
  `ctime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `orders` bigint(20) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COMMENT='系统';

-- ----------------------------
-- Records of upms_system
-- ----------------------------
INSERT INTO `upms_system` VALUES ('1', 'zmdi zmdi-shield-security', '/resources/zheng-admin/images/zheng-upms.png', '#29A176', 'http://upms.zhangshuzheng.cn:1111', '1', 'zheng-upms-server', '权限管理系统', '用户权限管理系统（RBAC细粒度用户权限、统一后台、单点登录、会话管理）', '1', '1');
INSERT INTO `upms_system` VALUES ('6', 'zmdi zmdi-cloud', '/resources/zheng-admin/images/zheng-oss.png', '#0B8DE5', 'http://hospital.zhangshuzheng.cn:5555', '1', 'zheng-hospital-admin', '医药管理系统', '医药传力系统', '6', '6');

-- ----------------------------
-- Table structure for `upms_user`
-- ----------------------------
DROP TABLE IF EXISTS `upms_user`;
CREATE TABLE `upms_user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `username` varchar(20) NOT NULL COMMENT '帐号',
  `password` varchar(32) NOT NULL COMMENT '密码MD5(密码+盐)',
  `salt` varchar(32) DEFAULT NULL COMMENT '盐',
  `realname` varchar(20) DEFAULT NULL COMMENT '姓名',
  `avatar` varchar(150) DEFAULT NULL COMMENT '头像',
  `phone` varchar(20) DEFAULT NULL COMMENT '电话',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `sex` tinyint(4) DEFAULT NULL COMMENT '性别',
  `locked` tinyint(4) DEFAULT NULL COMMENT '状态(0:正常,1:锁定)',
  `ctime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='用户';

-- ----------------------------
-- Records of upms_user
-- ----------------------------
INSERT INTO `upms_user` VALUES ('1', 'admin', '3038D9CB63B3152A79B8153FB06C02F7', '66f1b370c660445a8657bf8bf1794486', '张恕征', '/resources/zheng-admin/images/avatar.jpg', '', '469741414@qq.com', '1', '0', '1');
INSERT INTO `upms_user` VALUES ('2', 'test', '285C9762F5F9046F5893F752DFAF3476', 'd2d0d03310444ad388a8b290b0fe8564', '张恕征', '/resources/zheng-admin/images/avatar.jpg', '', '469741414@qq.com', '1', '0', '1493394720495');
INSERT INTO `upms_user` VALUES ('3', 'shinyzo', 'F3F6492FE10A3F81B701285E72B48E3C', '1bfc0466285149098728421c1f831dc3', '张良明', '', '', '1259099190@qq.com', '1', '0', '1512212331511');

-- ----------------------------
-- Table structure for `upms_user_organization`
-- ----------------------------
DROP TABLE IF EXISTS `upms_user_organization`;
CREATE TABLE `upms_user_organization` (
  `user_organization_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户编号',
  `organization_id` int(10) unsigned NOT NULL COMMENT '组织编号',
  PRIMARY KEY (`user_organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COMMENT='用户组织关联表';

-- ----------------------------
-- Records of upms_user_organization
-- ----------------------------
INSERT INTO `upms_user_organization` VALUES ('19', '1', '1');
INSERT INTO `upms_user_organization` VALUES ('20', '1', '4');
INSERT INTO `upms_user_organization` VALUES ('21', '1', '5');
INSERT INTO `upms_user_organization` VALUES ('22', '1', '6');
INSERT INTO `upms_user_organization` VALUES ('23', '1', '7');

-- ----------------------------
-- Table structure for `upms_user_permission`
-- ----------------------------
DROP TABLE IF EXISTS `upms_user_permission`;
CREATE TABLE `upms_user_permission` (
  `user_permission_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户编号',
  `permission_id` int(10) unsigned NOT NULL COMMENT '权限编号',
  `type` tinyint(4) NOT NULL COMMENT '权限类型(-1:减权限,1:增权限)',
  PRIMARY KEY (`user_permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COMMENT='用户权限关联表';

-- ----------------------------
-- Records of upms_user_permission
-- ----------------------------
INSERT INTO `upms_user_permission` VALUES ('3', '1', '22', '-1');
INSERT INTO `upms_user_permission` VALUES ('4', '1', '22', '1');
INSERT INTO `upms_user_permission` VALUES ('5', '2', '24', '-1');
INSERT INTO `upms_user_permission` VALUES ('6', '2', '26', '-1');
INSERT INTO `upms_user_permission` VALUES ('7', '2', '27', '-1');
INSERT INTO `upms_user_permission` VALUES ('8', '2', '29', '-1');
INSERT INTO `upms_user_permission` VALUES ('9', '2', '32', '-1');
INSERT INTO `upms_user_permission` VALUES ('10', '2', '51', '-1');
INSERT INTO `upms_user_permission` VALUES ('11', '2', '48', '-1');
INSERT INTO `upms_user_permission` VALUES ('12', '2', '50', '-1');
INSERT INTO `upms_user_permission` VALUES ('13', '2', '35', '-1');
INSERT INTO `upms_user_permission` VALUES ('14', '2', '46', '-1');
INSERT INTO `upms_user_permission` VALUES ('15', '2', '37', '-1');
INSERT INTO `upms_user_permission` VALUES ('16', '2', '38', '-1');
INSERT INTO `upms_user_permission` VALUES ('17', '2', '57', '-1');
INSERT INTO `upms_user_permission` VALUES ('18', '2', '56', '-1');
INSERT INTO `upms_user_permission` VALUES ('19', '2', '59', '-1');
INSERT INTO `upms_user_permission` VALUES ('20', '2', '78', '-1');
INSERT INTO `upms_user_permission` VALUES ('21', '2', '67', '-1');
INSERT INTO `upms_user_permission` VALUES ('22', '2', '83', '-1');
INSERT INTO `upms_user_permission` VALUES ('23', '2', '71', '-1');
INSERT INTO `upms_user_permission` VALUES ('24', '2', '75', '-1');

-- ----------------------------
-- Table structure for `upms_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `upms_user_role`;
CREATE TABLE `upms_user_role` (
  `user_role_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `user_id` int(10) unsigned NOT NULL COMMENT '用户编号',
  `role_id` int(10) DEFAULT NULL COMMENT '角色编号',
  PRIMARY KEY (`user_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';

-- ----------------------------
-- Records of upms_user_role
-- ----------------------------
INSERT INTO `upms_user_role` VALUES ('4', '1', '1');
INSERT INTO `upms_user_role` VALUES ('5', '1', '2');
INSERT INTO `upms_user_role` VALUES ('6', '2', '1');
INSERT INTO `upms_user_role` VALUES ('7', '2', '2');

-- ----------------------------
-- Procedure structure for `init_shiro_demo`
-- ----------------------------
DROP PROCEDURE IF EXISTS `init_shiro_demo`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `init_shiro_demo`()
BEGIN	
/*
SQLyog 企业版 - MySQL GUI v7.14 
MySQL - 5.6.16-log : Database - 
*********************************************************************
*/
/*表结构插入*/
DROP TABLE IF EXISTS `u_permission`;
CREATE TABLE `u_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(256) DEFAULT NULL COMMENT 'url地址',
  `name` varchar(64) DEFAULT NULL COMMENT 'url描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*Table structure for table `u_role` */
DROP TABLE IF EXISTS `u_role`;
CREATE TABLE `u_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '角色名称',
  `type` varchar(10) DEFAULT NULL COMMENT '角色类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*Table structure for table `u_role_permission` */
DROP TABLE IF EXISTS `u_role_permission`;
CREATE TABLE `u_role_permission` (
  `rid` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `pid` bigint(20) DEFAULT NULL COMMENT '权限ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*Table structure for table `u_user` */
DROP TABLE IF EXISTS `u_user`;
CREATE TABLE `u_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(20) DEFAULT NULL COMMENT '用户昵称',
  `email` varchar(128) DEFAULT NULL COMMENT '邮箱|登录帐号',
  `pswd` varchar(32) DEFAULT NULL COMMENT '密码',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `status` bigint(1) DEFAULT '1' COMMENT '1:有效，0:禁止登录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*Table structure for table `u_user_role` */
DROP TABLE IF EXISTS `u_user_role`;
CREATE TABLE `u_user_role` (
  `uid` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `rid` bigint(20) DEFAULT NULL COMMENT '角色ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*
SQLyog 企业版 - MySQL GUI v7.14 
MySQL - 5.6.16-log : Database - i_wenyiba_com
*********************************************************************
*/
/*所有的表数据插入*/
/*Data for the table `u_permission` */
insert  into `u_permission`(`id`,`url`,`name`) values (4,'/permission/index.shtml','权限列表'),(6,'/permission/addPermission.shtml','权限添加'),(7,'/permission/deletePermissionById.shtml','权限删除'),(8,'/member/list.shtml','用户列表'),(9,'/member/online.shtml','在线用户'),(10,'/member/changeSessionStatus.shtml','用户Session踢出'),(11,'/member/forbidUserById.shtml','用户激活&禁止'),(12,'/member/deleteUserById.shtml','用户删除'),(13,'/permission/addPermission2Role.shtml','权限分配'),(14,'/role/clearRoleByUserIds.shtml','用户角色分配清空'),(15,'/role/addRole2User.shtml','角色分配保存'),(16,'/role/deleteRoleById.shtml','角色列表删除'),(17,'/role/addRole.shtml','角色列表添加'),(18,'/role/index.shtml','角色列表'),(19,'/permission/allocation.shtml','权限分配'),(20,'/role/allocation.shtml','角色分配');
/*Data for the table `u_role` */
insert  into `u_role`(`id`,`name`,`type`) values (1,'系统管理员','888888'),(3,'权限角色','100003'),(4,'用户中心','100002');
/*Data for the table `u_role_permission` */
insert  into `u_role_permission`(`rid`,`pid`) values (4,8),(4,9),(4,10),(4,11),(4,12),(3,4),(3,6),(3,7),(3,13),(3,14),(3,15),(3,16),(3,17),(3,18),(3,19),(3,20),(1,4),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20);
/*Data for the table `u_user` */
insert  into `u_user`(`id`,`nickname`,`email`,`pswd`,`create_time`,`last_login_time`,`status`) values (1,'管理员','admin','9c3250081c7b1f5c6cbb8096e3e1cd04','2016-06-16 11:15:33','2016-06-16 11:24:10',1),(11,'soso','8446666@qq.com','d57ffbe486910dd5b26d0167d034f9ad','2016-05-26 20:50:54','2016-06-16 11:24:35',1),(12,'8446666','8446666','4afdc875a67a55528c224ce088be2ab8','2016-05-27 22:34:19','2016-06-15 17:03:16',1);
/*Data for the table `u_user_role` */
insert  into `u_user_role`(`uid`,`rid`) values (12,4),(11,3),(11,4),(1,1);
   
    END
;;
DELIMITER ;
