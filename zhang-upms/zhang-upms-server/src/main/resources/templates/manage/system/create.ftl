<div id="createMain">
    <form id="createForm" method="post">
        <table class="tab3" >
            <tr>
                <td>系统名称：</td>
                <td><input type="text" name="title" id="fx_title" class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>主题颜色：</td>
                <td><input type="text" name="theme" class="easyui-textbox" /></td>
            </tr>

            <tr>
                <td>Banner：</td>
                <td><input type="text" name="banner"  class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>ICON：</td>
                <td><input type="text" name="icon" class="easyui-textbox" /></td>
            </tr>

            <tr>
                <td>appId：</td>
                <td colspan="4"><input type="text" name="name" id="fx_name" class="easyui-textbox w300" /> (配置文件中zhang.upms.appId)</td>
            </tr>

            <tr>
                <td>basepath：</td>
                <td colspan="4"><input type="text" name="basepath" class="easyui-textbox w400" /> (项目访问路径)</td>
            </tr>



            <tr>
                <td>描述：</td>
                <td colspan="4"><input type="text" name="description" class="easyui-textbox w400" /></td>
            </tr>
            <tr>
                <td>状态：</td>
                <td><input type="radio" checked="checked" name="status" value="1" /> 开启<input type="radio"  value="0" name="status" /> 关闭 </td>
            </tr>
        </table>

    </form>
</div>
<script type="text/javascript">
    $(function(){

        $("#fx_title").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入系统标题！",
            invalidMessage:'系统标题须在2-40位之间！'
        })
        $("#fx_name").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入appId！",
            invalidMessage:'appId须在2-40位之间,且只允许英文字母与-！'
        })

        $("#fx_basepath").textbox({
            required: true,
            validType: 'length[2,200]',
            missingMessage:"请输入项目访问路径！",
            invalidMessage:'项目访问路径须在2-200未之间！'
        })
    })

</script>