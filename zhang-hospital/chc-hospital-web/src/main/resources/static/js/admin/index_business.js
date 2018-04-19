
$(document).ready(function(){
	initTab();
	initBgIndex();
	document.onkeydown = rewriteKeydown;//重写键盘事件，防止退格退回到登陆页

});


//重写键盘事件，防止退格退回到登陆页
function rewriteKeydown(e) {
    var code;   
    if (!e) var e = window.event;   
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;   
    if (((event.keyCode == 8) &&                                                    //BackSpace    
         ((event.srcElement.type != "text" &&    
         event.srcElement.type != "textarea" &&    
         event.srcElement.type != "password") ||    
         event.srcElement.readOnly == true))) 
    {
        event.keyCode = 0;    
        event.returnValue = false;
    }
    //alert(e.keyCode);
    return true;   
}




//tab初始化
function initTab(){ 
	$('#tab_area').tabs({
		fit:true,
		border:false,
	    onSelect:function(title){
 			updateTab(title,true);	
	    } 		
	});
}
//初始化后台页面 bgIndex
function initBgIndex(){
	//var url=ctx+"/SysLogin!initBgIndex.do";
	//url = '';
	addTab('首页',HOME_URL,false);
}


/**
 * 在tab_area区域添加多个选项卡
 */
function addTab(title,url,closable)
{
	if ($('#tab_area').tabs('exists', title))
	{    
        $('#tab_area').tabs('select', title);    
    }
	else
	{
		 url = addOrUpdateTokenid(url);
        $('#tab_area').tabs('add',{
        	iframeUrl: url,
            title:title,       
            closable:closable
        })
    }    
}



//更新tab
function updateTab(title,closable){
	var tabArea = $('#tab_area');
	var isExist = tabArea.tabs('exists',title);//tab是否已存在
	if(isExist){
	    var tab = $('#tab_area').tabs('getTab', title);
	    var url = tab.panel('options').iframeUrl;
	    
	    url = addOrUpdateTokenid(url);
	    
	    var content = '<iframe scrolling="auto" src="'+url+'" frameborder="0" style="width:100%;height:100%;"></iframe>';
		$('#tab_area').tabs('update', {
			tab: tab,
			options:{
				title:title,
				closable:closable,
				content:content
			}
		});		
	}
}



/**
 * 关闭当前操作的tab
 * @return
 */
function closeCurrentTab()
{
	var tab = $('#tab_area').tabs('getSelected');
	var index = $('#tab_area').tabs('getTabIndex',tab);
	$('#tab_area').tabs('close',index);
}

/**
 * 刷新当前tab
 * @return
 */
function refreshTab()
{	
	var currTab =  self.parent.$('#tab_area').tabs('getSelected'); //获得当前tab
    var url = $(currTab.panel('options').content).attr('src');
    url = addOrUpdateTokenid(url);
    self.parent.$('#tab_area').tabs('update', {
    	tab : currTab,
    	options : {
    		href:url
      	}
    });
}

//关闭tab
function closeTab(title){
	var tabArea = $('#tab_area');
	tabArea.tabs('close', title);
} 		

//退出系统
function logout(){
	$.messager.confirm("安全退出",'确定要退出系统吗?',function(result){
		if(result)
		{
			logoutUrl = addOrUpdateTokenid(LOGOUT_URL);
			window.parent.location.href = logoutUrl;
			//window.open('logout.do','_self');  
		}
	})
}

