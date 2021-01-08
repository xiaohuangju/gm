var tel = document.querySelector('[ id="tel" ]');
var psw = document.querySelector('[ id="psw" ]');
var name1 = document.querySelector('[id="name"]');
var btn1 = document.querySelector('[id="btn1"');
var btn2 = document.querySelector('[id="btn2"');
console.log(btn2);
var fom = document.querySelectorAll('.formlist');
console.log(fom);

var agre = document.querySelector('.agree');
var noagree = document.querySelector('.noagree');
var mask = document.querySelector('.register_mask')



// 是否点了同意
agre.onclick = function() {
    this.parentElement.previousElementSibling.parentElement.parentElement.remove();
    console.log(this.parentElement.previousElementSibling.parentElement)
    mask.remove();
    return true

    // console.log(btn1.parentElement.parentElement)



}

noagree.onclick = function() {
    alert('如果不同意将无法注')
}
tel.nextElementSibling.onclick = function() {
    this.previousElementSibling.value = '';
}



//电话
tel.onblur = function() {
    var reg = /^1[2-9]\d{9}$/;
    if (reg.test(this.value)) {
        this.nextElementSibling.style.backgroundPosition = '19px 0'
        this.nextElementSibling.nextElementSibling.style.backgroundPosition = '-214px 0';
        this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '';

        return true;
    } else {
        this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '手机号码输入错误，请重新输入';

        return false;
    }
}


if (tel = true) {
    btn1.onclick = function() {
        // console.log(this.parentElement.parentElement)
        this.parentElement.parentElement.style.display = 'none';
        this.parentElement.parentElement.nextElementSibling.style.display = 'block'
    }











    //密码
    psw.onblur = function() {
        var reg = /^\w{6,12}$/;
        if (reg.test(this.value) && this.value != '') {
            this.nextElementSibling.style.backgroundPosition = '19px 0'
            this.nextElementSibling.nextElementSibling.style.backgroundPosition = '-214px 0';
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '验证完后，你可以使用该手机登录或者找回密码';
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.style.color = '#ccc';
            return true;
        } else {
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '请输入密码';
            return false;

        }
    }

    //确认密码


    //姓名
    name1.onblur = function() {
        var reg = /^[a-zA-Z]{2,10}$/;
        if (reg.test(this.value)) {
            this.nextElementSibling.style.backgroundPosition = '19px 0'
            this.nextElementSibling.nextElementSibling.style.backgroundPosition = '-214px 0';
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '';
            return true;
        } else {
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = '用户名长度只能在4-20个字符之间';
            return false;
        }
    }

    console.log(tel.value)

    //此处还没做
    btn2.onclick = function(e) {
        if (!tel) {
            e = e || window.event;
            e.preventDafault ? e.preventDafault() : e.returnValue = false;
            // return;
        };

        //使用AJAX传参
        ajax({
            url: './php/register.php',
            type: 'post',
            data: {

                'psw': psw.value,
                'name': name1.value,

            },
            //传入参数
            success: function(a) {
                // console.log(111);
                // console.log(a);
                if (a === '注册成功') {

                    window.location.href = './login.html';

                };
                if (a === '该电话已经被注册') {

                    alert('请重新注册,该用户已经存在')
                }
            }
        })

    }


}