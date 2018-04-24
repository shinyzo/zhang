$(function(){
	
	var thumbnailWidth = 140;
	var thumbnailHeight = 140;
	var singleFileMaxSize = 10;
	
	var basepath = $("#basepath").val();
	var $list = $('#fileList');

	// 初始化Web Uploader
	var uploader = WebUploader.create({
	    // 选完文件后，是否自动上传。
	    auto: false,
	    // swf文件路径
	    swf:basepath +'/resources/js/framework/webuploader/Uploader.swf',
	    // 文件接收服务端。
	    server: '/admin/resource/addpicsave.do',

	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: '#filePicker',
	    threads:'5',        //同时运行5个线程传输
        fileNumLimit:'99',  //文件总数量只能选择10个 
        fileSingleSizeLimit: singleFileMaxSize*1024*1024,//限制大小10M，单文件
        quality: 60,
	    // 只允许选择图片文件。
	    accept: {
	        title: 'Images',
	        extensions: 'gif,jpg,jpeg,bmp,png',
	        mimeTypes: 'image/*'
	    }
	});
	
  
	// 当有文件添加进来的时候
	uploader.on( 'fileQueued', function( file ) {
	    var $li = $(
	            '<div id="' + file.id + '" class="file-item thumbnail">' +
	                '<img>' +
	                '<div class="info">' + file.name + '</div>' +
	            '</div>'
	            ),
	        $img = $li.find('img');
	    // $list为容器jQuery实例
	    $list.append( $li );

	    // 创建缩略图
	    // 如果为非图片文件，可以不用调用此方法。
	    // thumbnailWidth x thumbnailHeight 为 100 x 100
	    uploader.makeThumb( file, function( error, src ) {
	        if ( error ) {
	            $img.replaceWith('<span>不能预览</span>');
	            return;
	        }

	        $img.attr( 'src', src );
	    }, thumbnailWidth, thumbnailHeight );
	    
	});

    uploader.on( 'uploadBeforeSend', function( block, data ) {  
        // block为分块数据。  
    	var rows = $("#dgBox").datagrid('getSelections');
    	var row = rows[0];
        // file为分块对应的file对象。  
        var file = block.file;  
        // 修改data可以控制发送哪些携带数据。  
        data.resourceid = row.resourceid;  
    });  
	// 文件上传过程中创建进度条实时显示。
	uploader.on( 'uploadProgress', function( file, percentage ) {
	    var $li = $( '#'+file.id ),
	        $percent = $li.find('.progress span');

	    // 避免重复创建
	    if ( !$percent.length ) {
	        $percent = $('<p class="progress"><span></span></p>')
	                .appendTo( $li )
	                .find('span');
	    }

	    $percent.css( 'width', percentage * 100 + '%' );
	    $.parser.parse();
	});

	// 文件上传成功，给item添加成功class, 用样式标记上传成功。
	uploader.on( 'uploadSuccess', function( file,response ) {
		if(response.retCode=="0000")
		{
			  $( '#'+file.id ).addClass('upload-state-done');
			    var $li = $( '#'+file.id ),
		        $error = $li.find('div.succ');

			    // 避免重复创建
			    if ( !$error.length ) {
			        $error = $('<div class="succ"></div>').appendTo( $li );
			    }
			    $error.text('上传成功');
		}
		else
		{
			var $li = $( '#'+file.id ),
	        $error = $li.find('div.error');

		    // 避免重复创建
		    if ( !$error.length ) {
		        $error = $('<div class="error"></div>').appendTo( $li );
		    }
		    $error.text('上传处理失败');
		}
	  
	});

	// 文件上传失败，显示上传出错。
	uploader.on( 'uploadError', function( file ) {
	    var $li = $( '#'+file.id ),
	        $error = $li.find('div.error');

	    // 避免重复创建
	    if ( !$error.length ) {
	        $error = $('<div class="error"></div>').appendTo( $li );
	    }
	    $error.text('上传失败');
	});

	// 完成上传完了，成功或者失败，先删除进度条。
	uploader.on( 'uploadComplete', function( file ) {
	    $( '#'+file.id ).find('.progress').remove();
	});
	
	$("#uploaderBtn").on( 'click', function() {  
	   
	    uploader.upload();  
	   
	});  

	
})