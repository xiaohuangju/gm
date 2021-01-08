<?php
header("content-type:text/html;charset=utf-8");

//获取ajax传过来的参数
$username=$_POST['username'];
$psw=$_POST['psw'];

//连接数据库
$link=mysqli_connect('localhost','root','','qianfengstudy');


//判断是否连接成功，连接成功后最好关闭，不然影响后面的接受值
// if(mysqli_connect_error($link)){
//     die("连接失败".mysqli_connect_error());
// }else{
//     // echo "连接成功";
// };


//查询
$mysql="select * from `student` where  name='$username' and  psw='$psw'";
//这个语句在数据库里可以执行
// echo $sql;
//  echo $tel;  //这里可以打印
//  echo $psw; //这里也可以打印



//执行这个语句
 $result=mysqli_query($link,$mysql);


 //进行解析
 $res=mysqli_fetch_all($result,MYSQLI_ASSOC);



 //判断是否为真，也就是是否查询到值，
 if( $res){
     echo '登录成功';
    //  if()
     setcookie('name',"$username",time()+1000,'/');
    //  setcookie('psw',"$psw",time()+1000,'/');
 }else{
     echo '登录失败';
 }


?>