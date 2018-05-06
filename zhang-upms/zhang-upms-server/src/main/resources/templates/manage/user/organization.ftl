<div class="easyui-layout" id="organizationMain" style="width:100%;height:100%;">
    <div data-options="region:'west',title:'组织树',split:true" style="width:220px" >
            <ul id="organizationTree">

            </ul>
    </div>
    <div data-options="region:'center',title:'用户信息'" >
        <form id="organizationForm" method="post">
            <table class="tab3" >

                <tr>
                    <td>用户id：</td>
                    <td><input type="text" name="userId" value="${user.userId}" readonly id="fx_userId" class="easyui-textbox" /></td>
                    <td width="10px"></td>
                    <td>用户名：</td>
                    <td><input type="text" name="username"  value="${user.username}" readonly  class="easyui-textbox" /></td>
                </tr>

            </table>

        </form>


    </div>
</div>

<script type="text/javascript">

    $(function(){
        var url = BASE_PATH + "/manage/organization/user/" + ${user.userId};
        $('#organizationTree').tree({
            url: url,
            method: 'get',
            checkbox:true,
            lines:true,
            cascadeCheck:false
        });
    })
</script>
