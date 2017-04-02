<?php 
ini_set('date.timezone','Asia/Shanghai');
//error_reporting(E_ERROR);
require_once "../lib/WxPay.Api.php";
require_once "WxPay.JsApiPay.php";
require_once 'log.php';

//初始化日志
$logHandler= new CLogFileHandler("../logs/".date('Y-m-d').'.log');
$log = Log::Init($logHandler, 15);

//打印输出数组信息
function printf_info($data)
{
    foreach($data as $key=>$value){
        echo "<font color='#00ff55;'>$key</font> : $value <br/>";
    }
}

//①、获取用户openid
$tools = new JsApiPay();
$openId = $tools->GetOpenid();

//②、统一下单
$input = new WxPayUnifiedOrder();
$input->SetBody("test");
$input->SetAttach("test");
$input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
$input->SetTotal_fee("750");
$input->SetTime_start(date("YmdHis"));
$input->SetTime_expire(date("YmdHis", time() + 600));
$input->SetGoods_tag("test");
$input->SetNotify_url("http://djj4211.bj01.bdysite.com/demo/example/notify.php");
$input->SetTrade_type("JSAPI");
$input->SetOpenid($openId);
$order = WxPayApi::unifiedOrder($input);
//echo '<font color="#f00"><b>统一下单支付单信息</b></font><br/>';
//printf_info($order);
$jsApiParameters = $tools->GetJsApiParameters($order);

//获取共享收货地址js函数参数
$editAddress = $tools->GetEditAddressParameters();

//③、在支持成功回调通知中处理成功之后的事宜，见 notify.php
/**
 * 注意：
 * 1、当你的回调地址不可访问的时候，回调通知会失败，可以通过查询订单来确认支付是否成功
 * 2、jsapi支付时需要填入用户openid，WxPay.JsApiPay.php中有获取openid流程 （文档可以参考微信公众平台“网页授权接口”，
 * 参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html）
 */
?>

<html>
	<head>
	    <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
	    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
	    <title>支付详情</title>
	    <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="format-detection" content="telephone=no">
		<!--jquery框架-->
		<script type="application/javascript" src="http://demo.js.jdk5.com/jquery-1.12.3.min.js"></script>
		 <!--bootstrap框架-->
		<link rel="stylesheet" href="https://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	    <style>
	    	html,body{
	    		width: 100%;
	    		height: 100%;
	    	}
	    </style>
	    <script type="text/javascript">
			//调用微信JS api 支付
			function jsApiCall()
			{
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest',
					<?php echo $jsApiParameters; ?>,
					function(res){
						WeixinJSBridge.log(res.err_msg);
						WeixinJSBridge.call('closeWindow');
					}
				);
			}
		
			function callpay()
			{
				if (typeof WeixinJSBridge == "undefined"){
				    if( document.addEventListener ){
				        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
				    }else if (document.attachEvent){
				        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
				        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
				    }
				}else{
				    jsApiCall();
				}
			}
	
			//获取共享地址
			function editAddress()
			{
				WeixinJSBridge.invoke(
					'editAddress',
					<?php echo $editAddress; ?>,
					function(res){
						var value1 = res.proviceFirstStageName;
						var value2 = res.addressCitySecondStageName;
						var value3 = res.addressCountiesThirdStageName;
						var value4 = res.addressDetailInfo;
						var tel = res.telNumber;
						
						//alert(value1 + value2 + value3 + value4 + ":" + tel);
					}
				);
			}
			
			window.onload = function(){
				if (typeof WeixinJSBridge == "undefined"){
				    if( document.addEventListener ){
				        document.addEventListener('WeixinJSBridgeReady', editAddress, false);
				    }else if (document.attachEvent){
				        document.attachEvent('WeixinJSBridgeReady', editAddress); 
				        document.attachEvent('onWeixinJSBridgeReady', editAddress);
				    }
				}else{
					editAddress();
				}
			};
		</script>
	</head>

	<body>
		<div class="thumbnail" style="margin-top: 2px; margin-left: 2px; margin-right: 2px;width: 100%;height: 100%;">
	      	<img src="../../images/parking.png" style="width: 95%;margin-top: 2px;">
	      	<div class="caption">
	        	<h3><b>融合时代地下停车场</b></h3>
	        	<div style="margin-left: 1em;margin-right: 1em;">
	        		<p style="color: #000000;">尊敬的用户，您好！</p>
		        	<p style="color: #000000;">&emsp;您在2017.3.31-11:20至2017.3.31-3:30使用融合时代停车场车位</p>
		        	<p style="color: #000000;text-align: center;">共计停车</p>
		        	<p style="text-align: center;font-size: 20px;"><b>1小时30分钟</b></p>
		        	<p style="color: #000000;text-align: center;">总计消费</p>
		        	<p style="text-align: center;font-size: 26px;"><b>7.5元</b></p>
		        	<center><p> <button style="width:210px; height:50px; border-radius: 15px;background-color:#FE6714; border:0px #FE6714 solid; cursor: pointer;  color:floralwhite;  font-size:16px;" type="button" onclick="callpay()">立即支付</button> </p></center>
	        	</div>
	      	</div>
	    </div>
	</body>

</html>