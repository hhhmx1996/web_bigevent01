// 入口函数
$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 需求二  效验登录表单的密码输入
    // console.log(layui.form);
    let form = layui.form;
    // form.verify   对象里面可以是对象  也可以是函数
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repword: function (value, index) {
            // 代表这个input的输入值
            // console.log(value);
            // 获取第一次输入密码的input的输入值
            // console.log($('.reg-box input[name = password]').val());
            let val = $('.reg-bo input[name = password]').val();
            // 两个输入值做比较
            if (value != val) {
                return "两次输入密码不一样请重新输入"
            }
        }
    });

    // 需求3  提交注册信息
    let layer = layui.layer
    $('#form-egd').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault();

        let val1 = $('.reg-box input[name = username]').val();
        let val = $('.reg-box input[name = password]').val();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: val1,
                password: val,
            },
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    // return alert(res.message);
                    return layer.msg(res.message, { icon: 3 });
                }
                layer.msg('恭喜你注册成功了', { icon: 6 });
                // 注册完毕  跳转到登录界面
                $('#link_login').click();
                // 清空表单   是dom方法  要转换成dom对象
                $('#form_reg')[0].reset()
            }
        });
    })

    // 需求4  提交登录信息
    $('#form_login').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault();
        console.log(1);

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                // 提示信息 保存token 跳转到后台
                layer.msg(res.message, { icon: 6 });
                // 本地 保存token
                localStorage.setItem('token', res.token);
                // 跳转到后台
                location.href = "/index.html";
            }
        });
    })

});