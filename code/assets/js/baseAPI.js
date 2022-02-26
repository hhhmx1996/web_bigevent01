// $.ajaxPrefilter()  可以在ajax  get post 之前截取
// 开发环境服务器
let baseUrl = 'http://api-breakingnews-web.itheima.net'
// 测试环境服务器
// let baseUrl = 'http://api-breakingnews-web.itheima.net'
// 生产环境服务器
// let baseUrl = 'http://api-breakingnews-web.itheima.net'

$.ajaxPrefilter(function (origin) {
    // console.log(origin);
    origin.url = baseUrl + origin.url

    // 身份认证
    if (origin.url.indexOf('/my/') != -1) {
        origin.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        // 信息拦截
        origin.complete = function (res) {
            // console.log(res.responseJSON);
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                // 跳转页面
                location.href = '/login.html'
                // 本地销毁token
                localStorage.removeItem('token');
            }
        }
    };
})