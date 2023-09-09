// 1.把 data 对象，转化成查询字符串的格式 提交给服务器
function resolveData(data) {
    var arr = []
    // 循环对象上的每一个属性 k
    for (let k in data) {
        // 每一个属性值加到arr数组中
        arr.push(k + '=' + data[k])
    }
    // arr里面的值用&拼接
    return arr.join('&')
}
// 参数传递是个对象
// var result = resolveData({uname:'zs',age:18})
// console.log(result)


// 2.封装自己的Ajax函数
// 函数的封装
// options是用户传递过来的对象
function itheima(options) {
    var xhr = new XMLHttpRequest
    // 把用户传递过来的参数对象 转换为 查询字符串
    var qs = resolveData(options.data)

    // 3.判断请求类型
    if (options.method.toUpperCase() === 'GET') {
        // 发起GET请求
        // 传递数据
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
    } else if (options.method.toUpperCase() === 'POST') {
        // 发起POST请求
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        // 传递数据
        xhr.send(qs)

    }

// 3.监听请求状态改变的事件
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}