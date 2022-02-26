// 入口函数
$(function () {
    let form = layui.form
    form.verify({
        nickname: function (value) {
            let val = value.trim();
            if (val.length <= 3 || val.length > 8) {
                return '用户名需要在4~8位之间'
            }
        }
    });
    initUserBifo();
    let layer = layui.layer
    // 定义一个函数
    function initUserBifo() {
        $.ajax({
            // 跟type一样
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.massage)
                }
                // 获取成功后
                // 通过layui的表单取值来获取和渲染到页面
                form.val("formuserbifo", res.data);
            }
        })
    };
    // 点击重置按钮重置表单
    $('#btn').on('click', function (e) {
        // 取消默认事件
        e.preventDefault();
        // 重置新的内容
        initUserBifo();
    });

    // 提交功能
    $('.layui-form').on('submit', function (e) {
        // console.log(11111111111, this);
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.massage)
                }
                // 调用函数
                window.parent.getUserinfo();
            }
        })
    })

})