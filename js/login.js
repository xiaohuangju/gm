var user = document.querySelector('[id="username"]');
var psw = document.querySelector('[id="psw"]');
var btn = document.querySelector('[name="denglu"]');



btn.onclick = function() {
    //向ajax传入参数
    ajax({
        url: './php/login.php',
        type: 'post',
        data: {
            'username': user.value,
            'psw': psw.value,
        },
        //传入的函数
        success: function(result) {
            // console.log(result);
            if (result === '登录成功') {
                // alert('登录成功');
                window.location.href = './index.html';
                // getcookie()


            }
            if (result === '登录失败') {
                alert('请重新登录');
                window.location.href = './login.html';
            }
        }
    })
}

// var check = document.querySelector('[name="check" ]');
// if (check) {
//     alert('十天免登录');

// }