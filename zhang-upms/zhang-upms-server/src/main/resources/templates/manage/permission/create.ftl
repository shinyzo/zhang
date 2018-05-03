<div class="easyui-layout" style="width:780px;height:380px;">
    <div data-options="region:'west',title:'系统权限树',split:true" style="width:220px" >
            <ul class="easyui-tree" id="permissionTree">

            </ul>
    </div>
    <div data-options="region:'center',title:'添加权限'" >
        <form id="createForm" method="post">
            <table class="tab3" >
                <tr>
                    <td>系统ID：</td>
                    <td><input type="text" name="systemId" id="fx_systemid" value="1" readonly="readonly" class="easyui-textbox" /></td>
                    <td width="10px"></td>
                    <td>父级菜单：</td>
                    <td><input type="text" name="pid" id="fx_pid" value="0" readonly="readonly" class="easyui-textbox" /></td>
                </tr>

                <tr>
                    <td>权限名称：</td>
                    <td><input type="text" name="name" id="fx_name" class="easyui-textbox" /></td>
                    <td width="10px"></td>
                    <td>icon：</td>
                    <td><input type="text" name="name"  class="easyui-textbox" /></td>
                </tr>
                <tr>
                    <td>菜单类型：</td>
                    <td>
                        <input type="radio" checked="checked" name="type" value="0"  />菜单
                        <input type="radio" name="type" value="1"  />按钮
                    </td>
                </tr>
                <tr>
                    <td>操作方法：</td>
                    <td colspan="4"><input type="text" name="opertype" class="easyui-textbox w172" /> (仅按钮需要设置，与前端JS匹配)</td>
                </tr>

                <tr>
                    <td>请求uri：</td>
                    <td colspan="4"><input type="text" name="uri" id="fx_uri" class="easyui-textbox w172" /> (与后台Mapping匹配)</td>
                </tr>
                <tr>
                    <td>权限值：</td>
                    <td colspan="4"><input type="text" name="permissionValue"  class="easyui-textbox w172" /> (采用a:b:c)</td>
                </tr>


                <tr>
                    <td>状态：</td>
                    <td>
                        <input type="radio" name="status" checked="checked" value="1"  />启用
                        <input type="radio" name="status" value="0"  />关闭
                    </td>
                </tr>

            </table>

        </form>


    </div>
</div>


<script type="text/javascript">
    var url = BASE_PATH + "/manage/permission/tree";
    $(function(){
        $('#permissionTree').tree({
            url: url,
            method: 'get',
//            checkbox:true,
            lines:true
        });

        $('#permissionTree').tree({
            onSelect: function(node){
                // alert(node.id);  // 在用户点击的时候提示

                if(node.attributes){
                    if($("#fx_systemid").val()==node.id)
                    {
                        return;
                    }
                    $("#fx_systemid").textbox('setValue',node.text);
                }
                else
                {
                    $("#fx_pid").textbox('setValue',node.text);
                }
                //alert(node.attributes.issystem);

            }
        });



    })


</script>