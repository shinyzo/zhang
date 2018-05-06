<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>

    <title>用户权限管理</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">

    <#include "/inc/header.ftl"/>
    <style>
        #permissionContainer{
           margin:10px 0 0 20px;
        }
        .permission{
            width:220px;
            float:left;

        }
        .title{
            height:30px;
            line-height:30px;
            pading:10px;
            font-size:13px;
            font-weight: bold;
            width:220px;
            color:#2aabd2;
        }
    </style>
</head>

<body>
<div id="permissionMain" class="easyui-panel" title="角色权限分配">
    <div>
        <table class="tab3">
            <tr>
                <td>用户ID：</td><td><input type="text" class="easyui-textbox" id="userId" value="${user.userId}"></td>
                <td>用户名：</td><td><input type="text" class="easyui-textbox" value="${user.username}"></td>
                <td width="20"></td>
                <td colspan="2"> <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="submitUserPermission()">保存</a></td>

            </tr>
        </table>
    </div>

    <div id="permissionContainer">

            <div class="permission">
                <span class="title">用户权限合集</span>
                <ul class="userPermission">
                </ul>
            </div>

            <div class="permission">
                <span class="title">用户加权限</span>
                <ul class="addPermission" >
                </ul>
            </div>

            <div class="permission">
                <span class="title">用户减权限（减 > 加）</span>
                <ul class="minusPermission" >
                </ul>
            </div>

    </div>


</div>

<#include "/inc/footer.ftl"/>
<script type="text/javascript">
    var url = BASE_PATH + "/manage/permission/user/"+${user.userId};
    $(function(){
        $('.userPermission').tree({
            url: url,
            method: 'get',
            checkbox:true,
            lines:true,
            cascadeCheck:false // 加载的时候不启用层叠选中
        });

        $('.addPermission').tree({
            url: url,
            queryParams:{"type":"1"},
            method: 'post',
            checkbox:true,
            lines:true,
            cascadeCheck:false // 加载的时候不启用层叠选中
        });

        $('.minusPermission').tree({
            url: url,
            queryParams:{"type":"-1"},
            method: 'post',
            checkbox:true,
            lines:true,
            cascadeCheck:false // 加载的时候不启用层叠选中
        });
    })


    function submitUserPermission(){

        var uri = BASE_PATH + "/manage/user/permission/"+$("#userId").textbox('getValue');

        var addNodes   = $(".addPermission").tree('getChecked', ['checked','indeterminate']);
        var minusNodes = $(".minusPermission").tree('getChecked', ['checked','indeterminate']);

        var addIds = new Array();
        var minusIds = new Array();
        $.each(addNodes,function(index,node){
            addIds.push(node.id);
        })
        $.each(minusNodes,function(index,node){
            minusIds.push(node.id);
        })

        var data = {};
        data['addids'] = addIds.join(',');
        data['minusids'] = minusIds.join(',');

        $.ajax({
            url : uri,
            data: data,
            type : 'POST',
            async: false,
            dataType : "json",
            success : function(result) {
                if(result.code == SUCCESS_CODE)
                {
                    show(result.msg);
                    parent.refreshTab();

                }else
                {
                    alert(result.msg);
                }

            }
        });
    }

</script>



</body>
</html>