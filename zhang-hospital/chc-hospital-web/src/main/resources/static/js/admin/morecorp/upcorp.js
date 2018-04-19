// 查询URL
var queryUrl = "admin/morecorp/upquery.do";

$(function(){
	// 隐藏其他组件
	$("#operBox").hide();
	$("#helpBox").hide();
	$("#corpdetailBox").hide();
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
		singleSelect:true,     // 只能选中单行
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

	
	$("#corptypeid").combobox({
		url:'public/getcorptype.json',
		valueField:'corptypeid',
		textField:'corptypename',
		loadFilter:function(data){
			return [{corptypename:'--请选择企业类别--',corptypeid:0,selected:"true"}].concat(data)
		}
	})
	
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
	
}



/**
 * 加载数据表格列表项
 * @return
 */
function getColumnsOpt()
{
	var opt = 
		[[
		  	{field:'corpid',title:'企业账号',width:15,align:'left',sortable:true},
	   		{field:'corptypeid',title:'企业类型id',width:15,align:'left',sortable:true,hidden:true},
		  	{field:'corpname',title:'企业名称',width:20,align:'left',sortable:true},
	   		{field:'corptypename',title:'企业类型',width:15,align:'left',sortable:true},
		  	{field:'organizationcode',title:'组织机构代码证',width:20,align:'left',sortable:true},
	   		{field:'businesslicencecode',title:'营业执照号',width:20,align:'left',sortable:true},
	   		{field:'taxregistrationcode',title:'税务登记证',width:20,align:'left',sortable:true},
	   		{field:'artificialname',title:'法人姓名',width:20,align:'left',sortable:true},
	   		{field:'artificialidcard',title:'身份证号',width:20,align:'left',sortable:true,hidden:true},	
	   		{field:'corpphone',title:'联系电话',width:15,align:'left',sortable:false},
	   		{field:'corpaddress',title:'地址',width:25,align:'left',sortable:true},
	   		{field:'applystatus',title:'申请状态',width:20,align:'left',sortable:true,formatter:formateUpcorpApplyStatus},
	   		{field:'corpshop',title:'企业商城',width:30,align:'left',sortable:true,formatter:formateCorpShop}	
	   		
	   	]];
	   	return opt;
}


function formateCorpShop(index,row)
{
	var baseurl = $("#baseurl").val();
	var shopurl = baseurl + "shop/indexshop.do?tcorpid="+row.corpid+"&tokenid="+getTokenid();
	return "<a href='"+shopurl+"' target='_blank'>进入企业商城</a>";
}

function goshop(tcorpid)
{
	



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
		showcorpdetail(title,righturl,rightid);
		break;
	case '2':
		applyMorecorp(title,righturl,rightid);
		break;
	case '3':
		addOrder(title,righturl,rightid);
		break;
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}



// 展示商户详情
function showcorpdetail(title,righturl,rightid)
{

	var rows = $('#dgBox').datagrid('getSelections');
	if(rows.length <= 0)
	{
		alert("请选择需要操作的记录！");
		return false;
	}
	if(rows.length > 1)
	{
		alert("只允许操作一条记录！");
		return false;
	}
	
	$("#detailfm").form('load',rows[0]);
	
	$("#corpdetailBox").dialog({
		  title: title,    
		    width:640,
		    height:460,
		    closed: false,    
		    cache: false,   
		    modal: true,
		    resizable:true,
		    buttons:[{
				iconCls: 'icon-ok',
				text:'确定',
				handler: function(){	
		    	 $("#corpdetailBox").dialog('close');
		    	}
			}]
		
	})
	$("#corpdetailBox").show();
	$("#corpdetailBox").window('center');
	
	

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
	queryParams['corpname'] = $("#corpname").val();
	queryParams['corpid'] = $("#corpid").val();
	var corptypeid = $("#corptypeid").combobox('getValue');
	if(corptypeid=="") corptypeid = 0;
	queryParams['corptypeid']= corptypeid;
	queryParams['tokenid'] = getTokenid();
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}

// 重置查询表单
function clearForm()
{
	$("#queryfm").form('clear');
	$("#corptypeid").combobox('reload');
}
