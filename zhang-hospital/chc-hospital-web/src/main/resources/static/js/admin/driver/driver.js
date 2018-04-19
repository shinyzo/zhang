// 查询URL
var queryUrl = "admin/driver/queryalldriver.do";

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();
	
	// 初始化加载数据
	$("#dgBox").datagrid({  
		url:queryUrl,         //加载的URL
    	isField:"fldId",
    	frozenColumns:[[{field:'ck',checkbox:true}]],  // 冻结列在左侧
    	queryParams:{"tokenid":getTokenid()},
    	striped:true,
		rownumbers:true,       // 显示行号
		remotesort: true,
		pagination:true,       // 显示分页
		singleSelect:false,     // 只能选中单行
		pageSize: pageSize,
		pageList:pageList,
		loadMsg:'数据加载中，请稍等...', 
    	fit:false,				 // 自适应大小，为true数据不展示
    	fitColumns:true,         //自动使列适应表格宽度以防止出现水平滚动
    	nowrap:true,             //超出列宽自动截取
    	columns:getColumnsOpt(), // 列数据
    	toolbar:'#headBox',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  

	 //设置分页控件 
	$('#dgBox').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
	// 初始化表单验证
	initValidateBox();
	
});

function initValidateBox()
{
	
//	$("#fx_corptypeid").combobox({
//		required: true,
//		validType:"comboxValidate['fx_corptypeid']",
//		missingMessage:'请选择企业分类！',
//		invalidMessage:'请选择企业分类！',	
//	})

}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'driverid',title:'司机id',width:15,align:'left',sortable:true},
		  	{field:'drivername',title:'司机姓名',width:15,align:'left',sortable:true},
		  	{field:'carno',title:'绑定车牌',width:15,align:'left',sortable:true},
		  	{field:'driverno',title:'证件编号',width:15,align:'left',sortable:true},
		  	{field:'driverlevel',title:'驾照级别',width:15,align:'left',sortable:true},
		  	{field:'driverstartdate',title:'证件开始日期',width:15,align:'left',sortable:true},
		  	{field:'validyear',title:'证件有效年',width:15,align:'left',sortable:true},
		  	{field:'sex',title:'性别',width:15,align:'left',sortable:true},
		  	{field:'idcardno',title:'身份证号',width:15,align:'left',sortable:true,formatter:formateIdcardno},
		  	{field:'birthday',title:'出生年月日',width:15,align:'left',sortable:true,formatter:formateBirthday},
		  	{field:'driverphone',title:'联系电话',width:15,align:'left',sortable:true},
			{field:'familyaddress',title:'家庭住址',width:15,align:'left',sortable:true},
		  	
		  	{field:'driverstatus',title:'司机状态',width:15,align:'left',sortable:true}
	   		
	   	]];
	   	return opt;
}



/**
 * 按钮操作
 * @param title
 * @param opttype
 * @param righturl
 * @return
 */
function btnopt(opttype,title,righturl,rightid)
{
	switch (opttype) {
	case '1':
		addData(title,righturl,rightid);
		break;
	case '2':
		modifyData(title,righturl,rightid);
		break;
	case '3':
		deleteData(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}




/**
 * 修改车辆
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function modifyData(title,righturl,rightid)
{
	var rows = $("#dgBox").datagrid('getSelections');
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	
	if(rows.length>1)
	{
		alert("仅允许修改单条记录！");
		return false;
	}

	row = rows[0];
	$("#operfm").form('load',row);

	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:550,
	    height:450,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){	
	    	
	    			var driverid = row.driverid;
		    	 	modifyDataSave(righturl,rightid,driverid);
		    	 }
			    },
			    {
				 iconCls: 'icon-cancel',
				 text:'取消',
				 handler: function(){	
			    	$("#operBox").dialog('close');
			     }
		}]
	});
	
	$("#operBox").window('center');
	
}


/**
 * 修改车辆信息保存
 * @param righturl
 * @param rightid
 * @param customid
 * @return
 */
function modifyDataSave(righturl,rightid,driverid)
{

	var data = checkReturnData();
	data['rightid']=rightid;
	data['driverid'] = driverid;

	$.ajax( {
		url:righturl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				show(retData.retMsg);
				$("#operBox").dialog('close');
				searchOrReload();
			}
			else if(retData.retCode == loginTimeoutCode)
			{
				alert(retData.retMsg);
				top.location.href = loginUrl;
			}
			else
			{
				alert(retData.retMsg);
			}
		},
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});	

}


/**
 * 添加车辆
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{
	$("#operfm").form('clear');

	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:550,
	    height:450,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
				 iconCls: 'icon-save',
				 text:'保存',
				 handler: function(){			
		    	 	addDataSave(righturl,rightid);
		    	 }
			    },
			    {
				 iconCls: 'icon-cancel',
				 text:'取消',
				 handler: function(){	
			    	$("#operBox").dialog('close');
			     }
		}]
	}); 
	$("#operBox").window('center');
}

function checkReturnData()
{
	var data={};
	var drivername = $("#fx_drivername").val();
	var driverno = $("#fx_driverno").val();
	var driverlevel = $("#fx_driverlevel").combobox('getValue');
	var driverstartdate = $("#fx_driverstartdate").datebox('getValue');
	var validyear = $("#fx_validyear").val();
	var idcardno = $("#fx_idcardno").val();
	var sex = $('input:radio:checked').val();
	
	var driverphone = $("#fx_driverphone").val();
	var birthday = $("#fx_birthday").datebox('getValue');
	var driverstatus = $("#fx_driverstatus").combobox('getValue');
	var familyaddress = $("#fx_familyaddress").val();
	

	data['tokenid']=getTokenid();
	
	data['drivername']= drivername;
	data['driverno'] = driverno;
	data['driverlevel'] = driverlevel;
	data['driverstartdate'] = driverstartdate;
	data['validyear']= validyear;
	data['idcardno'] = idcardno;
	data['sex'] = sex;
	data['driverphone'] =driverphone;
	data['birthday'] = birthday;
	data['driverstatus'] = driverstatus;
	data['familyaddress'] = familyaddress;

	return data;

}

/**
 * 添加内部分销商保存
 * @return
 */
function addDataSave(righturl,rightid)
{

	var data = checkReturnData();
	data['rightid']=rightid;
	
	$.ajax( {
		url:righturl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(retData){
			if(retData.retCode == successCode)
			{
				show(retData.retMsg);
				$("#operBox").dialog('close');
				searchOrReload();
			}
			else if(retData.retCode == loginTimeoutCode)
			{
				alert(retData.retMsg);
				top.location.href = loginUrl;
			}
			else
			{
				alert(retData.retMsg);
			}
		},
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});	
	
}



/**
 * 查询或重新加载组件
 * @param goodCode
 * @param goodName
 * @param goodTypeName
 * @param goodState
 * @return
 */
function searchOrReload(){

	var queryParams = $("#dgBox").datagrid('options').queryParams;

	queryParams['drivername'] = $("#drivername").val();
	queryParams['driverno'] = $("#driverno").val();
	queryParams['idcardno'] = $("#idcardno").val();
	queryParams['driverlevel'] = $("#driverlevel").val();

	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
