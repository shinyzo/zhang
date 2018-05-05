<div class="easyui-layout" id="creatMain" style="width:580px;height:300px;">
    <div data-options="region:'west',title:'组织树',split:true" style="width:220px" >
        <ul id="organizationAddTree">

        </ul>
    </div>
    <div data-options="region:'center',title:'添加组织'" >
        <form id="createForm" method="post">

            <table class="tab3" >
                <tr style="display:none">
                    <td></td> <td><input type="hidden" name="pid" id="fm_pid" value="0" readonly="readonly" class="easyui-textbox" /></td>
                </tr>
                <tr>
                    <td>父级组织：</td>
                    <td><input type="text" name="pname" id="fm_pname" value="根节点" readonly="readonly" class="easyui-textbox" /></td>
                </tr>
                <tr>
                    <td>组织名称：</td>
                    <td><input type="text" name="name" id="fm_name" class="easyui-textbox" /></td>
                </tr>

                <tr>
                    <td>描述：</td>
                    <td><input type="text" name="description"  class="easyui-textbox w172" /></td>
                </tr>

            </table>

        </form>


    </div>
</div>


<script type="text/javascript">
    var url = BASE_PATH + "/manage/organization/tree";
    $(function(){
        $('#organizationAddTree').tree({
            url: url,
            method: 'get',
//            checkbox:true,
            lines:true,
            onSelect: function(node){
                    $("#fm_pid").textbox('setValue',node.id);
                    $("#fm_pname").textbox('setValue',node.text);
            }
        });

        $("#fm_name").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入组织名称！",
            invalidMessage:'组织名称须在2-40位之间！'
        })

    })


</script>