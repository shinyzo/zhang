// 查询URL
var queryUrl = "admin/corp/queryCorpAddress.do";

$(function(){
	// 隐藏其他组件
	$("#operBox").panel('close');
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
	$("#linkman").textbox({  
	    required: true, 
	    validType:'length[1,20]',
	    missingMessage:"请输入联系人姓名！",
	    invalidMessage:'联系人姓名在1-20个字符之间！'
	})
	
	$("#linkphone").textbox({  
	    required: true, 
	    validType:'length[1,20]',
	    missingMessage:"请输入联系人电话！",
	    invalidMessage:'联系人电话在1-20个字符之间！'
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
		  	{field:'id',title:'编号',width:15,align:'left',sortable:true},
		  	{field:'linkman',title:'收货人',width:20,align:'left',sortable:true},
		  	{field:'linkphone',title:'联系电话',width:20,align:'left',sortable:true},
		  	{field:'corpaddress',title:'收货地址',width:20,align:'left',sortable:true},
		  	{field:'lng',title:'经度值',width:20,align:'left',sortable:true},
		  	{field:'lat',title:'维度值',width:20,align:'left',sortable:true},
		  	{field:'linkemail',title:'电子邮件',width:20,align:'left',sortable:true},
		  	{field:'fastcode',title:'传真',width:20,align:'left',sortable:true},
		  	{field:'isdefault',title:'是否默认地址',width:20,align:'left',sortable:true}
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
	default:
		alert('没有此操作类型对应的方法，请核查！');
		break;
	}
}
/**
 * 新增地址
 * @param title
 * @param righturl
 * @param rightid
 * @return
 */
function addData(title,righturl,rightid)
{

	$("#operfm").form('clear');
	$("#rightid").val(rightid);
	$("#righturl").val(righturl);
	$("#operBox").panel('open');
	
	// 百度地图API功能
	var map = new BMap.Map("l-map");
	map.centerAndZoom("海口",12);                   // 初始化地图,设置城市和地图级别。

	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
			{"input" : "corpaddress"
			,"location" : map
	});

	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		$("#searchResultPanel").html(str);
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		$("#searchResultPanel").html("onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue);
		
		setPlace();
	});

	function setPlace(){
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun(){
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			map.centerAndZoom(pp, 18);
		
			$("#lat").textbox('setValue',pp.lat);
			$("#lng").textbox('setValue',pp.lng);
			
			map.addOverlay(new BMap.Marker(pp));    //添加标注
		}
		var local = new BMap.LocalSearch(map, { //智能搜索
		  onSearchComplete: myFun
		});
		local.search(myValue);
		$("#corpaddress").textbox('setValue',myValue);
	}
}


function saveAddress(){
	
	var righturl = $("#righturl").val();
	var rightid = $("#rightid").val();
	var linkman = $("#linkman").val();
	var linkphone = $("#linkphone").val();
	var linkemail = $("#linkemail").val();
	var fastcode = $("#fastcode").val();
	var corpaddress = $("#corpaddress").val();
	var flooraddress = $("#flooraddress").val();
	var isdefault = $("#operfm input:radio:checked").val();
	var lat =  $("#lat").val();
	var lng =  $("#lng").val();

	isdefault = isdefault =="" ? "0" :"1";
	
	if( corpaddress=="")
	{
		alert("请输入省市县街道地址，并选择下拉框选中中的值！");
		return false;
		
	}
	
	if( lat=="" || lng=="")
	{
		alert("请选择省市县街道地址的下拉框值，经纬度会自动获取！");
		return false;
		
	}
	
	var data={};
	data['rightid'] = rightid;
	data['linkman'] = linkman;
	data['linkphone'] = linkphone;
	data['linkemail'] = linkemail;
	data['corpaddress'] = corpaddress+flooraddress;
	data['isdefault'] = isdefault;
	data['lat'] = lat;
	data['lng'] = lng;
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
				$("#operBox").panel('close');
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


function loadmap(val)
{	
	
	
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

	queryParams['tokenid'] = getTokenid();
	
	$("#dgBox").datagrid('options').queryParams = queryParams;
	$("#dgBox").datagrid('reload');
}
