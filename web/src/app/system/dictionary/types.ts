import {Observable, Subscribable} from 'rxjs/Observable';

export const types = {
    row_count: 141,
    page_count: 1,
    page_data: [
        {param_type: 'DIS_PHASE', param_name: '所处阶段'},
        {param_type: 'RULE_TYPE', param_name: '规则类型'},
        {param_type: 'TRAFFIC_TYPE', param_name: '武器库赠送流量模板-赠送流量类型'},
        {param_type: 'TRAFFIC_PRIORITY', param_name: '武器库赠送流量模板-赠送流量优先级'},
        {param_type: 'VALIDITY_TYPE', param_name: '武器库赠送流量模板-赠送流量有效期类型'},
        {param_type: 'ACTIVITY_LEVEL', param_name: '武器库赠送流量模板-流量赠送档次'},
        {param_type: 'ASNLTMP_PRODUCT_BRAND', param_name: '武器库模板产品品牌'},
        {param_type: 'ASNLTMP_REQ_TARGET', param_name: '武器库模板需求目的'},
        {param_type: 'ASNLTMP_SUBJECT_CODE', param_name: '武器库模板科目编码'},
        {param_type: 'ASNLTMP_EXPORT_TAG', param_name: '武器库模板导出处标记'},
        {param_type: 'ASNLTMP_PRIO_LEVEL', param_name: '武器库模板优先级'},
        {param_type: 'ASNLTMP_CONTRACT', param_name: '武器库模板协议'},
        {param_type: 'ASNLTMP_AAT_REGION', param_name: '武器库模板申请单位'},
        {param_type: 'ASNLTMP_DEAL_CHANNEL', param_name: '武器库模板办理渠道'},
        {param_type: 'ASNLTMP_CITY_NUM', param_name: '武器库模板城市编码'},
        {param_type: 'ASNLTMP_CHARGE_WAY', param_name: '武器库模板收费方式'},
        {param_type: 'ASNLTMP_BASE_CONSP_COUNT', param_name: '武器库模板保底消费账目编码'},
        {param_type: 'ASNLTMP_RELIZE_METHOD', param_name: '武器库模板实现方式'},
        {param_type: 'ASNLTMP_GIVE_TIME_TYPE', param_name: '武器库模板时长类别'},
        {param_type: 'ASNLTMP_STORE_PASSBOOK', param_name: '武器库模板预存话费存折'},
        {param_type: 'ASNLTMP_RULE_4G_TERMINAL', param_name: '武器库模板规则4G终端客户可办理'},
        {param_type: 'ASNLTMP_RULE_THREE_HIGH', param_name: '武器库模板规则3高用户可办理'},
        {param_type: 'ASNLTMP_RULE_OVERLAY_RELAT', param_name: '武器库模板规则叠加选项'},
        {param_type: 'ASNLTMP_RULE_REAL_NAME', param_name: '武器库模板规则实名选项'},
        {param_type: 'ASNLTMP_RULE_4G_CHANGECARD', param_name: '需求模板酬金需求模板类型'},
        {param_type: 'ASNLTMP_RULE_COLLECTION', param_name: '武器库模板规则托收用户限制'},
        {param_type: 'ASNLTMP_RULE_BRAND_LIMIT', param_name: '武器库模板规则品牌限制'},
        {param_type: 'ASNLTMP_RULE_DOWN_LEVEL', param_name: ''},
        {param_type: 'ASNLTMP_RULE_MUTEX_RELAT', param_name: '武器库模板规则互斥类型'},
        {param_type: 'ASNLTMP_RULE_4G_PACKAGE', param_name: '武器库模板规则4g套装限制'},
        {param_type: 'ASNLTMP_RULE_GROUP_UNIT', param_name: '武器库模板规则集团规则'},
        {param_type: 'ASNLTMP_RULE_NET_AGE', param_name: '武器库模板规则网络时间限制'},
        {param_type: 'ASNLTMP_RULE_MIN_PACKAGE', param_name: '武器库模板规则最小套餐'},
        {param_type: 'ASNLTMP_GIVE_BILL_PASSBOOK', param_name: '武器库模板赠送话费存折'},
        {param_type: 'ASNLTMP_RESULT_WAY', param_name: '武器库模板地址RESULT_WAY'},
        {param_type: 'ASNLTMP_AAT_DEPART', param_name: '武器库模板申请部门'},
        {param_type: 'ASNLTMP_PRICE', param_name: '器库模板价格选项'},
        {param_type: 'ASNLTMP_PRE_BILL', param_name: '武器库模板预存话费档次'},
        {param_type: 'ASNLTMP_CONTRACT_PERIOD', param_name: '武器库模板合约期'},
        {param_type: 'ASNLTMP_URGENT_LEVEL', param_name: '武器库模板优先级别'},
        {param_type: 'ASNLTMP_DEFAULT_SELECT', param_name: '是否选择器'},
        {param_type: 'ASNLTMP_ONLINE_STATE', param_name: '武器库模板上线状态'},
        {param_type: 'ASNLTMP_GIVE_TRAFFIC_TYPE', param_name: '武器库模板流量类别'},
        {param_type: 'ASNLTMP_EFFEC_WAY', param_name: '武器库模板生效方式'},
        {param_type: 'CHARGE_COLLECT', param_name: '武器库资费类模板月费收取方式'},
        {param_type: 'AUTONYM_IDENTIFY', param_name: '需求模板综合类在线公司实名认证'},
        {param_type: 'REQTMP_URGENT_LEVEL', param_name: '需求模板优先级别'},
        {param_type: 'REQTMP_RELIZE_METHOD', param_name: '需求模板实现方式'},
        {param_type: 'REQTMP_ART_REGION', param_name: '需求模板申请单位'},
        {param_type: 'REQTMP_UPLOAD_BUSIPAG', param_name: ''},
        {param_type: 'REQTMP_RESOURCE', param_name: '需求模板资源'},
        {param_type: 'REQTMP_ART_DEPART', param_name: '需求模板部门'},
        {param_type: 'ReqCustomerType', param_name: '需求模板客户类别'},
        {param_type: 'ACTIVATE_CHANNEL', param_name: '办理渠道'},
        {param_type: 'ELE_CHANNEL', param_name: '电渠需求模板电渠承载渠道'},
        {param_type: 'INVALID_WAY', param_name: '失效方式'},
        {param_type: 'DISPLAY_MODE', param_name: '展现模式'},
        {param_type: 'PURPOST', param_name: '主要目的'},
        {param_type: 'PRIOR_LEVEL', param_name: '需求优先级别'},
        {param_type: 'URGENT_LEVEL', param_name: '紧急程度'},
        {param_type: 'OBJ_TYPE', param_name: '需求对象类型'},
        {param_type: 'ORDER_STATUS', param_name: '工单状态'},
        {param_type: 'ORDER_TYPE', param_name: '工单类型'},
        {param_type: 'RD_TYPE', param_name: '工单类别'},
        {param_type: 'RELATE_TYPE', param_name: ''},
        {param_type: 'VP_FACTORY', param_name: '版本发布厂商'},
        {param_type: 'VP_TYPE', param_name: '版本发布类型'},
        {param_type: 'BASEDATA_ORGANIZE', param_name: '基础数据机构'},
        {param_type: 'QUALITY_TAG', param_name: '质量'},
        {param_type: 'SIMPLEPARAM_MODIFY_TYPE', param_name: '简易参数修改类别'},
        {param_type: 'CMPLX_COEF', param_name: '联合系数'},
        {param_type: 'REQBIZTYPE', param_name: '需求业务类别'},
        {param_type: 'REQBUSITYPE', param_name: '需求业务类别'},
        {param_type: 'REQSCHE_RELATE_TYPE', param_name: ''},
        {param_type: 'ReqDevelopmentClass', param_name: '需求开发类型'},
        {param_type: 'ReqDevelopmentType', param_name: '需求开发类型'},
        {param_type: 'ReqConfigurationType', param_name: '需求配置类型'},
        {param_type: 'ReqDevType', param_name: '需求开发类型'},
        {param_type: 'REQDEVTRAIT', param_name: '需求开发特征'},
        {param_type: 'REQ_REWARD_TYPE', param_name: '需求模板酬金需求模板类型'},
        {param_type: 'REQ_TYPE', param_name: '需求类型'},
        {param_type: 'REQ_SOURCE', param_name: '需求来源'},
        {param_type: 'BUSI_TYPE', param_name: '业务特点'},
        {param_type: 'REQ_SOURCE_WL', param_name: '工作量来源'},
        {param_type: 'ReqStatus', param_name: '需求状态'},
        {param_type: 'REQVERTYPE', param_name: '需求版本类型'},
        {param_type: 'REQGRANULARITY', param_name: ''},
        {param_type: 'REQINTTEST', param_name: '需要业务集成测试'},
        {param_type: 'SYS_TAG', param_name: '系统标签'},
        {param_type: 'SUBSYS_TAG', param_name: '子系统'},
        {param_type: 'VERSION_TYPE', param_name: '需求版本类别特点'},
        {param_type: 'INFL_CHANNEL', param_name: '影响范围'},
        {param_type: 'IMPT_LEVEL', param_name: '需求重要性'},
        {param_type: 'CPX_TYPE', param_name: '需求复杂类型'},
        {param_type: 'REASOURCE_DEPART', param_name: '所属部门'},
        {param_type: 'CODING_TYPE', param_name: '需求开发特点类型'},
        {param_type: 'NOTPASS', param_name: '通过状态'},
        {param_type: 'ACRIVATE_TYPE', param_name: '活动类型'},
        {param_type: 'ATTACH_TYPE', param_name: '附件类型'},
        {param_type: 'GROUPREQSTATUS', param_name: '组需求状态'},
        {param_type: 'GROUPREQTASKTYPE', param_name: '组需求任务类别'},
        {param_type: 'GROUP_ATTACH_TYPE', param_name: '组附件类别'},
        {param_type: 'GROUPREQCUSTOMERTYPE', param_name: '组需求模板客户类别'},
        {param_type: 'DEFECT_STATE', param_name: '缺陷状态'},
        {param_type: 'DEFECTLEVEL', param_name: '缺陷级别'},
        {param_type: 'DEFECTALTERSTATUS', param_name: '缺陷修改状态'},
        {param_type: 'DEFECTREASONSORT', param_name: '缺陷原因'},
        {param_type: 'DEFECT_URGENT', param_name: '缺陷紧急程度'},
        {param_type: 'EFFECT_WAY', param_name: '生效方式'},
        {param_type: 'DATA_SHARE', param_name: '数据共享'},
        {param_type: 'ALM_LABEL_QUERY_TYPE', param_name: '标签查询类型'},
        {param_type: 'AFP_REFORM_MODE', param_name: '功能改造方式'},
        {param_type: 'AFP_FUNCTION_TYPE', param_name: '功能类型'},
        {param_type: 'AFP_COMPLEXITY', param_name: '功能复杂程度'},
        {param_type: 'AFP_NEED_IT', param_name: '功能涉及联调'},
        {param_type: 'ONLINE_MARK', param_name: '上线标记'},
        {param_type: 'TEMPLATE_TYPE', param_name: '导出模板类型'},
        {param_type: 'REASOURCE_CLASS', param_name: '资源类别'},
        {param_type: 'MARKET_RESOURCE', param_name: '营销资源'},
        {param_type: 'CHARGE_VALID', param_name: '2050'},
        {param_type: 'COMMON_YEAR', param_name: '年选项'},
        {param_type: 'AWB_YEAR', param_name: '年选项'},
        {param_type: 'AWB_QUARTER', param_name: '季度选项'},
        {param_type: 'COMMON_MONTH', param_name: '月份'},
        {param_type: 'WORKFLOW_TYPE', param_name: '流程类别'},
        {param_type: 'SATISFY_TAG', param_name: '满意度'},
        {param_type: 'UES_TYPE', param_name: '使用范围类型'},
        {param_type: 'MONITOR_REQ', param_name: '监控需求'},
        {param_type: 'ERROR_MESSAGE_STATE', param_name: '错误类型'},
        {param_type: 'BizChangeType', param_name: '业务变更类型'},
        {param_type: 'CHANGE_RESULT', param_name: '变更结果'},
        {param_type: 'CHANGE_STATE', param_name: '变更状态'},
        {param_type: 'VERIFY_RESULT', param_name: '验证结果'},
        {param_type: 'ONLNE_RESULT', param_name: '上线结果'},
        {param_type: 'REALDEFECT', param_name: '是否缺陷'},
        {param_type: 'ReqType', param_name: ''},
        {param_type: 'SERTY_LEVEL', param_name: ''},
        {param_type: 'Msg_ReqType', param_name: ''},
        {param_type: 'COMP_COEF', param_name: ''},
        {param_type: 'ExpReqType', param_name: ''},
        {param_type: 'GRADE_STATE', param_name: ''},
        {param_type: 'GRADE_SCORE_TWO', param_name: ''},
        {param_type: 'GRADE_SCORE_ONE', param_name: ''},
        {param_type: 'ExpType', param_name: ''},
        {param_type: 'BizType', param_name: ''}
    ]
};
