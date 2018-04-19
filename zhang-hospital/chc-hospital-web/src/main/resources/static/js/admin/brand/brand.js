// 查询URL
var queryUrl = "admin/brand/query.do";

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();
	$("#helpBox").hide();
	$("#exportBox").hide();
	$("#importBox").hide();
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
	
	$("#helpBtn").click(function(){
		
			$("#helpBox").show();
			$("#helpBox").dialog({ 
			    title: "按钮操作及权限说明",    
			    iconCls:'icon-help',
			    width:550,
			    height:380,
			    closed: false,    
			    cache: false,   
			    modal: false,
			    resizable:true,
			    buttons:[{
					iconCls: 'icon-ok',
					text:'确定',
					handler: function(){	
			    	 $("#helpBox").dialog('close');
			    	}
				}]
		}); 
	})
});

function initValidateBox()
{
	
//	$("#fx_corptypeid").combobox({
//		required: true,
//		validType:"comboxValidate['fx_corptypeid']",
//		missingMessage:'请选择企业分类！',
//		invalidMessage:'请选择企业分类！',	
//	})

	
    $('#impfile').filebox({  
        required : true,  
        width : '300px',  
        multiple : true,  
        validType : ['fileSize[1024,"kb"]' ],  
        buttonText : '请选择',  
        buttonAlign : 'right',  
        prompt :'请选择一个.xls文件格式文件'
    });  
}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'brandid',title:'品牌编号',width:15,align:'left',sortable:true},
		  	{field:'letter',title:'检索首字母',width:20,align:'left',sortable:true},
		  	{field:'brandname',title:'品牌名称',width:15,align:'left',sortable:true},
		  	{field:'brandlogo',title:'品牌logo',width:20,align:'left',sortable:true}
	   		
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
	case '4':
		importBrand(title,righturl,rightid);
		break;
	case '5':
		exportBrand(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}


function importBrand(title,righturl,rightid){

		
	$("#importBox").show();
	$("#importBox").dialog({ 
	    title: title,    
	    width:420,
	    height:320,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-ok',
					text:'开始导入',
					handler: function(){	

		        		if($("#impform").form('validate'))
		        		{
		        			$("#impform").form('submit',{
		        				url:righturl,
		        				ajax:true,
		        				onSubmit:function(param){
		        					param.rightid = rightid;
		        					param.tokenid = getTokenid();
		        				},
		        				success:function(retData){
		        					var retData = eval('(' + retData + ')');  
		        					if(retData.retCode == successCode)
		        					{
		        						show(retData.retMsg);
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
		        				onLoadError:function(){
		        					error('系统错误,请稍后重试！');
		        				}
		        				
		        			})

		        		}

		        	

				 	}
		         },
		         {
						iconCls: 'icon-ok',
						text:'查看上次失败记录',
						handler: function(){	
			        	 	

					 	}
			     },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 $("#importBox").dialog('close');
			    	}
					 
		         }]
	});

	$("#importBox").window('center');
	
	
}


/**
 * 导出品牌
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function exportBrand(title,righturl,rightid){
	
 	var queryParams ={};
	queryParams['rightid']=rightid;
	queryParams['tokenid']=getTokenid();
		
	$("#exportBox").show();
	$("#exportBox").dialog({ 
	    title: title,    
	    width:400,
	    height:250,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-ok',
					text:'全量导出',
					handler: function(){	
		        	 	queryParams['exporttype']='1';
		        	 	righturl += params2get(queryParams);
		        	 	$("#exportBox").dialog("close");
		        	 	window.open(righturl); 

				 	}
		         },
		         {
					iconCls: 'icon-ok',
					text:'查询导出',
					handler: function(){

		        	 	queryParams['brandname'] = $('#brandname').val();
		        	 	queryParams['letter'] = $('#letter').combobox('getValue');
		        	 	queryParams['exporttype']='2';
		        		righturl += params2get(queryParams);
		        		$("#exportBox").dialog("close");
			        	window.open(righturl);
				 	}
			     },
		         {
					iconCls: 'icon-ok',
					text:'模板导出',
					handler: function(){	
			    	 	queryParams['exporttype']='3';
			    	 	righturl += params2get(queryParams);
			    	 	$("#exportBox").dialog("close");
			    	 	window.open(righturl);
				 	}
			     },
		         {
					iconCls: 'icon-cancel',
					text:'取消',
					handler: function(){	
			    	 $("#exportBox").dialog('close');
			    	}
					 
		         }]
	});
	
	
	$("#exportBox").window('center');
	
}



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

	var row = rows[0];

	var brandid = row.brandid;
	
	$("#operfm").form('load',row);
	

	$("#operBox").show();
	$("#operBox").dialog({ 
	    title: title,    
	    width:350,
	    height:220,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
					iconCls: 'icon-save',
					text:'修改保存',
					handler: function(){	
			    	 
		        	 	modifyDataSave(righturl,rightid,brandid);
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
 * 修改品牌保存
 * @param righturl
 * @param rightid
 * @param brandid
 * @return
 */
function modifyDataSave(righturl,rightid,brandid)
{
	
	var brandname = $("#fx_brandname").val();
	var brandlogo = $("#fx_brandlogo").val();
	//var letter = $("#fx_letter").val();
	
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	
	data['brandname']= brandname;
	data['brandlogo'] = brandlogo;
	//data['letter']   = letter;
	data['brandid']   = brandid;
	
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
 * 新增品牌
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
	    width:350,
	    height:220,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[
		         {
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

/**
 * 新增品牌
 * @param righturl
 * @param rightid
 * @return
 */
function addDataSave(righturl,rightid)
{
	
	var brandname = $("#fx_brandname").val();
	var brandlogo = $("#fx_brandlogo").val();
	//var letter = $("#fx_letter").val();
	
	var data={};
	data['tokenid']=getTokenid();
	data['rightid']= rightid;
	
	data['brandname']= brandname;
	data['brandlogo'] = brandlogo;
	//data['letter']   = letter;
	
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

	queryParams['brandname'] = $('#brandname').val();
	queryParams['letter'] = $('#letter').combobox('getValue');
	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
}
