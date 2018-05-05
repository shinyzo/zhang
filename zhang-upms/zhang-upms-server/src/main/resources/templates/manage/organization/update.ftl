<div class="easyui-layout" id="updateMain" style="width:100%;height:100%;">
    <div data-options="region:'west',title:'组织树',split:true" style="width:220px" >
        <ul id="organizationUpdTree">

        </ul>
    </div>
    <div data-options="region:'center',title:'修改组织'" >
        <form id="updateForm" method="post">

            <table class="tab3" >
                <tr style="display:none">
                    <td></td> <td><input type="hidden" name="pid" id="fx_pid" value="${organization.pid!}" readonly="readonly" class="easyui-textbox" /></td>
                </tr>
                <tr>
                    <td>父级组织：</td>
                    <td><input type="text" name="pname" id="fx_pname" value="${organization.pid!}" readonly="readonly" class="easyui-textbox" /></td>
                </tr>
                <tr>
                    <td>组织名称：</td>
                    <td><input type="text" name="name" value="${organization.name!}" id="fx_name" class="easyui-textbox" /></td>
                </tr>

                <tr>
                    <td>描述：</td>
                    <td><input type="text" name="description" value="${organization.description!}"  class="easyui-textbox w172" /></td>
                </tr>

            </table>

        </form>


    </div>
</div>


<script type="text/javascript">
    var url = BASE_PATH + "/manage/organization/tree";
    $(function(){
        $('#organizationUpdTree').tree({
            url: url,
            method: 'get',
//            checkbox:true,
            lines:true,
            onSelect: function(node){
                $("#fx_pid").textbox('setValue',node.id);
                $("#fx_pname").textbox('setValue',node.text);
            }
        });

        $("#fx_name").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入组织名称！",
            invalidMessage:'组织名称须在2-40位之间！'
        })



    })


</script>