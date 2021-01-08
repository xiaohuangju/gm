var inp = document.querySelector('.search_input');
var ul = document.querySelector('.search_tips');

function suggest(data) {

    //清空是为了防止累加，
    ul.innerHTML = '';
    if (data);

    //遍历g里里面的数组
    data.forEach(function(item) {
        //遍历一次创建一个li
        var li = document.createElement('li');

        //li的内容就是item里面q这个属性里面的值
        li.innerHTML = item;
        // li.style.border = "1px solid #ccc";

        //把li追加到ul中
        ul.appendChild(li);
    });

    //防止不断地产生script标签，没创建完了，li生成完了，就把script这个标签删除掉
    document.body.removeChild(script)
}


//边输入边进行搜索
inp.oninput = function() {
    var sr = "https://apis.gome.com.cn/p/suggest?from=headSearch&module=searchSuggest&query=" + inp.value + "&jp=true&user=85363458661&callback=suggest&_=1608779715153";
    var script = document.createElement('script');
    script.src = sr;
    document.body.appendChild(script);


}




//获取操作对象
var imgs = document.querySelectorAll('.viewPages>ul>li');
var btns = document.querySelectorAll('.nav_btn>li>a');
var left = document.querySelector('.pre_btn');
var right = document.querySelector('.next_btn');
var box = document.querySelector('.viewPages>ul');

var dsq1, dsq2;
//设置当前显示图片的下标
var imgIndex = 0;
move(imgs[imgIndex], 100);

//创建自动执行函数
function autoMove() {
    fn1()
        //获取下一次要显示的图片下标
    imgIndex++
    if (imgIndex > 7) {
        imgIndex = 0
    }
    fn2()
}
//当鼠标移入到大盒子中时，清除定时器
box.onmouseover = function() {
    clearInterval(dsq2)
}
box.onmouseout = function() {
        dsq2 = setInterval(autoMove, 3000)
    }
    //点击右边按钮
right.onclick = function() {
        autoMove()
    }
    //点击左边按钮
left.onclick = function() {
        fn1()
            //获取下一次要显示的图片下标
        imgIndex--
        if (imgIndex < 0) {
            imgIndex = 7
        }
        fn2()
    }
    //给每个按钮绑定点击事件
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        fn1()
            //把当前点击按钮的下标赋值给图片下标
        imgIndex = i
        fn2()
    }
}

function fn1() {
    //把当前图片进行透明
    imgs[imgIndex].style.opacity = 0.1
    imgs[imgIndex].style.zIndex = 1
        //把当前图片对应的按钮class属性值清空
    btns[imgIndex].className = '';
}

function fn2() {
    move(imgs[imgIndex], 100)

    imgs[imgIndex].style.zIndex = 2
        //把当前图片对应的按钮class属性值清空
    btns[imgIndex].className = 'navbtn_bg'
}
dsq2 = setInterval(autoMove, 3000)

function move(ele, end) {
    clearInterval(dsq1)
        //起始值
    var start = 10
    dsq1 = setInterval(function() {
        //判断结束值是否大于起始值
        if (end > start) {
            var speed = 3
        } else {
            var speed = -3
        }
        //判断剩余的距离是否小于等于步长
        if (Math.abs(end - start) <= Math.abs(speed)) {
            clearInterval(dsq1)
            ele.style.opacity = end / 100
        } else {
            start += speed
            ele.style.opacity = start / 100
        }
    }, 10)
}



class Tab {
    constructor(dd) {
        // console.log(dd);
        this.div = dd
            //获取div对象中的所有的li对象和p对象
        this.shopleft = this.div.querySelectorAll('.shop_lists>ul');
        console.log(this.shopleft)
        this.lis = this.div.querySelectorAll('.shop_lists_item>h3');
        this.lisAs = this.div.querySelectorAll('.shop_lists_item>h3>a');
        // console.log(this.lis)
        this.ps = this.div.querySelectorAll('.fullcategory')
            // this.switch1()
    }
    switch2() {


        this.shopleft[0].onmouseout = () => {
            for (let j = 0; j < this.lis.length; j++) {
                // console.log(this.ps[j])
                this.lis[j].className = '';
                this.ps[j].style.display = 'none';

            }
            for (let i = 0; i < this.lis.length; i++) {
                //给每个li对象绑定点击事件
                // console.log(this.lis.length)
                this.lis[i].onmouseover = () => {
                    //清空所有li和p对象中的class属性值
                    for (let j = 0; j < this.lis.length; j++) {
                        // console.log(this.ps[j])
                        this.lis[j].className = '';
                        this.ps[j].style.display = 'none';
                        // this.ps[i].classList.remove('block');

                        // this.ps[j].classList.add('fullcategorydpnon')
                    }
                    //给指定的对象添加class属性值
                    this.lis[i].className = 'shop_listsbg';
                    // this.ps[i].classList.remove('fullcategorydisplay')
                    this.ps[i].style.display = 'block';



                    for (let k = 0; k < this.lisAs.length; k++) {
                        this.lisAs[k].onmouseover = () => {
                            for (let n = 0; n < this.lisAs.length; n++) {
                                this.lisAs[n].style.color = '#5e5e5e';
                            }

                            this.lisAs[k].style.color = '#f5004b';
                        }
                    }
                }
            }



        }



    }

}

//获取相关元素
var menu = document.getElementById('elevator'); //菜单
// console.log(menu.children.length);
var content = document.getElementById('floor'); //内容楼层
// console.log(content.children)

var lastLi = menu.children[menu.children.length - 1]; //回到顶部按钮
// console.log(lastLi)


var contentLiArr = content.children; //楼层的里面的集合
var menuLiArr = menu.children; //菜单里面li 的集合
var index = 0; //定义楼层,初始为0
light()
    //记录每个li的滚动高度区间
var arr = [0];

var scrollTop = 0;
for (var i = 0; i < contentLiArr.length; i++) {
    scrollTop += contentLiArr[i].offsetHeight;
    arr.push(scrollTop)
}
// console.log(arr)
var arr = arr.map(function(item) {
    return item + 1600;
})
console.log(arr)
window.onscroll = function() {
    // console.log($(document).scrollTop())
    //1 当页面滚动到300px以后时,出现menu菜单栏
    if (getScroll() > 800) {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }

    //3 当页面滚动到1300以后位置时,menu里面出现回到顶部按钮
    if (getScroll() > 1500) {
        lastLi.style.display = "block";
    } else {
        lastLi.style.display = "none";
    }

    //4 当页面滚动时,当前被滚到的楼层菜单高亮
    //根据滚动高度,判断在哪个楼层
    for (var i = 0; i < arr.length - 1; i++) {
        if (getScroll() >= arr[i] && getScroll() < arr[i + 1]) {
            index = i;
            break;
        }
    }
    light()

}

//5 点击回到顶部按钮,回到顶部
lastLi.onclick = function() {
        animate(0)
    }
    //2 点击menu里面的li,页面缓动到响应楼层
for (var i = 0; i < menuLiArr.length - 1; i++) {
    menuLiArr[i].index = i;
    menuLiArr[i].onclick = function() {
        animate(arr[this.index])
    }
}

function light() {
    for (var i = 0; i < menuLiArr.length - 1; i++) {
        menuLiArr[i].index = i;
        menuLiArr[i].className = ""
    }
    menuLiArr[index].className = "elebg"
}

function animate(target) {
    //scrollTop属性缓动
    clearInterval(document.timer);
    document.timer = setInterval(function() {
        //1 获取元素当前位置
        var current = getScroll();
        //2 计算速度
        var speed = (target - current) / 10;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        //3 计算元素当前位置
        current = current + speed;
        //4 判断是否到达目标
        if (current == target) {
            clearInterval(document.timer);
        }
        //5 定位元素
        setScroll(current)
    }, 10)
}

function setScroll(value) {
    if (document.body.scrollTop) {
        document.body.scrollTop = value;
    } else {
        document.documentElement.scrollTop = value;
    }
}

function getScroll() {
    return document.body.scrollTop + document.documentElement.scrollTop;
}




// 倒计时
var miaosha_time = document.querySelector('.time')

function miaosha() {
    //获取开始时间
    var d1 = new Date()
        //获取结束时间
    var d2 = new Date('2021-11-11')
        //时间差
    var t1 = parseInt((d2 - d1) / 1000)
    var dd = parseInt(t1 / (24 * 3600))

    var hh = parseInt((t1 - dd * 24 * 3600) / 3600)
    if (hh < 10) {
        hh = '0' + hh
    }
    var mm = parseInt((t1 - dd * 24 * 3600 - hh * 3600) / 60)
    if (mm < 10) {
        mm = '0' + mm
    }
    var ss = t1 - dd * 24 * 3600 - hh * 3600 - mm * 60
    if (ss < 10) {
        ss = '0' + ss
    }

    //拼接
    var str = hh + ":" + mm + ":" + ss;
    // document.write(str)
    //把拼接好的字符串赋值给h对象
    miaosha_time.innerHTML = str
}
miaosha()
setInterval(miaosha, 1000)



// 每日必抢
var miaoshafirst = document.querySelector('.miaosha_list_first');
var miaoshatwo = document.querySelector('.miaosha_list_two');
miaoshafirst.style.display = 'block';
miaoshatwo.style.display = 'none';
setInterval(function() {
    miaoshafirst.style.display = 'none';
    miaoshatwo.style.display = 'block';
}, 1000)