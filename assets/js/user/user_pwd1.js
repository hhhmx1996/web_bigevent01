// 入口函数
$(function () {

    // 密码判定
    let form = layui.form
    form.verify({
        rew: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 判断新密码不能和旧密码一样
        samePwd: function (value) {
            let val = $('[name=oldPwd]').val();
            if (value === val) {
                return "新密码不能和原密码相同"
            }
        },
        // 判断确认新密码和新密码必须一样
        rePwd: function (value) {
            let val = $('[name=newPwd]').val();
            if (value != val) {
                return "确认新密码和新密码必须相同"
            }
        }
    });
    // 修改密码
    $('form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('恭喜您修改密码成功!')
                $('#form')[0].reset();
            }
        })
    })
})