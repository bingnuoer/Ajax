$(function () {
    // 5.给时间补0函数
    function padZero(n) {
        return n < 10 ? '0' + n : n
    }

    // 4.定义时间过滤器
    template.defaults.imports.dataFormat = function (newdate) {
        var dt = new Date(newdate)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth())
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    }

    // 1.获取新闻列表的函数
    function getNewsList() {
        // 发起ajax请求
        $.get('https://ajax-base-api-t.itheima.net/api/news', function (res) {
            if (res.status !== 200) {
                return alert('获取新闻数据列表失败！')
            }
            // console.log(res.data)

            // 3.编译模版
            // 3.1 把body里面的新闻项剪切到script标签中

            // 3.2 填充template标准语法渲染新闻数据
            // 把res里data里tags字符串数据转换成数组字符串，再循环渲染到script标签中
            for (var i = 0; i < res.data.length; i++) {
                res.data[i].tags = res.data[i].tags.split(',') // tags:(3) ['三大运营商', '中国移动', '5G商用']
            }
            console.log(res)
            // 值是res，不是res.data
            var htmlStr = template('tpl-news', res)
            // 渲染到新闻列表中
            $("#news-list").html(htmlStr)
        })
    }

    getNewsList()

    // 2.html页面中定义template模版
})