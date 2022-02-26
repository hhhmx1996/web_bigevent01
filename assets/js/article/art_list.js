// 入口函数
$(function () {
    // 为 art-template 定时器
    // template.defaults.imports.dateFormat = function (dtStr) {
    //     var dt = new Data(dtStr);
    //  dt = 

    // }


    let p = {
        pagenum: 1,   //是	int	页码值
        pagesize: 2,	   //是	int	每页显示多少条数据
        cate_id: '',	   //否	string	文章分类的 Id
        state: '',	   //否	string	文章的状态，可选值有：已发布、草稿
    }


    inittable();
    // 封装一个函数渲染页面
    // 获取文章的列表
    function inittable() {
        // 发送ajax
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                let arr = template('tpl-table', { data: res.data });
                // 渲染到页面
                $('tbody').html(arr)
                renderPage(res.total)
            }
        })
    };

    // 2,初始化文章分类
    let form = layui.form
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

    // 3  筛选
    $('#form_search').on('submit', function (e) {
        e.preventDefault();
        // 获取
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        // 赋值
        p.cate_id = cate_id
        p.state = state
        // 渲染
        inittable();
    });

    // 封装函数  分页   页面渲染就要显示所以在页面加载就要渲染
    var laypage = layui.laypage;
    function renderPage(total) {
        // console.log(1);
        //执行一个laypage实例
        laypage.render({
            elem: 'pagBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: p.pagesize,  //每页显示的条数
            curr: p.pagenum,   //第几页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [1, 2, 3, 4, 5],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    //do something
                    // 赋值给页码  第几页
                    p.pagenum = obj.curr;
                    // 每页显示几条数据  赋值给
                    p.pagesize = obj.limit;
                    // 渲染页面
                    inittable();
                }
            }
        });
    };

    // 删除文章
    $('tbody').on('click', '.but-delete', function () {
        // console.log(1);
        let Id = $(this).attr('data-id')
        layer.confirm('是否要删除文章?', function (index) {
            //发送ajax
            $.ajax({
                url: "/my/article/delete/" + Id,
                success: function (res) {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜您删除数据成功');
                    // 解觉bug
                    if ($('.but-delete').length === 1 && p.pagenum < 1) {
                        p.pagenum--
                    }
                    // 页面重新渲染
                    inittable();
                }
            })

            layer.close(index);
        });
    });
})