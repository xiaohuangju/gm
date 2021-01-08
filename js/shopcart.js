var box = document.querySelector('.box')
    //获取所有商品
var shops = document.getElementsByClassName('shop')
    //获取所有商品的选中框对象
var checkboxs = document.getElementsByName('xuan')
var a = 4 //代表图片序号
    //给父元素绑定点击事件
box.onclick = function(e) {
    var e = e || window.event
        //获取点击对象
    var target = e.target || e.srcElement
        //判断点击的是否为全选框
    if (target.name == 'quan') {
        //遍历每一个商品对象
        for (var i = 0; i < shops.length; i++) {
            //判断当前全选框对象是否被选中
            if (target.checked) {
                shops[i].children[0].children[0].checked = true
            } else {
                shops[i].children[0].children[0].checked = false
            }
        }
        totalPrice()
        shopTotal()
    }
    //判断点击的是否为+按钮
    if (target.innerHTML == '+') {
        //获取数量
        var val = target.previousElementSibling.value
            //数量递增
        val++
        //在重新把递增的数量赋值给输入框
        target.previousElementSibling.value = val

        //获取单价
        var pirce = target.parentNode.nextElementSibling.lastElementChild.innerHTML
            //计算小计
        var num = parseInt(val) * parseFloat(pirce)
            //给小计赋值
            /* var shop1=target.parentNode.parentNode
             shop1.children[shop1.children.length-3].lastElementChild.innerHTML=num */
        target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerHTML = num
        totalPrice()
        shopTotal()
    }
    //判断点击对象是否为减号
    if (target.innerHTML == '-') {
        var val = target.nextElementSibling.value
        if (val <= 1) {
            val = 1
        } else {
            val--
        }
        target.nextElementSibling.value = val
            //获取单价
        var pirce = target.parentNode.nextElementSibling.lastElementChild.innerHTML
            //计算小计
        var num = parseInt(val) * parseFloat(pirce)
            //给小计赋值
        target.parentNode.nextElementSibling.nextElementSibling.nextElementSibling.lastElementChild.innerHTML = num
        totalPrice()
        shopTotal()
    }
    //删除一行
    if (target.innerHTML == '删除') {
        target.parentNode.parentNode.remove()
        totalPrice()
        shopTotal()
    }
    //增加一行
    // if (target.innerHTML == '增加一行') {
    //     //创建新的div对象
    //     var newDiv = document.createElement('div')
    //         //给当前对象添加class属性
    //     newDiv.className = 'shop'
    //         //给当前对象添加内容
    //     newDiv.innerHTML = '<h4><input type="checkbox" name="xuan"></h4>' +
    //         '<h4><img src="./img/' + a + '.jpg"></h4>' +
    //         '<h4>' +
    //         '<button>-</button> ' +
    //         '<input type="text" value="1"> ' +
    //         '<button>+</button>' +
    //         '</h4>' +
    //         '<h4>$<span>3000.50</span></h4>' +
    //         '<h4>单反相机</h4>' +
    //         '<h4>$<span>3000.50</span></h4>' +
    //         '<h4>' +
    //         '<button>删除</button>' +
    //         '</h4>' +
    //         '<p class="clear"></p>'
    //         //获取父节点，该父节点追加新的子元素
    //     document.querySelector('.content').appendChild(newDiv)
    //     a++
    //     if (a > 7) {
    //         a = 1
    //     }
    //     totalPrice()
    //     shopTotal()
    //     aaa()
    // }
    //全删
    if (target.innerHTML == '全删') {
        //遍历所有的选中框对象
        for (var i = checkboxs.length - 1; i >= 0; i--) {
            //判断当前选中框是否被选中
            if (checkboxs[i].checked) {
                checkboxs[i].parentNode.parentNode.remove()
            }
        }
        totalPrice()
        shopTotal()
    }
    //点击选中框对象
    if (target.name == 'xuan') {
        aaa()
    }
}

function aaa() {
    var num = 0 //代表选中框被选中的次数
        //遍历所有商品选中框对象
    for (var i = 0; i < checkboxs.length; i++) {
        //判断该选中框是否被选中
        if (checkboxs[i].checked) {
            num++
        }
    }
    //当前被选中的次数是否等于长度
    if (num == checkboxs.length) {
        document.querySelector('[name="quan"]').checked = true
    } else {
        document.querySelector('[name="quan"]').checked = false
    }
    totalPrice()
    shopTotal()
}

//总计
function totalPrice() {
    var total = 0 //总价格
        //遍历所有商品
    for (var i = 0; i < shops.length; i++) {
        //判断当前商品是否被选中
        if (shops[i].children[0].lastElementChild.checked) {
            //获取每个商品的小计
            var subtotal = shops[i].children[5].lastElementChild.innerHTML
                //累加
            total += parseFloat(subtotal)
        }
    }
    //给总计赋值
    document.querySelector('.total').innerHTML = total
}
//店铺合计
function shopTotal() {
    var tot = 0
        //遍历所有商品
    for (var i = 0; i < shops.length; i++) {
        //获取每个商品的小计
        var subtotal = shops[i].children[5].lastElementChild.innerHTML
            //累加
        tot += parseFloat(subtotal)
    }
    //给店铺合计赋值
    document.querySelector('.shopTotal').innerHTML = tot
}
shopTotal()
totalPrice()



// document.querySelector('.imgsrc').src = localStorage.getItem('img');
// document.querySelector('.img_title').innerHTML = localStorage.getItem('title')
// document.querySelector('.img_price').innerHTML = localStorage.getItem('price');
// document.querySelector('.img_num').value = localStorage.getItem('num');

function add() {



    //创建新的div对象
    var newDiv = document.createElement('div')
        //给当前对象添加class属性
    newDiv.className = 'shop'
        //给当前对象添加内容
    newDiv.innerHTML = `
    <h4><input type="checkbox" name="xuan"></h4>
    <h4><img src="${localStorage.getItem('img')}"></h4>
    <h4>
        <button>-</button>
        <input type="text" value="${localStorage.getItem('num')}">
        <button>+</button>
    </h4>
    <h4>$<span>${localStorage.getItem('price')}</span></h4>
    <h4>${localStorage.getItem('title')}</h4>
    <h4>$<span>${localStorage.getItem('price')*localStorage.getItem('num')}</span></h4>
    <h4>
        <button>删除</button>
    </h4>
    <p class='clear'></p>`
        //获取父节点，该父节点追加新的子元素
    document.querySelector('.content').appendChild(newDiv)
    a++
    if (a > 7) {
        a = 1
    }
    totalPrice()
    shopTotal()
    aaa()
}

add()