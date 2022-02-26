// 入口函数
$(function () {
    let form = layui.form
    let layer = layui.layer
    initCate();
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // 成功的话渲染页面
                let str = template('cpl-cate', { data: res.data });
                $('[name = cate_id]').html(str);
                // 在layui里面还要重新渲染一下
                form.render()
            }
        })
    };
    // 富文本
    initEditor();
    // 图片
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);


    //  4  选择图片
    $('#btuaaa').on('click', function () {
        $('#fileaaa').click()
    });

    //  5 选择文件  同步修改图片预览区
    $('#fileaaa').on('change', function (e) {
        var file = e.target.files[0]
        // 判断用户是否选择了文件
        if (file == undefined) {
            return layer.msg('您可以选择一张图片作为文章封面')
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(file)
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 6  设置状态
    let state = '';
    $("#btnSeve1").on('click', function () {
        state = "已发布"
    })
    $("#btnSeve2").on('click', function () {
        state = "草稿"
    })

    // 7  文章发布
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData(this);
        // 添加参数
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // console.log(...fd);
                publishArticle(fd);
            })

    });


    // 定义文章发布函数
    function publishArticle(fd) {
        // 发送ajax
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您上传文章成功')
                // 跳转页面
                //location.href = '/code/article/art_list.html'
                setTimeout(function () {
                    window.parent.document.getElementById('art_list').click();
                }, 50)
            }
        })
    }

})