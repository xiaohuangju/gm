//传入的是一个对象,进入ajax函数里面进行判断，
function ajax(options) {
    console.log(111);
    //definfo是默认的一个对象，传入的对象将赋值给他，然后对值进行一个一个的判断
    var defInfo = {
        url: '', //地址不需要默认值
        type: 'get', //请求方式是默认位get
        async: true, //默认是异步
        data: '', //参数没有默认值
        dataType: 'string', //默认不执行json.parse

        //这个函数实在发送成功，响应返回执行的函数，所以这里存在这异步问题，
        //不知到请求什么时候，结束，也就是不知到什么时候，执行这个函数，所以就出现了下文
        //回调函数，当回调函数，嵌套过多的时候，就会出现回调地狱

        success: function() {}, //默认是一个函数
    }
    console.log(options.data);

    //判断有没有传递url地址，没有直接抛出错误，就不会再执行下面的了
    if (!options.url) {
        throw new Error('url 必须传递')
    }

    //遍历输入对象的属性，将传入对象的属性和属性值，全部赋给默认的属性和属性值
    for (let key in options) {
        defInfo[key] = options[key]
    }
    //赋值完毕了后就可以直接使用definfo的属性和属性值了




    //首先判断的是data中的值，可以位空，也可以是字符串，也可以是对象，因为不一定都是要传值的，根据具体情况，判断输入值的类型，
    //如果不是对象，不是字符串，
    if (!(typeof defInfo.data === 'string' && /^(\w+=\w+&?)*$/.test(defInfo.data) || Object.prototype.toString.call(defInfo.data) === '[object Object]')) {
        throw new Error('请按照要求传递参数')
    }

    //判断是否是异步还是同步，如果是默认值的化，其实不用传这个参数
    if (typeof defInfo.async !== 'boolean') {
        throw new Error('async 参数只接受布尔数据类型')
    }


    if (!(defInfo.type.toUpperCase() === 'GET' || defInfo.type.toUpperCase() === 'POST')) {
        throw new Error('目前本插件只接受 GET 和 POST 方式，请期待更新')
    }


    //判断输入的这个是不是一个对象，也就是是不是一个函数，因为这个只接受一个函数，也就是一个对象，否则会直接抛出错误
    if (Object.prototype.toString.call(defInfo.success) !== '[object Function]') {
        throw new Error('success 只接受函数数据类型')
    }

    //当所有的参数都没有问题的情况下，要处理data，因为data有可能是对象，要转为字符串
    var str = '';
    //如果传入的是一个对象的情况下，要转化位字符串，，以key=value&key=value的形式
    if (Object.prototype.toString.call(defInfo.data) === '[object Object]') {
        for (let attr in defInfo.data) {
            str += `${attr}=${defInfo.data[attr]}&`
        }
        str = str.slice(0, -1); //因为后弦对了一个&符号，要取消掉
        defInfo.data = str
    }


    //全部验证通过了，开始正常的ajax请求
    //创建的时候，考虑到兼容问题，
    function createXHR() {
        if (XMLHttpRequest) {
            return new XMLHttpRequest()
        } else {
            return new ActiveXObject('Microsoft.XMLHTTP')
        }
    }
    var xhr = createXHR()
        //配置，里面有三个参数，第一个是get还是post，第二个参数是地址，里面是一个三元运算，
        //如果是get就执行冒号前面的 ? ${ defInfo.data }& _=${ new Date().getTime() }`这是个传值
        //如果是post就不需要传值了则为空
        //最后一个参数，是异步还是同步
    xhr.open(defInfo.type, defInfo.url + (defInfo.type.toUpperCase() === 'GET' ? `?${defInfo.data}&_=${new Date().getTime()}` : ''), defInfo.async)


    //如果是post的情况下，还要加一个请求头
    if (defInfo.type.toUpperCase() === 'POST') {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    }

    //发送请求，如果是post的情况下，就执行冒号前面的，不然就执行冒号后面的
    xhr.send((defInfo.type.toUpperCase() === 'POST' ? `${defInfo.data}` : ''));
    // console.log(typeof defInfo.data)
    // console.log(defInfo.data)


    //判断状态码，看是否要执行某一个函数，还是直接返回值
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && /2\d{2}/.test(xhr.status)) {
            // 表示成功，我们就要执行 success
            // 但是要进行 dataType 的判断
            if (defInfo.dataType === 'json') {
                defInfo.success(JSON.parse(xhr.responseText));

            } else {
                // console.log(xhr.responseText);
                //把参数传入函数中，也可以不传参
                defInfo.success(xhr.responseText);

            }
        }
    }
}