$(function(){
    //点击“去注册账号”链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登陆的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个叫做 pwd 的校验规则
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],

        //校验两次密码是否一致的规则
        repwd: function(value){
            //通过形参拿到的是确认密码框的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败则return一个错误的提示消息
            var pwd = $('.reg-box input[name=password]').val()
            if(pwd !== value){
               return '两次密码不一致!'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit' ,function(e){
        //阻止默认的提交行为
        e.preventDefault()
        //发起ajax的Post请求
        var data = { username:$('#form_reg input[name=username]').val(), password: $('#form_reg input[name=password]').val()}
        $.post('/api/reguser',data, function(res){ 
            
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            // console.log('注册成功')
            // console.log('res.message')
            layer.msg('注册成功,请登录!')
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登陆表单的提交事件
    $('#form_login').submit(function(e){
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功!')

                //将登陆成功得到的token字符串，保存到 localStorage中

                localStorage.setItem('token',res.token)

                // console.log(res.token);
                //跳转到后台主页
                
                location.href = '/index.html'
            }
        })
    })
})

 