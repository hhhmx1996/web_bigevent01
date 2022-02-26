// 入口函数
$(function () {
    initArtCateList()
    // 定义一个函数  渲染页面  获取文章分类列表
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                const str = template('i', { data: res.data });
                $('tbody').html(str)
            }
        })
    };
    let indexadd = null
    let layer = layui.layer
    // 点击弹出框   添加类别部分
    $('#btnAdd').on('click', function () {
        indexadd = layer.open({
            type: 1,
            title: '在线调试',
            area: ['500px', '250px']
            , content: $('#dialog_add').html()
        });
    });

    // 立即提交部分
    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你添加成功了')
                // 清空form表单
                $('#form_add')[0].reset();
                // 关闭对话框
                layer.close(indexadd)
                // 重新渲染页面
                initArtCateList()
            }
        })
    });



    //  根据 Id 获取文章分类数据
    let form = layui.form
    let editAdd = null
    // 点击编辑页面
    $('tbody').on('click', ".but_edit", function () {
        // 弹出框
        editAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '在线调试'
            , content: $('#dialog_edit').html()
        });
        // 发送ajax获取数据
        let Id = $(this).attr('data-id');
        console.log(Id);
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 渲染到页面
                form.val('form_edit', res.data)
            }
        });
    });

    // 确认修改部分
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜你修改成功了')
                // 清空form表单
                // $('#form_edit')[0].reset();
                // 关闭对话框
                layer.close(editAdd)
                // 重新渲染页面
                initArtCateList()
            }
        })
    });

    // 删除  部分结构
    $('tbody').on('click', ".remout", function () {
        // console.log(1);
        let Id = $(this).attr('data-id');
        // 弹出提示框
        layer.confirm('确定要删除吗', { icon: 5, title: '提示' },
            function (index) {
                $.ajax({
                    type: "get",
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) {
                        if (res.status != 0) {
                            return layer.msg(res.message)
                        }
                        // 渲染到页面
                        layer.msg('恭喜你删除成功');
                        // 重新加载页面
                        initArtCateList()
                    }
                })
                //do something

                layer.close(index);
            });

    });
})