package com.lming.zhang.hospital.rpc.api;

import com.lming.zhang.common.base.BaseServiceMock;
import com.lming.zhang.hospital.dao.mapper.ChcSubjectMapper;
import com.lming.zhang.hospital.dao.model.ChcSubject;
import com.lming.zhang.hospital.dao.model.ChcSubjectExample;

/**
* 降级实现ChcSubjectService接口
* Created by zhanglm on 2018/4/19.
*/
public class ChcSubjectServiceMock extends BaseServiceMock<ChcSubjectMapper, ChcSubject, ChcSubjectExample> implements ChcSubjectService {

}
