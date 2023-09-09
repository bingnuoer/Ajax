// 业务一、获取评论列表 函数
function getCommentList() {
    $.ajax({
        method: 'get',
        url: 'https://ajax-base-api-t.itheima.net/api/cmtlist',
        // 没有参数 可以省略data
        data: {},
        success: function (res) {
            // console.log(res)
            // 判断数据是否请求成功
            if (res.status !== 200) {
                return alert('请求数据失败！')
            }
            // console.log('请求数据成功')

            // 业务二、渲染ui结构:循环从服务器请求的数据，渲染到评论列表中
            // 存储渲染的数据
            var rows = []
            $.each(res.data, function (i, item) {
                var str = '<li class="list-group-item"><span class="badge" style="background-color: orange;">评论时间：' + item.time + '</span><span class="badge" style="background-color: skyblue;">评论人：' + item.username + '</span> ' + item.content + ' </li>'
                rows.push(str)
            })
            // 再把rows渲染到页面中
            // 先清空li，再追加
            $("#cmt-list").empty().append(rows)
        }
    })
}
// 记得调用函数
getCommentList()

// 业务三、评论面板中表单改造：给服务器提交数据
// 不要忘了入口函数
$(function () {
    $("#formAddCmt").submit(function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 获取表单所有数据
        var data = $(this).serialize()
        // console.log(data)
        // 给服务器提交获取的用户输入的数据
        $.post('https://ajax-base-api-t.itheima.net/api/addcmt',data,function(res){
            if(res.status !== 201){
                return alert('发送数据失败')
            }
            // 将发送后的数据 服务器数据重新渲染
            getCommentList()
            // 清空表单文本框所有数据
            // 获取表单，将jquery表单转换成dom元素($("#formAddCmt")[0])，再使用dom元素重置的方法(reset()) 清空表单所有数据
            $("#formAddCmt")[0].reset()
        })
    })

})


