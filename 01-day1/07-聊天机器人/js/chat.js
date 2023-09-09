$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    // 让页面滚动
    resetui()

    // 1.用户点击发送消息
    $("#btnSend").on('click', function () {
        var text = $("#ipt").val().trim()
        if (text.length <= 0) {
            return $("#ipt").val('')
        }
        // 用户输入内容不为空，渲染到聊天页面中
        // <></>  这种标签不能换行
        $("#talk_list").append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        // 清空输入框
        $("#ipt").val('')
        // 重新调用滚动条
        resetui()
        // 调用ajax请求 聊天机器人回复的内容
        getMsg(text)
    })

    // 2.获取聊天机器人回复的内容 封装到函数中
    function getMsg(text) {
        // ajax请求
        $.ajax({
            method: 'GET',
            url: 'https://ajax-base-api-t.itheima.net/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res)
                // 判断是否获取成功
                if (res.message === 'success') {
                    // 把获取的机器人回复的消息渲染到聊天窗口中
                    var msg = res.data.info.text
                    $("#talk_list").append('<li class="left_word"><img src="img/person01.png" /><span>' + msg + '</span></li>')
                    // 滚动页面
                    resetui()
                    // 调用getVoice() 函数，把聊天机器人的文字内容转换成语音播放
                    getVoice(msg)
                }
            }

        })
    }

    // 3.把聊天机器人的文字内容转换成语音播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'https://ajax-base-api-t.itheima.net/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                console.log(res)
                // 如果请求成功，则res.voiceUrl是服务器返回的音频URL地址
                if (res.status === 200) {
                    var voiceUrl = res.voiceUrl
                    $("#voice").attr('src', voiceUrl)

                }
            }
        })
    }

    // 4.使用回车键发送消息
    // 给文本输入框绑定 键盘弹起keyup 事件
    $("#ipt").on('keyup', function (e) {
        // console.log(e.keyCode)
        // e.keyCode ASII码是13 
        if (e.keyCode === 13) {
            // 调用发送键的点击事件
            $("#btnSend").click()
        }

    })

})