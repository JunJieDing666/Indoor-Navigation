<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<!--移动端适配-->
		<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0" /> 
		<title>地图</title>
		<style type="text/css">
			html,
			body {
				width: 100%;
				height: 100%;
				margin: 0px;
			}
			
			#container {
				height: 100%;
				width: 100%;
				float: left;
			}
			
			.info-title {
				color: white;
				font-size: 14px;
				background-color: rgba(0, 155, 255, 0.8);
				line-height: 26px;
				padding: 0px 0 0 6px;
				font-weight: lighter;
				letter-spacing: 1px
			}
			
			#scan {
				float: right;
				position: inherit;
				z-index: 2000;
				padding: 5px;
			}
			
			#scanbtn {
				font-size: 0.85em;
			}
			
			#tip {
				background-color: #ddf;
				color: #333;
				border: 0.5px solid silver;
				box-shadow: 3px 4px 3px 0px silver;
				position: absolute;
				top: 5px;
				left: 5px;
				border-radius: 5px;
				overflow: hidden;
				line-height: 20px;
				z-index: 2000;
			}
			
			#tip input[type="text"] {
				height: 2em;
				border: 0;
				padding-left: 5px;
				width: 18em;
				border-radius: 3px;
				outline: none;
			}
		</style>
	</head>

	<body>
		<div id="container">
			<div id="tip">
				<input type="text" id="keyword" name="keyword" value="请输入关键字：(选定后搜索)" onfocus='this.value=""' />
			</div>
		</div>
		<script type="application/javascript" src="http://demo.js.jdk5.com/jquery-1.12.3.min.js"></script>
		<script type="text/javascript" src="js/mytoast.js" ></script>
		<link rel="stylesheet" href="css/mytoast.css" />
		<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=0c3a09eb37b40c45ea15be3f634cafd8"></script>
		<script type="text/javascript" src="js/testonmap.js"></script>
	</body>

</html>