// 查询URL
var queryUrl = "admin/product/query.do";
var exportTemplateUrl = "admin/product/exportproducttemplate.do";
var queryImportResultUrl="admin/product/queryimportresult.do";
var queryExportResultUrl="admin/product/queryexportresult.do";


$(function(){

	// 隐藏其他组件
	$("#helpBox").hide();
	$("#operBox").hide();
	$("#importBox").hide();
	$("#importResBox").hide();
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
	
	initLoadingData();
	
	
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
		
		$("#helpBox").window('center');
	})
	
	 $('#importfile').filebox({  
	        required : true,  
	        width : '300px',  
	        multiple : true,  
	        validType : ['fileSize[10240,"kb"]' ],  
	        buttonText : '选择文件',  
	        buttonAlign : 'right',  
	        prompt :'请选择一个.xls文件格式文件',
	        accept:'application/vnd.ms-excel'
	 });  
});


function initLoadingData()
{
	// 初始化加载数据
	$("#protypeid").combobox({
		url:'public/getprotype.json',
		valueField:'protypeid',
		textField:'protypename',
		loadFilter:function(data){
			return [{protypename:'--请选择产品类别--',protypeid:0,selected:"true"}].concat(data);
		}
	});
	
	$("#brandid").combobox({
		url:'public/getbrand.json',
		valueField:'brandid',
		textField:'brandname',
		loadFilter:function(data){
			return [{brandname:'--请选择品牌类别--',brandid:0,selected:"true"}].concat(data);
		}
	});
	


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
		yjupdateStatus(title,righturl,rightid,"0");
		break;
	case '5':
		yjupdateStatus(title,righturl,rightid,"1");
		break;
	case '6':
		importProduct(title,righturl,rightid);
		break;
	case '7':
		exportProduct(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}

function exportProduct(title,righturl,rightid)
{
	var queryParams = $("#dgBox").datagrid('options').queryParams;

	queryParams['productname'] = $('#productname').val();
	queryParams['productcode'] = $('#productcode').val();
	var protypeid = $('#protypeid').combobox('getValue');
	var brandid = $('#brandid').combobox('getValue');

	if(protypeid=="") protypeid =0 ;
	queryParams['protypeid'] =protypeid;	
	queryParams['brandid'] =brandid;	
	queryParams['productstatus'] =$('#productstatus').combobox('getValue');
	
	queryParams['tokenid'] = getTokenid();
	
	righturl += params2get(queryParams);
	
	window.open(righturl);



}


function importProduct(title,righturl,rightid)
{
	
	$("#importBox").show();
	$("#importBox").dialog({ 
	    title: title,    
	    iconCls:'icon-ok',
	    width:550,
	    height:380,
	    closed: false,    
	    cache: false,   
	    modal: false,
	    resizable:true,
	    buttons:[{
					iconCls: 'icon-ok',
					text:'导入模板下载',
					handler: function(){	
			    	 	
			    	 	window.open(exportTemplateUrl);
			    	}
				 }
		 		 ,  
	             {
					iconCls: 'icon-ok',
					text:'开始导入',
					handler: function(){	
				    	if($("#importfm").form('validate'))
			    		{
			    			$("#importfm").form('submit',{
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
			    						$("#dgBox").datagrid('reload');
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
					text:'查看导入结果',
					handler: function(){	
			    	 	
					    showImportResult();
					 
			    	}
				 }
				 ,
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


function showImportResult(){
	$("#importResBox").show();
	$("#importResBox").dialog({ 
	    title: "查看导入结果",    
	    width:1000,
	    height:440,
	    closed: false,    
	    cache: false,   
	    modal: true,
	    buttons:[{
					iconCls: 'icon-ok',
					text:'查询导出',
					handler: function(){	
		        	    var righturl = queryExportResultUrl;
		        	    var dealresult = $('#fx_dealresult').combobox('getValue');
		        	    righturl +="?dealresult="+dealresult;
		        	 	window.open(righturl); 
				 	}
		         },
		         {
					iconCls: 'icon-cancel',
					text:'关闭',
					handler: function(){	
		        	 
		        	 	$("#importResBox").dialog("close");

				 	}
		         }
	    ]
	});
	
	
	$("#importResBox").window('center');
	
	$("#importResDg").datagrid({  
		url:queryImportResultUrl,         //加载的URL
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
    	columns:getImpColumnsOpt(), // 列数据
    	sortName:'dealresult',
    	sortOrder:'ASC',
    	toolbar:'#resHeadBox',       // 工具栏
    	onLoadError : function() {
    		error('数据加载失败！');
    	}	
    });  
	
	 //设置分页控件 
	$('#importResDg').datagrid('getPager').pagination({ 
        beforePageText: '第',//页数文本框前显示的汉字 
        afterPageText: '页    共 {pages} 页', 
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    }); 
	
}

function yjupdateStatus(title,righturl,rightid,productstatus)
{
	var rows = $("#dgBox").datagrid('getSelections');
	
	if(rows.length<=0)
	{
		alert("请选择需要操作的记录！");
		return false;
		
	}
	
	var productArray = [];
	
	$.each(rows,function(index,row){
		
		productArray.push(row.productid);	
	})
	
	
	var data = {};
	data['rightid'] = rightid;
	data['tokenid'] = getTokenid();
	data['productidlist'] = productArray.join(',');
	data['productstatus'] = productstatus;
	
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
 * 新增商品
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{

	$("#fx_protypeid").combotree({
		url:'public/gettreeprotype.json',
		valueField:'protypeid',
		textField:'protypename',
		checkbox:true,
		lines:true,
		editable:false,
		required:true,
		onBeforeSelect:function(node){
			if(node.id=="0")
			{
				return false;
			}
		}
	});
	
	$("#fx_brandid").combobox({
		url:'public/getbrand.json',
		valueField:'brandid',
		textField:'brandname',
		editable:false,
		loadFilter:function(data){
			return [{brandname:'--请选择品牌类别--',brandid:0,selected:"true"}].concat(data);
		},
		onLoadSuccess: function () { //加载完成后,设置选中第一项  
            var val = $(this).combobox('getData');  
            for (var item in val[0]) {  
                if (item == 'brandid') {  
                    $(this).combobox('select', val[0][item]);  
                }  
            }  
        }  
	});
	
	$("#operfm").form('clear');

	$("#fx_productinprice").numberbox('setValue','0.00');
	$("#fx_productsaleprice").numberbox('setValue','0.01');
	$("#fx_productretailprice").numberbox('setValue','0.00');

	$("#operBox").show();
	$("#operBox").dialog({
		title:title,
		width:900,
		height:600,
	    modal: true,
	    closed: false,    
	    cache: false,   
		buttons:[{
				  iconCls: 'icon-ok',
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
	})

	$('#operBox').window('center');
	
}

function addDataSave(righturl,rightid)
{
	if($("#operfm").form('validate'))
	{
		
		$("#operfm").form('submit',{
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
					searchOrReload();
					$("#operBox").dialog('close');
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

/**
 * 添加图片
 * @param _this
 * @return
 */
function addPic(_this)
{
	var count = $("#picTable tr").length;
	if(count<=4)
	{
		var trObj  = $(_this).parent().parent();
		
		var html = $("#picTable").html()+$(trObj).html();
		
		$('#picTable').html(html)
	}
	else
	{	
		alert("最多只能上传5张图片！");
	}
}
/**
 * 移除图片
 * @param _this
 * @return
 */
function removePic(_this)
{
	var count = $("#picTable tr").length;
	if(count>1)
	{
		$(_this).parent().parent('tr').remove();
	}

}
/**
 * 添加属性
 * @param _this
 * @return
 */
function addAttr(_this)
{
	var count = $("#attrTable tr").length;
	if(count<=4)
	{
		var trObj  = $(_this).parent().parent();
		
		var html = $("#attrTable").html()+$(trObj).html();
		
		$('#attrTable').html(html)
	}
	else
	{
		
		alert("最多只能添加5个属性键值对！");
	}
}
/**
 * 移除属性
 * @param _this
 * @return
 */
function removeAttr(_this)
{
	var count = $("#attrTable tr").length;
	if(count>1)
	{
		$(_this).parent().parent('tr').remove();
	}

}
/**
 * 表单验证
 * @return
 */
function initValidateBox()
{
	
	$("#fx_protypeid").combobox({
		required: true,
		validType:"comboxValidate['fx_protypeid']",
		missingMessage:'请选择产品分类！',
		invalidMessage:'请选择产品分类！'
	})

	$("#fx_productname").textbox({  
	    required: true,    
	    validType: 'length[4,100]',
	    missingMessage:"请输入产品名称！",
	    invalidMessage:'产品名称须在4-100个字符！'
	})
	
	$("#fx_productinprice").textbox({  
	    required: true,    
	    validType: 'length[1,10]',
	    missingMessage:"请输入产品进价！",
	    invalidMessage:'产品进价须在1-10个字符！'
	})
	$("#fx_productsaleprice").textbox({  
	    required: true,    
	    validType: 'length[1,10]',
	    missingMessage:"请输入产品销售价格！",
	    invalidMessage:'产品销售价格须在1-10个字符！'
	})
	
	$("#fx_productretailprice").textbox({  
	    required: true,    
	    validType: 'length[1,10]',
	    missingMessage:"请输入产品建议零售价格！",
	    invalidMessage:'建议零售价格须在1-10个字符！'
	})
	
	$("#fx_productcode").textbox({  
	    required: true,    
	    validType: 'length[4,40]',
	    missingMessage:"请输入产品条码！",
	    invalidMessage:'产品条码须在4-40个字符！'
	})
	
	
}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'productid',title:'产品编号',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'indexsmallpic',title:'产品缩略图',width:20,align:'left',sortable:true,formatter:formatethumb},
		  	{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},	
	   		{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
	   		{field:'protypeid',title:'产品分类ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'protypename',title:'产品分类名称',width:20,align:'left',sortable:true},
	   		{field:'brandid',title:'产品品牌ID',width:20,align:'left',sortable:true,hidden:true},
	   		{field:'brandname',title:'产品品牌名称',width:20,align:'left',sortable:true},
	   		{field:'productinprice',title:'产品进价',width:20,align:'left',sortable:true},
	   		{field:'productsaleprice',title:'销售价格',width:20,align:'left',sortable:true}, 
	   		{field:'productretailprice',title:'建议零售价',width:20,align:'left',sortable:true},
	   		{field:'productstatus',title:'产品状态',width:20,align:'left',sortable:true,formatter:formatProductStatus},
	   		{field:'remark',title:'备注',width:20,align:'left',sortable:true}
	   		
	   	]];
	   	return opt;
}

function getImpColumnsOpt()
{
	var opt = 
		[[
		  	{field:'rowno',title:'行号',width:20,align:'left',sortable:true},
		  	{field:'firstprotype',title:'一级分类',width:20,align:'left',sortable:true},
		  	{field:'secndprotype',title:'二级分类',width:20,align:'left',sortable:true},
		  	{field:'productname',title:'产品名称',width:20,align:'left',sortable:true},	
	   		{field:'productcode',title:'产品条码',width:15,align:'left',sortable:true},
	   		{field:'productno',title:'产品编号',width:15,align:'left',sortable:true},
	   		{field:'productspec',title:'规格',width:15,align:'left',sortable:true},
	   		{field:'productinprice',title:'采购单价',width:20,align:'left',sortable:true},
	   		{field:'productsaleprice',title:'销售单价',width:20,align:'left',sortable:true}, 
	   		{field:'productretailprice',title:'零售价',width:20,align:'left',sortable:true},
	   		{field:'productstatus',title:'是否上架',width:20,align:'left',sortable:true,formatter:formatProductStatus},
	   		{field:'dealresult',title:'处理结果',width:20,align:'left',sortable:true,formatter:formatProductStatus},
	   		{field:'dealdesc',title:'描述',width:40,align:'left',sortable:true,formatter:formatProductStatus}

	   		
	   	]];
	   	return opt;
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

	queryParams['productname'] = $('#productname').val();
	queryParams['productcode'] = $('#productcode').val();
	var protypeid = $('#protypeid').combobox('getValue');
	var brandid = $('#brandid').combobox('getValue');

	if(protypeid=="") protypeid =0 ;
	queryParams['protypeid'] =protypeid;	
	queryParams['brandid'] =brandid;	
	queryParams['productstatus'] =$('#productstatus').combobox('getValue');
	
	queryParams['tokenid'] = getTokenid();
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

function searchOrReloadImp(){

	var queryParams = $("#importResDg").datagrid('options').queryParams;

	queryParams['dealresult'] = $('#fx_dealresult').combobox('getValue');
	
	queryParams['tokenid'] = getTokenid();
	$("#importResDg").datagrid('options').queryParams = queryParams;
	$("#importResDg").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
	$("#protypeid").combobox('reload');
	$("#brandid").combobox('reload');
}
