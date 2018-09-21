
<html>
	<head>
		<meta charset="UTF-8">
		<!--移动端适配-->
		<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0" />
		<title>地下停车场</title>
		<link rel="stylesheet" href="css/ol.css" />
		<!--自定义的地图样式-->
		<link rel="stylesheet" href="css/mymap.css" />
		<!--openlayer3框架-->
		<script type="text/javascript" src="libs/ol/ol.js"></script>
		<!--jquery框架-->
		<script type="text/javascript" src="libs/jquery-3.2.1.min.js" ></script>
		<!--bootstrap框架-->
		<link rel="stylesheet" href="libs/bootstrap/bootstrap.min.css" >
		<script src="libs/bootstrap/bootstrap.min.js" ></script>
		<!--吐司插件-->
		<script type="text/javascript" src="js/mytoast.js"></script>
		<link rel="stylesheet" href="css/mytoast.css" />
		<!--引用jssdk所需js文件-->
		<script type="application/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
		<link rel="shortcut icon" href="favicon.ico" />
		<link rel="bookmark" href="favicon.ico" />
	</head>

	<body>
		<!--alpha:<span id="alpha"></span><br/> 
		offsetTheta:<span id="beta"></span><br/> 
		finalTheta:<span id="gamma"></span><br/>
		step:<span id="step"></span><br/>-->
		<!--起始标注-->
		<img id="start-marker" src="images/start.png"/>
		<!--终点标注-->
		<img id="end-marker" src="images/end.png"/>
		<!--地图容器-->
		<div id="map">
			<!--弹出框-->
			<div id="popup" class="ol-popup">
				<a href="#" id="popup-closer" class="ol-popup-closer"></a>
				<div id="popup-content"></div>
				<button id="popup-btn-start" class="btn btn-default" >起点</button>
				<button id="popup-btn-end" class="btn btn-primary" >终点</button>
			</div>
		</div>
		<div id="start-modal">
			<!--下拉按钮-->
			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" style="background-color: #FFFFFF;padding-top: 0px;margin-right: 8px;"> 
						<img id="all-op" src="images/all.png"/>
					</a>
					<ul class="dropdown-menu">
						<li><a id="park-car" class="btn btn-primary btn-lg">
								停车
							</a>
						</li>
						<li><a id="find-car" class="btn btn-primary btn-lg">
								寻车
							</a>
						</li>
						<li><a id="path-plan" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
								路径规划
							</a>
						</li>
						<li><a id="scanhref" class="btn btn-primary btn-lg">
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
		<!--楼层控件-->
		<div id="float-left">
			<!--<a href="javascript:;" class="on">1F</a>
			<a href="javascript:;">2F</a>-->
		</div>
		<!--摇一摇关注，判断用户是否关注了-->
		<script type="text/javascript" src="http://zb.weixin.qq.com/nearbycgi/addcontact/BeaconAddContactJsBridge.js"></script>
		<script type="text/javascript">
			//配置接入jssdk的权限
		    wx.config({
		    	beta: true,
			    debug: false,
			    appId: '<?php echo $signPackage["appId"];?>',
			    timestamp: '<?php echo $signPackage["timestamp"];?>',
			    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			    signature: '<?php echo $signPackage["signature"];?>',
			    jsApiList: [
			      // 所有要调用的 API 都要加到这个列表中
			    	'startSearchBeacons',
			    	'stopSearchBeacons',
			    	'onSearchBeacons',
			    	'scanQRCode'
			    ]
		    });
		</script>
		<!--全局变量声明-->
		<script type="text/javascript" src="js/global-var.js" ></script>
		<!--地图渲染-->
		<script type="text/javascript" src="js/map-render.js" ></script>
		<!--获取方向传感器数据辅助定位-->
		<script type="text/javascript" src="js/get-direction.js" ></script>
		<!--计步器辅助定位-->
		<script type="text/javascript" src="js/count-step.js" ></script>
		<!--最短路径算法-->
		<script type="text/javascript" src="js/dijkstra-algorithm-multi.js"></script>
		<!--路径规划-->
		<script type="text/javascript" src="js/route-planning.js" ></script>
		<!--扫一扫定位-->
		<script type="text/javascript" src="js/scan-position.js" ></script>
		<!--定位算法-->
		<script type="text/javascript" src="js/localization-algorithm.js" ></script>
		<!--摇一摇定位-->
		<script type="text/javascript" src="js/shake-position.js" ></script>
		<!--移动端控制台-->
		<script src="//cdn.bootcss.com/eruda/1.2.6/eruda.min.js"></script>
		<script>
			eruda.init();
		</script>
	</body>

</html>