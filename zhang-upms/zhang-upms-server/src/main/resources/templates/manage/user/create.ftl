<div id="createMain">
    <form id="createForm" method="post">
        <table class="tab3" >
            <tr>
                <td>用户名：</td>
                <td><input type="text" name="username" id="fx_username" class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>密码：</td>
                <td><input type="password" name="password" id="fx_password" value="123456" class="easyui-textbox" /></td>
            </tr>

            <tr>
                <td>真实姓名：</td>
                <td><input type="text" name="realname"  class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>性别：</td>
                <td><input type="radio" checked="checked" name="sex" value="1" />男 <input type="radio"  value="0" name="sex" /> 女 </td>
            </tr>

            <tr>
                <td>联系电话：</td>
                <td><input type="text" name="phone" id="fx_phone" class="easyui-textbox" /></td>
                <td width="10px"></td>
                <td>邮箱地址：</td>
                <td><input type="text" name="email" id="fx_email" placeholder="xxxxx@xxx.com" class="easyui-textbox" /></td>
            </tr>

            <tr>
                <td>头像：</td>
                <td colspan="4"><input type="text" name="avatar" class="easyui-textbox w400" /></td>
            </tr>

            <tr>
                <td>账号状态：</td>
                <td><input type="radio" checked="checked" name="locked" value="0" /> 正常<input type="radio"  value="1" name="locked" /> 锁定 </td>
            </tr>
        </table>

    </form>
</div>
<script type="text/javascript">
    $(function(){

        $("#fx_username").textbox({
            required: true,
            validType: 'length[2,40]',
            missingMessage:"请输入用户名！",
            invalidMessage:'用户名须在2-40位之间！'
        })
        $("#fx_password").textbox({
            required: true,
            validType: 'length[6,40]',
            missingMessage:"请输入密码！",
            invalidMessage:'密码不小于6位，且需包含字母数字特殊符号的组合！'
        })

    })

</script>