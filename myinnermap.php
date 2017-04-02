<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wx1fe5f8df6e2db178", "3026c2d84f1cdb4a5f707887744a20cd");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<meta charset="UTF-8">
		<!--移动端适配-->
		<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0" />
		<title>融合时代地下停车场</title>
		<link rel="stylesheet" href="css/ol.css" />
		<style>
			html,
			body {
				height: 100%;
				width: 100%;
			}
			
			#map {
				width: 100%;
				height: 100%;
			}
			
			.ol-full-screen {
				float: right;
			}
			
			.ol-zoom {
				float: left;
			}
			
			.ol-zoom-extent {
				float: left;
			}
			
			.ol-popup {
				position: absolute;
				background-color: white;
				-webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
				filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
				padding: 15px;
				border-radius: 10px;
				border: 1px solid #cccccc;
				bottom: 12px;
				left: -50px;
			}
			
			.ol-popup:after,
			.ol-popup:before {
				top: 100%;
				border: solid transparent;
				content: " ";
				height: 0;
				width: 0;
				position: absolute;
				pointer-events: none;
			}
			
			.ol-popup:after {
				border-top-color: white;
				border-width: 10px;
				left: 48px;
				margin-left: -10px;
			}
			
			.ol-popup:before {
				border-top-color: #cccccc;
				border-width: 11px;
				left: 48px;
				margin-left: -11px;
			}
			
			.ol-popup-closer {
				text-decoration: none;
				position: absolute;
				top: 2px;
				right: 8px;
			}
			
			.ol-popup-closer:after {
				content: "✖";
			}
			
			#start-modal {
				position: inherit;
				padding: 12px;
				position: absolute;
				right: 0;
				top: 0;
			}
		</style>
		<!--openlayer3框架-->
		<script type="text/javascript" src="libs/ol/ol.js"></script>
		<!--jquery框架-->
		<script type="application/javascript" src="http://demo.js.jdk5.com/jquery-1.12.3.min.js"></script>
		<!--bootstrap框架-->
		<link rel="stylesheet" href="https://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<!--最短路径算法-->
		<script type="text/javascript" src="js/dijkstrafindpath.js"></script>
		<!--吐司设计-->
		<script type="text/javascript" src="js/mytoast.js"></script>
		<link rel="stylesheet" href="css/mytoast.css" />
		<!--引用jssdk所需js文件-->
		<script type="application/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
	</head>

	<body>
		<!--起始标注-->
		<img id="start-marker" src="images/start.png" style="width: 1.5em;height: 2em;margin-left: -0.7em;margin-top: -2em; position: absolute;" />
		<!--终点标注-->
		<img id="end-marker" src="images/end.png" style="width: 1.5em;height: 2em;margin-left: -0.7em;margin-top: -2em; position: absolute;" />
		<!--地图容器-->
		<div id="map">
			<!--弹出框-->
			<div id="popup" class="ol-popup">
				<a href="#" id="popup-closer" class="ol-popup-closer"></a>
				<div id="popup-content" style="width: 10em;height: auto;"></div>
				<button id="popup-btn-start" class="btn btn-default" style="width: 4em;height: 2em;float: left;padding: 0.5px 0.5px 0.5px 0.5px;">起点</button>
				<button id="popup-btn-end" class="btn btn-primary" style="width: 4em;height: 2em;float: right;padding: 0.5px 0.5px 0.5px 0.5px;">终点</button>
			</div>
		</div>
		<div id="start-modal">
			<!--下拉按钮-->
			<ul class="nav navbar-nav" style="font-size: 0.85em;padding: 0.5em 0.5em 0.5em 0.5em;opacity: 0.8;position: absolute;top: 0;right: 0;margin: 1px 1px 1px 1px;">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
						<b class="caret"></b>
					</a>
					<ul class="dropdown-menu">
						<li><a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" style="font-size: 0.85em;padding: 0.5em 0.5em 0.5em 0.5em;opacity: 0.8;background-color: #EEEEEE;">
								路径规划
							</a></li>
						<li><a id="scanhref" class="btn btn-primary btn-lg" style="font-size: 0.85em;padding: 0.5em 0.5em 0.5em 0.5em;opacity: 0.8;background-color: #EEEEEE;">
								扫一扫
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 90%;margin: 0 auto;padding-top: 1em;">
				<div class="modal-content">
					<div class="modal-header" style="padding-top:0.8em;padding-bottom: 0.8em;">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h5 class="modal-title" id="myModalLabel">
							路径规划
						</h5>
					</div>
					<div class="modal-body">
						起点: <input type="text" id="sourceVertex" style="margin-bottom: 0.5em;padding-top: 0.25em;padding-bottom: 0.25em;padding-left: 0.25em;" value="请输入起始车位号" onfocus='this.value=""' /><br/> 终点: <input type="text" id="finalVertex" style="padding-top: 0.25em;padding-bottom: 0.25em;padding-left: 0.25em;" value="请输入终点车位号" onfocus='this.value=""' />
						<img id="exchange" src="images/exchange.png" style="width: 2em;height: 2em;margin-left: 1em;bottom: 2.5em; position: absolute;vertical-align: middle;" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							关闭
						</button>
						<button type="button" id="search" class="btn btn-primary">
							导航
						</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--摇一摇关注，判断用户是否关注了-->
		<script type="text/javascript" src="http://zb.weixin.qq.com/nearbycgi/addcontact/BeaconAddContactJsBridge.js"></script>
		<script type="text/javascript">
			//配置接入jssdk的权限
		    wx.config({
			    debug: false,
			    appId: '<?php echo $signPackage["appId"];?>',
			    timestamp: '<?php echo $signPackage["timestamp"];?>',
			    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			    signature: '<?php echo $signPackage["signature"];?>',
			    jsApiList: [
			      // 所有要调用的 API 都要加到这个列表中
			      'startSearchBeacons','stopSearchBeacons','onSearchBeacons','scanQRCode'
			    ]
		    });
		</script>
		<!--openlayer3制作地图-->
		<script type="text/javascript" src="js/openlayerstest.js"></script>
	</body>

</html>