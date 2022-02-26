// 入口函数
// $(function () {
//     // 1.1 获取裁剪区域的 DOM 元素
//     var $image = $('#image')
//     // 1.2 配置选项
//     const options = {
//         // 纵横比
//         aspectRatio: 1,
//         // 指定预览区域
//         preview: '.img-preview'
//     }

//     // 1.3 创建裁剪区域
//     $image.cropper(options)
// });
// $(document).ready(function () {
//     var $image = $('#image')
//     // 1.2 配置选项
//     const options = {
//         // 纵横比
//         aspectRatio: 1,
//         // 指定预览区域
//         preview: '.img-preview'
//     }

//     // 1.3 创建裁剪区域
//     $image.cropper(options)
// });
$(window).on('load', function () {
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 点击按钮弹出上传文件
    $('#but').on('click', function () {
        console.log(1);
        $('#file').click();
    });

    // 选择图片 修改图片
    $('#file').on('change', function (e) {
        // 1. 拿到用户选择的文件
        var file = e.target.files[0];
        // 非空校验
        if (file == undefined) {
            return layui.layer.msg('请选择图片')
        }
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    // 上传头像
    $('#but1').on('click', function () {
        // 生成一个64位字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        // 发送ajax
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg(res.messafe);
                }
                layui.layer.msg('恭喜你更换头像成功');
                // 重新渲染页面
                window.parent.getUserinfo();
            }
        })
    })
})