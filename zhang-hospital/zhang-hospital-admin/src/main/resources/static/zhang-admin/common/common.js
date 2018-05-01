
function alert(msg)
{
	$.messager.alert('提示信息',msg,'info');
}

function show(msg)
{
	$.messager.show({title:'提示信息',msg:msg});
}

function error(msg)
{
	$.messager.alert('错误信息',msg,'error');
}



/**
 * 校验字符长度
 * @param str
 * @param min
 * @param max
 * @return
 */
function checkLength( str, minLen, maxLen )
{
    if (str.length <= maxLen && str.length >= minLen )
    {
        return true;
    }
    return false;
}

/**
 * 正则校验匹配
 * @param str
 * @param regexp
 * @return
 */
function checkRegexp( str, regexp) {
    if ( !( regexp.test( str) ) )
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * 校验是否相等
 * @param str1
 * @param str2
 * @return
 */
function checkEquals(str1,str2)
{
    if(str1 == str2)
    {
        return true;
    }
    return false;
}

/**
 * 校验是否为空
 * @param str
 * @return
 */
function checkNull(str)
{
    if(str=="" || str.length==0 || str==null || str=="null" || str=="undefined")
    {
        return true;
    }
    return false;
}

/**
 * 刷新验证码
 * @param o
 * @return
 */
function refreshVercode(obj)
{
    obj.src=obj.src+"?"+Math.random();
}


/**
 * 格式化日期
 * @param date
 * @return
 */
function formatterDate(date)
{
    var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"+ (date.getMonth() + 1);
    return date.getFullYear() + '-' + month + '-' + day;
};


/**
 *
 * @param date
 * @return
 */
function formatterTime(date)
{
    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();

    month = (month + 1) > 9 ? (month + 1) : "0"+ (month + 1);

    return year + '-' + month + '-' + day+" "+hour+":"+minute+":"+seconds;
}


function formateStartTime()
{
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    month = (month + 1) > 9 ? (month + 1) : "0"+ (month + 1);
    return year + '-' + month + '-' + day+" 00:00:00";

}

function formateEndTime()
{
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    month = (month + 1) > 9 ? (month + 1) : "0"+ (month + 1);
    return year + '-' + month + '-' + day+" 23:59:59";
}

/**
 * get传参参数整合
 * @param obj
 * @return
 */
function params2get(obj)
{
    var paramStr = "";
    var i=0;
    for(var key in obj)
    {
        if(i==0){
            paramStr += "?"+key+"="+obj[key];
        }
        else{
            paramStr += "&"+key+"="+obj[key];
        }
        i++;
    }
    return paramStr;
}



/**
 * 指定位置字符替换成*
 * @param str
 * @param begin
 * @param end
 * @param char
 * @return
 */
function mask(str,begin,count,char)
{

    var length = str.length;

    if(length<=begin)
    {
        return str;
    }

    if(length>begin && length<=begin+count)
    {
        var fstStr = str.substring(0,begin);
        var temp = "";
        for(var i =0;i<begin+count-length;i++)
        {
            temp += char;
        }
        return fstStr+temp;
    }


    var fstStr = str.substring(0,begin);
    var lstStr = str.substring(begin+count,length);
    var temp = "";
    for(var i =0;i<count;i++)
    {
        temp += char;

    }
    return fstStr+temp+lstStr;
}



function addOrUpdateTokenid(url)
{
    var token = getTokenid();
    var tokenparam = TOKEN + "="+token;

    if(url=="") return tokenparam;

    if(url.indexOf(TOKEN+"=")>-1)
    {
        url = url.substring(0,url.indexOf(TOKEN+"="));
        url += tokenparam;
    }
    else
    {
        if(url.indexOf('?')>-1)
        {
            url += "&"+tokenparam;
        }
        else
        {
            url += "?"+tokenparam;
        }
    }

    return url;
}

function checkIE(){

    if (document.all||!!window.ActiveXObject){  //判断是否是IE内核
        window.open('inventoryCableList.jsp','_self');
    }else{
        window.open('platform/inventory/inventoryCableList.jsp','_self');
    }
}


function PreviewImage(fileObj,imgPreviewId,divPreviewId){
    var allowExtention=".jpg,.bmp,.gif,.png";//允许上传文件的后缀名document.getElementById("hfAllowPicSuffix").value;
    var extention=fileObj.value.substring(fileObj.value.lastIndexOf(".")+1).toLowerCase();
    var browserVersion= window.navigator.userAgent.toUpperCase();
    if(allowExtention.indexOf(extention)>-1){
        if(fileObj.files){//HTML5实现预览，兼容chrome、火狐7+等
            if(window.FileReader){
                var reader = new FileReader();
                reader.onload = function(e){
                    document.getElementById(imgPreviewId).setAttribute("src",e.target.result);
                }
                reader.readAsDataURL(fileObj.files[0]);
            }else if(browserVersion.indexOf("SAFARI")>-1){
                alert("不支持Safari6.0以下浏览器的图片预览!");
            }
        }else if (browserVersion.indexOf("MSIE")>-1){
            if(browserVersion.indexOf("MSIE 6")>-1){//ie6
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
            }else{//ie[7-9]
                fileObj.select();
                if(browserVersion.indexOf("MSIE 9")>-1)
                    fileObj.blur();//不加上document.selection.createRange().text在ie9会拒绝访问
                var newPreview =document.getElementById(divPreviewId+"New");
                if(newPreview==null){
                    newPreview =document.createElement("div");
                    newPreview.setAttribute("id",divPreviewId+"New");
                    newPreview.style.width = document.getElementById(imgPreviewId).width+"px";
                    newPreview.style.height = document.getElementById(imgPreviewId).height+"px";
                    newPreview.style.border="solid 1px #d2e2e2";
                }
                newPreview.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale',src='" + document.selection.createRange().text + "')";
                var tempDivPreview=document.getElementById(divPreviewId);
                tempDivPreview.parentNode.insertBefore(newPreview,tempDivPreview);
                tempDivPreview.style.display="none";
            }
        }else if(browserVersion.indexOf("FIREFOX")>-1){//firefox
            var firefoxVersion= parseFloat(browserVersion.toLowerCase().match(/firefox\/([\d.]+)/)[1]);
            if(firefoxVersion<7){//firefox7以下版本
                document.getElementById(imgPreviewId).setAttribute("src",fileObj.files[0].getAsDataURL());
            }else{//firefox7.0+
                document.getElementById(imgPreviewId).setAttribute("src",window.URL.createObjectURL(fileObj.files[0]));
            }
        }else{
            document.getElementById(imgPreviewId).setAttribute("src",fileObj.value);
        }
    }else{
        alert("仅支持"+allowExtention+"为后缀名的文件!");
        fileObj.value="";//清空选中文件
        if(browserVersion.indexOf("MSIE")>-1){
            fileObj.select();
            document.selection.clear();
        }
        fileObj.outerHTML=fileObj.outerHTML;
    }
}




