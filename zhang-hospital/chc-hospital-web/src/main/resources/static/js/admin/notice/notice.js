// 查询URL
var querySysnoticeUrl = "admin/notice/getsystemnotice.do";

$(function(){
	
	var data = {};
	data['tokenid']=getTokenid();
	$.ajax( {
		url:querySysnoticeUrl,
		async:false,
		type:"post",
		data:data,
		dataType:'json',
		success:function(jsondata){
			var jsonobj = eval(jsondata);
			
			var lihtml = "";
			var firstli ="";
			$.each(jsonobj,function(index,row){
				
				var indexseq = index +1;
				var opertime = row.opertime;
				if(row.level=="1")
				{
					firstli += "<li class='up'><span class='index'>"+indexseq+"、</span><span class='content'>"+row.title+"</span><span class='time'>"+parseTime(opertime)+"</span></li>";
					
				}
				else
				{
					lihtml += "<li ><span class='index'>"+indexseq+"、</span><span class='content'>"+row.title+"</span><span class='time'>"+parseTime(opertime)+"</span></li>";
				}
				
			})
			
			
			$("#systemnotice").html("").html(firstli+lihtml);
			
		},
		error:function(){
			error('系统错误,请稍后重试！');
		}
	});
	


});

