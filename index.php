<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<!--移动端适配-->
		<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0" /> 
		<title>易停易寻-室外导航</title>
		<link rel="shortcut icon" href="favicon.ico" />
		<link rel="bookmark" href="favicon.ico" />
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
		<!--info window css-->
    	<style type="text/css">
	        .info {
	            border: solid 1px silver;
	        }
	        div.info-top {
	            position: relative;
	            background: none repeat scroll 0 0 #F9F9F9;
	            border-bottom: 1px solid #CCC;
	            border-radius: 5px 5px 0 0;
	        }
	        div.info-top div {
	            display: inline-block;
	            color: #333333;
	            font-size: 14px;
	            font-weight: bold;
	            line-height: 31px;
	            padding: 0 10px;
	        }
	        div.info-top img {
	            position: absolute;
	            top: 10px;
	            right: 10px;
	            transition-duration: 0.25s;
	        }
	        div.info-top img:hover {
	            box-shadow: 0px 0px 5px #000;
	        }
	        div.info-middle {
	            font-size: 12px;
	            padding: 6px;
	            line-height: 20px;
	        }
	        div.info-bottom {
	            height: 0px;
	            width: 100%;
	            clear: both;
	            text-align: center;
	        }
	        div.info-bottom img {
	            position: relative;
	            z-index: 104;
	        }
	        span {
	            margin-left: 5px;
	            font-size: 11px;
	        }
	        .info-middle img {
	            float: left;
	            margin-right: 6px;
	        }
    	</style>
	</head>

	<body>
		<div id="container">
			<div id="tip">
				<input type="text" id="keyword" name="keyword" value="请输入关键字：(选定后搜索)" onfocus='this.value=""' />
			</div>
		</div>
		<script type="application/javascript" src="libs/jquery-3.2.1.min.js"></script>
		<link href="https://cdn.bootcss.com/toastr.js/latest/css/toastr.min.css" rel="stylesheet">
    	<script src="https://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
		<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=0c3a09eb37b40c45ea15be3f634cafd8"></script>
		<!-- UI组件库 1.0 -->
		<script src="//webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
		<script type="text/javascript" src="js/outer-map.js"></script>
	</body>

</html>