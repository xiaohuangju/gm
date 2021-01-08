var box = document.querySelector('.big_img')
var boxImg = box.querySelector('img')
    // console.log(boxImg)

var mark = document.querySelector('.mask')
console.log(mark)
var rightBox = document.querySelector('.right_img')
var rightImg = rightBox.querySelector('img')
    // console.log(rightImg)

var footDiv = document.querySelectorAll('.sm_imglist>ul>li>img')
console.log(footDiv);
//获取小图片组
// var imgs = footDiv.querySelectorAll('img')
// console.log(imgs);


// console.log(box.offsetHeight)
//移动函数
function move(e) {
    //获取光标的移动距离
    var x1 = e.pageX - box.offsetLeft - parseInt(mark.offsetWidth / 2)
    var y1 = e.pageY - box.offsetTop - parseInt(mark.offsetHeight / 2)
        // console.log(x1, y1)
        //设置边界条件
    var maxX = box.offsetWidth - mark.offsetWidth
    var maxY = box.offsetHeight - mark.offsetHeight
    var minX = minY = 0;
    //设置右边图片的移动距离
    var tempX, tempY
        //判断水平边界
    if (x1 < minX) {
        mark.style.left = minX + 'px'
        tempX = 0
    } else if (x1 > maxX) {
        mark.style.left = maxX + 'px'
        tempX = maxX
    } else {
        mark.style.left = x1 + 'px'
        tempX = x1
            // console.log(tempX)
    }

    //垂直方向
    if (y1 < minY) {
        mark.style.top = minY + 'px'
        tempY = 0
    } else if (y1 > maxY) {
        mark.style.top = maxY + 'px'
        tempY = maxY
    } else {
        mark.style.top = y1 + 'px'
        tempY = y1
            // console.log(tempY)
    }

    //设置右边图片的移动
    rightImg.style.left = -2 * tempX + 'px'
    rightImg.style.top = -2 * tempY + 'px'

}
box.onmouseover = function(e) {
    var e = e || window.event
    mark.style.display = 'block'
    rightBox.style.display = 'block'
}

box.onmouseout = function() {
    mark.style.display = 'none'
    rightBox.style.display = 'none'
}

box.onmousemove = function(e) {
    var e = e || window.event
    move(e)
}

//遍历所有小图片组中的图片对象
for (var i = 0; i < footDiv.length; i++) {
    //给每个小图片绑定点击事件
    footDiv[i].onclick = function() {
        //清空所有小图片对象中的class属性值
        for (var a = 0; a < footDiv.length; a++) {
            footDiv[a].className = ''
        }
        //在给当前被选中的图片添加class属性值
        this.className = 'border1'
            //获取当前图片对象的src属性值
        var src1 = this.getAttribute('src')
            //给上面左右盒子中的图片设置src属性值
        boxImg.setAttribute('src', src1)
        rightImg.setAttribute('src', src1)
    }
}



var add_cart = document.querySelector('.add_cart');
var big_img = document.querySelector('.big_img>img');
var current_title = document.querySelector('.current_title')
var current_price = document.querySelector('.current_price')
var num = document.querySelector('.num');
console.log(big_img);


add_cart.onclick = function() {

    var addobject = {
        img: big_img.src,
        title: current_title.innerHTML,
        price: current_price.innerHTML,
        num: num.value
    }
    localStorage.setItem('img', big_img.src);
    localStorage.setItem('title', current_title.innerHTML);
    localStorage.setItem('price', current_price.innerHTML);
    localStorage.setItem('num', num.value);
    // localStorage.setItem('additem', addobject);


}









var util = {
    //公共方法一:本次存储的读和写
    getStorage: function() {
        //通过getStorage可以获取本地存储中list对应的值,并转成json返回
        return JSON.parse(localStorage.getItem('list') || '[]')
    },
    setStorage: function(json) {
        //传入json格式数据,存入本地存储中的list
        localStorage.setItem('list', JSON.stringify(json));
    }
}


//0 进入页面立刻根据本地存储信息渲染首屏
util.renderCar(util.getStorage(), 'car');
//1 点击加入购物车按钮,该商品信息存入本地存储
addCartEvent();

function addCartEvent() {
    //所有的加入购物车按钮
    var addCartBtns = document.querySelectorAll('.addCart');
    for (var i = 0; i < addCartBtns.length; i++) {
        addCartBtns[i].onclick = function() {
            var tr = this.parentNode.parentNode; //当前按钮所在的行元素
            //点击的那个商品的信息集合
            var product = {
                id: tr.children[0].innerHTML,
                img: tr.children[1].children[0].src,
                name: tr.children[2].innerHTML,
                price: tr.children[3].innerHTML
            };
            // console.log(product)
            addProduct(product)
        }
    }

}
//2 封装一个方法,可以把指定的商品放入到商品集合数组中
function addProduct(product) {
    //从本地存储中获取商品列表信息
    var products = util.getStorage();
    //遍历商品列表,查看商品列表中有没有商品的id和传入的商品的id相同
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == product.id) {
            //如果传入的单个商品已经在商品列表中,则数量加一
            products[i].num = products[i].num + 1;
            util.setStorage(products); //当商品列表发生变化,更新本地存储信息
            util.renderCar(products, 'car'); //当商品列表发生变化,更新购物车信息
            return;
        }
    }

    //如果传入的单个商品不在商品列表中,则数量为一
    product.num = 1;
    products.push(product);
    util.setStorage(products); //当商品列表发生变化,更新本地存储信息
    util.renderCar(products, 'car'); //当商品列表发生变化,更新购物车信息

}