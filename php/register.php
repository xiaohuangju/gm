<?php
header("content-type:text/html;charset=utf-8");


//获取ajax传过来的值

$psw=$_POST['psw'];
$name=$_POST['name'];

// var_dump($psw,$name);

//连接数据库
$link=mysqli_connect('localhost','root','','qianfengstudy');


//判断连接是否成功，判断完毕后就关闭
// if(mysqli_connect_error($link)){
//     die("连接失败".mysqli_connect_error());
// }else{
//     echo "连接成功";
// }


//设置编码
mysqli_set_charset($link,"utf8");




//查询数据库中有没有人注册过同样的名字
$sql="select * from `student` where  name='$name'";


//执行这条语句
$res=mysqli_query($link,$sql);


//查询的化需要解析
$resu=mysqli_fetch_all($res,MYSQLI_ASSOC);

//能够查询说明已经被注册
if($resu){
    echo '该电话已经被注册';

}else{
//否则就插入到数据库
    //插入数据
    $mysql="insert into `student`(psw,name) values('$psw','$name')";
    //执行这条语句
    $result=mysqli_query($link,$mysql);
    echo "注册成功";
}




//关闭数据库
 mysqli_close($link);

?>