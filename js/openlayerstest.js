//声明地图显示的范围
var extent = [0, 0, 3000, 3000];
//定义投影坐标系
var projection = new ol.proj.Projection({
	code: 'EPSG:4326',
	extent: extent
});
//获取当前页面的网址和所带信息
var currentUrl = window.location.href;
var params = currentUrl.split("?")[1];
//判断页面是否是摇一摇得到的
if (params) {
	var ticketStr = params.split("&")[0];
	var isTicket = ticketStr.split("=")[0];
	var ticket = ticketStr.split("=")[1];
}

/****************************大地图图层****************************************/
//第二层坐标圆图层
var style_2_circle = new ol.style.Style({
	fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
		color: 'rgba(255, 255, 255, 1)'
	}),
	stroke: new ol.style.Stroke({ //边界样式
		color: '#c0c0c0',
		width: 1
	})
});
var vectorLayer_2_circle = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/circle-2.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_2_circle
});
var vectorCircleSource = vectorLayer_2_circle.getSource();

//第二层电梯
var style_2_elevator = new ol.style.Style({
	fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
		color: 'rgba(255,215,0, 1)'
	}),
	stroke: new ol.style.Stroke({ //边界样式
		color: '#c0c0c0',
		width: 1
	})
});
var vectorLayer_2_elevator = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/elevator-2.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_2_elevator
});

//第二层停车位
var style_2_parking = new ol.style.Style({
	fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
		color: 'rgba(255, 192, 203, 1)'
	}),
	stroke: new ol.style.Stroke({ //边界样式
		color: '#c0c0c0',
		width: 1
	})
});
var vectorLayer_2_parking = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/parkingplace-2.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_2_parking
});
var vectorSource = vectorLayer_2_parking.getSource();
var spareStyle = new ol.style.Style({
	fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
		color: 'rgba(124, 205, 124, 1)'
	}),
		stroke: new ol.style.Stroke({ //边界样式
		color: '#c0c0c0',
		width: 1
	})
});

/******************************生成空闲车位**************************/
var rand = Math.random();
var num = Math.round(rand * 100);
vectorSource.once('change', function(evt){
	var source=evt.target;
	if(source.getState() === 'ready'){
		features = source.getFeatures();
		//var feas = source.getFeaturesAtCoordinate([105,-533]);
		//feas[0].setStyle(spareStyle);
		for (i=num;i<(num+20);i++) {
			features[i].setStyle(spareStyle);
		}			    	    
	}
});

//第二层线路
var style_2_road = new ol.style.Style({
	fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
		color: 'rgba(209,209,209, 1)'
	}),
	stroke: new ol.style.Stroke({ //边界样式
		color: '#c0c0c0',
		width: 1
	})
});
var vectorLayer_2_road = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/road-2.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_2_road
});

//第二层楼梯
var style_2_stairs = new ol.style.Style({
	fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
		color: 'rgba(175,238,238, 1)'
	}),
	stroke: new ol.style.Stroke({ //边界样式
		color: '#c0c0c0',
		width: 1
	})
});
var vectorLayer_2_stairs = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/stairs-2.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_2_stairs
});

//第二层背景
var style_2_wall = new ol.style.Style({
	fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
		color: 'rgba(180, 180, 180, 1)'
	}),
	stroke: new ol.style.Stroke({ //边界样式
		color: '#c0c0c0',
		width: 1
	})
});
var vectorLayer_2_wall = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/wall-2.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_2_wall
});


/***********************初始化地图视图***********************************/
var mapView = new ol.View({
	projection: projection,
	//初始地图中心
	center: [350,-650],
	//初始缩放大小
	zoom: 2,
	//限制地图拖动范围
	extent: [-1000, -3000, 2000, 1000],
	//限制最大缩放倍数
	maxZoom: 5,
	//限制最小缩放倍数
	minZoom: 0,
	//禁止旋转
	enableRotation: false
});

/********************初始化地图容器**************************************/
var map = new ol.Map({
	target: 'map',
	layers: [
		/*vectorLayer1,
		vectorLayer5,
		vectorLayer2,
		vectorLayer3,
		vectorLayer4,*/
		vectorLayer_2_wall,
		vectorLayer_2_road,
		vectorLayer_2_circle,
		vectorLayer_2_parking,
		vectorLayer_2_elevator,
		vectorLayer_2_stairs,
		//文字图层
		new ol.layer.Image({
			source: new ol.source.ImageStatic({
				url: 'images/textbg.png',
				projection: projection,
				imageExtent: [0, -1165, 890, -150],
				imageSize: [450,500]
			})
		}),
	],
	view: mapView,
	controls: ol.control.defaults().extend([
		//缩放控件
		new ol.control.Zoom({
			target: 'zoom'
		}),
		//适应屏幕控件
		new ol.control.ZoomToExtent({
			target: 'zoom_to_extent',
			extent: [100, -1300, 600, -100]
		}),
		//鼠标坐标显示控件
		new ol.control.MousePosition({
			target: 'mouse_position',
			projection: 'EPSG:4326'
		})
	]),
	pixelRatio: 1
});
//初始化路径规划对话框内容(若之前扫过将在此载入位置)
if(localStorage.parkingplace !== undefined ){
	document.getElementById("finalVertex").value = localStorage.parkingplace;	
}

/********************************单击弹出对话框**********************************/
/**
 * 组成弹出框的元素 
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/*生成弹出框*/
var overlay = new ol.Overlay(({
	element: container,
	autoPan: true,
	autoPanAnimation: {
		duration: 100 //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）  
	}
}));

/*关闭弹出框按钮*/
closer.onclick = function() {
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};

/*
 * @des		弹出框函数
 * @param	pixel	点击的像素点 
 * @return	点击车位时弹出框框并位移到屏幕中心
 */
var displayFeatureInfo = function(pixel) {
	var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
		return feature;
	});

	if(feature) {
		if(feature.get('featuretype') == "Parkingplace" ) {
			var center = feature.get('center');
			var id = feature.get('Id');
			mapView.animate({
				center: center
			}, {
				duration: 1
			});
			content.innerHTML = '<p>您点击的是:' + '<code>' + id + '</code>'+'号车位</p>';
			overlay.setPosition(center);
			map.addOverlay(overlay);
			//为弹出框的按钮添加点击事件
			$("#popup-btn-start").click(function(){
				//设为起点
				document.getElementById("sourceVertex").value = id;
				overlay.setPosition(undefined);
			});
			$("#popup-btn-end").click(function(){
				//设为终点
				document.getElementById("finalVertex").value = id;
				overlay.setPosition(undefined);
			});
		}
	}

};
//地图点击事件返回点击像素点
map.on('click', function(evt) {
	if(evt.dragging) { //如果是拖动地图造成的鼠标移动，则不作处理  
		return;
	}
	var pixel = map.getEventPixel(evt.originalEvent);
	displayFeatureInfo(pixel);
});

var lineLayer;
/*
 * @des		画路径函数
 * @param	pointList	路线点集合
 * @return	让两点之间最短路径显示在图上
 */
function findPath(pointList) {
	//0.清理原先图层
	if(lineLayer){
		map.removeLayer(lineLayer);
	}
	//1.生成线路要素
	var feature = new ol.Feature({
		geometry: new ol.geom.LineString(pointList)
	});
	//2.线路样式
	var lineStyle = new ol.style.Style({
		stroke: new ol.style.Stroke({
			width: 3,
			color: [31, 250, 156, 1]
		})
	});
	feature.setStyle(lineStyle);
	
	//3.让要素生成图层加入地图
	var source = new ol.source.Vector({
		features: [feature]
	});
	lineLayer = new ol.layer.Vector({
		source: source
	});
	map.addLayer(lineLayer);
}



/******************************路径规划功能****************************************/
//为路径规划交换按钮绑定点击事件
$("body").delegate("#exchange","touchstart",function(event){
	var sourceVertex = document.getElementById("sourceVertex").value;
	var finalVertex = document.getElementById("finalVertex").value;
	document.getElementById("sourceVertex").value = finalVertex;
	document.getElementById("finalVertex").value = sourceVertex;
});

//初始化起点终点点标注
var startMarker = document.getElementById('start-marker');
var endMarker = document.getElementById('end-marker');
var startMarkerOverlay = new ol.Overlay(({
	element: startMarker,
	autoPan: true,
	autoPanAnimation: {
		duration: 100
	}
}));
var endMarkerOverlay = new ol.Overlay(({
	element: endMarker,
	autoPan: true,
	autoPanAnimation: {
		duration: 100
	}
}));

//路径规划主要业务逻辑
function myWay(certainPos){
	var sourceVertex = document.getElementById("sourceVertex").value;
	var finalVertex = document.getElementById("finalVertex").value;
	
	var geojsonRoot = "./data/parkingplace-2.geojson";
	
	$.ajax({
		  	url: geojsonRoot,
		  	success: function(result){
				if ((result.features[sourceVertex-1] || sourceVertex == '您当前的位置') && result.features[finalVertex-1]) {
					if (sourceVertex == '您当前的位置') {
						sourceVertex = closestParkingPlace.get('Id');
					} else{
						sourceVertex = result.features[sourceVertex-1].properties.Rid;
					}
					//记录终点坐标
					localStorage.parkingplace = finalVertex;
				 	document.getElementById("finalVertex").value = finalVertex;
				  	//转换id和rid
					finalVertex = result.features[finalVertex-1].properties.Rid;
				}	
			},
		  	dataType: 'json',
			//设置ajax为同步执行
		  	async: false
	});
	//将车位id和图论顶点rid转换
	/*$.getJSON(geojsonRoot,function(result){
		if ((result.features[sourceVertex-1] || sourceVertex == '您当前的位置') && result.features[finalVertex-1]) {
			if (sourceVertex == '您当前的位置') {
				sourceVertex = closestParkingPlace.get('Id');
			} else{
				sourceVertex = result.features[sourceVertex-1].properties.Rid;
			}
			//记录终点坐标
			localStorage.parkingplace = finalVertex;
		 	document.getElementById("finalVertex").value = finalVertex;
		  	//转换id和rid
			finalVertex = result.features[finalVertex-1].properties.Rid;
		}
	});*/
	
	//进行转换后的点坐标间的最短路径寻找
	var jsonRoot = "./data/circle-2.geojson";
	$.ajax({
		  	url: jsonRoot,
		  	success: function(result){
				if (result.features[sourceVertex] && result.features[finalVertex]) {
					var path = searchPath(sourceVertex,finalVertex);
					var pathPos = [];
					var pos;
					for (i=0;i<path.length;i++) {
						var pos = result.features[path[i]].properties.center;
						pathPos[i] = pos;
					}
					//如果有确定的坐标则以此坐标为起点
					if (certainPos.toString() != "") {
						pathPos[0] = certainPos;
					}
					//1.给起点终点加点标注
					//var startPos = result.features[sourceVertex].properties.center;
					var startPos = pathPos[0];
					startMarkerOverlay.setPosition(startPos);
					map.addOverlay(startMarkerOverlay);
					var endPos = pathPos[pathPos.length-1];
					endMarkerOverlay.setPosition(endPos);
					map.addOverlay(endMarkerOverlay);
					//2.搜索路径
					findPath(pathPos);
					//先判断是否为摇一摇状态，如果是才有停止导航的按钮
					if (params) {
						if (isTicket == "ticket" && ticket) {
							document.getElementById('search').innerText = "停止导航";
						}
					}
				} else {
					//该标志长期保持为true，当规划点出问题转化为false
					$(function(){
						$.mytoast({
							text: "请输入正确的起点和终点!",
							type: "warning"
						});
					});	
				}
			},
		  	dataType: 'json',
			//设置ajax为同步执行
		  	async: false
	});
	/*$.getJSON(jsonRoot,function(result){
		if (result.features[sourceVertex] && result.features[finalVertex]) {
			var path = searchPath(sourceVertex,finalVertex);
			var pathPos = [];
			var pos;
			for (i=0;i<path.length;i++) {
				var pos = result.features[path[i]].properties.center;
				pathPos[i] = pos;
			}
			//如果有确定的坐标则以此坐标为起点
			if (certainPos.toString() != "") {
				pathPos[0] = certainPos;
			}
			//1.给起点终点加点标注
			//var startPos = result.features[sourceVertex].properties.center;
			var startPos = pathPos[0];
			startMarkerOverlay.setPosition(startPos);
			map.addOverlay(startMarkerOverlay);
			var endPos = pathPos[pathPos.length-1];
			endMarkerOverlay.setPosition(endPos);
			map.addOverlay(endMarkerOverlay);
			//2.搜索路径
			findPath(pathPos);
			//先判断是否为摇一摇状态，如果是才有停止导航的按钮
			if (params) {
				if (isTicket == "ticket" && ticket) {
					document.getElementById('search').innerText = "停止导航";
				}
			}
		} else {
			//该标志长期保持为true，当规划点出问题转化为false
			$(function(){
				$.mytoast({
					text: "请输入正确的起点和终点!",
					type: "warning"
				});
			});	
		}
	});*/
}
//记录离定位位置最近的车位
var closestParkingPlace,navigateSwitcher = false;
//为路径规划导航按钮绑定点击事件
$("body").delegate("#search","click",function(event){
	//关闭模态框
	$("#myModal").modal('hide');
	
	//先判断是否为摇一摇状态，如果是才有停止导航的按钮
	if (params) {
		if (isTicket == "ticket" && ticket) {
			if (!navigateSwitcher) {
				//生成起点终点标注
				startMarkerOverlay = new ol.Overlay(({
					element: startMarker,
					autoPan: true,
					autoPanAnimation: {
						duration: 100
					}
				}));
				endMarkerOverlay = new ol.Overlay(({
					element: endMarker,
					autoPan: true,
					autoPanAnimation: {
						duration: 100
					}
				}));
				myWay([]);
			} else{
				//清除图层
				if(lineLayer && startMarkerOverlay && endMarkerOverlay){
					map.removeLayer(lineLayer);
					map.removeOverlay(startMarkerOverlay);
					map.removeOverlay(endMarkerOverlay);
				}
				document.getElementById('search').innerText = "导航";
			}
			//启动导航的标志,根据点击次数自动置反
			navigateSwitcher = !navigateSwitcher;
		}
	} else{
		//直接进行路径规划
		myWay([]);
	}

});

/****************************扫一扫定位************************************/
/*
 * @des		扫描定位的函数
 * @param	locx,locy	车位坐标
 * 			parkingplace	车位号
 * @return	让定位的位置显示在图上
 */
function scanPos(locx,locy,parkingplace){
	//记录定位位置
	var loc = [locx,locy];
	//定位到该点
	mapView.animate({
		center: loc
	}, {
		duration: 1
	});
	content.innerHTML = '<p>扫码定位的车位是:' + '<code>' + parkingplace + '</code>'+'号车位</p>';
	overlay.setPosition(loc);
	map.addOverlay(overlay);
	//为弹出框的按钮添加点击事件
	$("#popup-btn-start").click(function(){
		//设为起点
		document.getElementById("sourceVertex").value = parkingplace;
		overlay.setPosition(undefined);
	});
	$("#popup-btn-end").click(function(){
		//设为终点
		document.getElementById("finalVertex").value = parkingplace;
		overlay.setPosition(undefined);
		//将位置存储到本地
		if(typeof(Storage)!=="undefined")
		{
		    //支持 localStorage  sessionStorage 对象!
		    localStorage.parkingplace = parkingplace;
		    document.getElementById("finalVertex").value = parkingplace;
		} else {
		    // 抱歉! 不支持 web 存储。
		    $(function(){
				$.mytoast({
					text: "您目前的浏览器版本不支持记忆功能，请手动输入车位号。",
					type: "error"
				});
			});
		}
	});
	
	//弹出吐司提示用户
	$(function(){
		$.mytoast({
			text: "已为您记录当前位置，点击右上角可查看。",
			type: "success"
		});
	});
	
}

wx.ready(function(){
	//为扫一扫按钮绑定点击事件
	document.querySelector('#scanhref').onclick = function() {  
		wx.scanQRCode({  
			needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
			scanType : [ "qrCode", "barCode" ], // 可以指定扫二维码还是一维码，默认二者都有  
			success : function(res) {  
			    resultStr = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			    //1.解析二维码
			    var parkInfo = JSON.parse(resultStr);
			    if(parkInfo) {
				    //2.分析扫码结果得出属于哪个停车场
				    //3.根据分析结果进入对应停车场并标注对应点
				    var parkinglot = parkInfo.parkinglot;
				    if(parkinglot == "nanligong") {
					    var locx = parkInfo.locx;
					    var locy = parkInfo.locy;
					    var parkingplace = parkInfo.parkingplace;
					    scanPos(locx,locy,parkingplace);
				    }	
			    }
			}  
		});
	};
});

/****************************定位算法********************************/
//总的权值
var totalWeight = 0;

//三边加权质心定位算法
/*
 * @params 两圆圆心坐标及半径
 * @return 返回两圆交点坐标
 * */
function intersection(x1,y1,r1,x2,y2,r2){
	var d = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));// 两圆心距离
	//两圆交点集合
	var points = [];
	if (d<(r1+r2)) {
		//两圆相交
		var coor = [];
	}
	if (d > r1 + r2 || d < Math.abs(r1 - r2)) {//相离或内含
		return points;
	} else if (x1 == x2 && y1 == y2) {//同心圆
		return points;
	} else if (y1 == y2 && x1 != x2) {
		var a = ((r1 * r1 - r2 * r2) - (x1 * x1 - x2 * x2)) / (2 * x2 - 2 * x1);
		if (d == Math.abs(r1 - r2) || d == r1 + r2) {// 只有一个交点时
			coor = [];
			coor[0] = a;
			coor[1] = y1;
			points.push(coor);
		} else{// 两个交点
			var t = r1 * r1 - (a - x1) * (a - x1);
			coor = [];
			coor[0] = a;
			coor[1] = y1 + Math.sqrt(t);
			points.push(coor);
			coor = [];
			coor[0] = a;
			coor[1] = y1 - Math.sqrt(t);
			points.push(coor);
		}
	} else if (y1 != y2) {
		var k, disp;
		k = (2 * x1 - 2 * x2) / (2 * y2 - 2 * y1);
		disp = ((r1 * r1 - r2 * r2) - (x1 * x1 - x2 * x2) - (y1 * y1 - y2 * y2))
				/ (2 * y2 - 2 * y1);// 直线偏移量
		var a, b, c;
		a = (k * k + 1);
		b = (2 * (disp - y1) * k - 2 * x1);
		c = (disp - y1) * (disp - y1) - r1 * r1 + x1 * x1;
		var disc;
		disc = b * b - 4 * a * c;// 一元二次方程判别式
		if (d == Math.abs(r1 - r2) || d == r1 + r2) {
			coor = [];
			coor[0] = (-b) / (2 * a);
			coor[1] = k * coor[0] + disp;
			points.push(coor);
		} else {
			coor = [];
			coor[0] = ((-b) + Math.sqrt(disc)) / (2 * a);
			coor[1] = k * coor[0] + disp;
			points.push(coor);
			coor = [];
			coor[0] = ((-b) - Math.sqrt(disc)) / (2 * a);
			coor[1] = k * coor[0] + disp;
			points.push(coor);
		}
	}
	return points;
}
/*
 * @params 三个圆圆心及半径 
 * @return 返回三圆交点组成的三角形的质心坐标
 * */
function triCentroid(x1, y1, r1, x2, y2, r2, x3, y3, r3) {
	/*有效交叉点1*/
	var p1 = [];
	/*有效交叉点*/
	var p2 = [];
	/*有效交叉点3*/
	var p3 = [];
	/*三点质心坐标*/
	var centroid = [];
	/*r1,r2交点*/
	var intersections1 = intersection(x1, y1, r1, x2, y2, r2);
	if(intersections1 != undefined && intersections1.length > 0) {
		for(i = 0; i < intersections1.length; i++) {
			if(p1.length == 0 && Math.pow(intersections1[i][0] - x3, 2) + Math.pow(intersections1[i][1] - y3, 2) <= Math.pow(r3, 2)) {
				p1 = intersections1[i];
			} else if(p1.length > 0) {
				if(Math.pow(intersections1[i][0] - x3, 2) + Math.pow(intersections1[i][1] - y3, 2) <= Math.pow(r3, 2)) {
					if(Math.sqrt(Math.pow(intersections1[i][0] - x3, 2) +
							Math.pow(intersections1[i][1] - y3, 2)) > Math.sqrt(Math.pow(p1[0] -
							x3, 2) + Math.pow(p1[1] - y3, 2))) {
						p1 = intersections1[i];
					}
				} else {
					if(Math.sqrt(Math.pow(intersections1[i][0] - x3, 2) +
							Math.pow(intersections1[i][1] - y3, 2)) < Math.sqrt(Math.pow(p1[0] -
							x3, 2) + Math.pow(p1[1] - y3, 2))) {
						p1 = intersections1[i];
					}
				}
			} else if(p1.length == 0 && Math.pow(intersections1[i][0] - x3, 2) + Math.pow(intersections1[i][1] - y3, 2) > Math.pow(r3, 2)) {
				p1 = intersections1[i];
			}
		}
	} else { //没有交点定位错误
		return null;
	}
	/*r1,r3交点*/
	var intersections2 = intersection(x1, y1, r1, x3, y3, r3);
	if(intersections2 != undefined && intersections2.length > 0) {
		for(i = 0; i < intersections2.length; i++) {
			if(p2.length == 0 && Math.pow(intersections2[i][0] - x2, 2) +
				Math.pow(intersections2[i][1] - y2, 2) <= Math.pow(r2, 2)) {
				p2 = intersections2[i];
			} else if(p2.length > 0) {
				if(Math.pow(intersections2[i][0] - x2, 2) + Math.pow(intersections2[i][1] - y2, 2) <= Math.pow(r2, 2)) {
					if(Math.sqrt(Math.pow(intersections2[i][0] - x2, 2) +
							Math.pow(intersections2[i][1] - y2, 2)) > Math.sqrt(Math.pow(p2[0] -
							x2, 2) + Math.pow(p2[1] - y2, 2))) {
						p2 = intersections2[i];
					}
				} else {
					if(Math.sqrt(Math.pow(intersections2[i][0] - x2, 2) +
							Math.pow(intersections2[i][1] - y2, 2)) < Math.sqrt(Math.pow(p2[0] -
							x2, 2) + Math.pow(p2[1] - y2, 2))) {
						p2 = intersections2[i];
					}
				}
			} else if(p2.length == 0 && Math.pow(intersections2[i][0] - x2, 2) +
				Math.pow(intersections2[i][1] - y2, 2) > Math.pow(r2, 2)) {
				p2 = intersections2[i];
			}
		}
	} else { //没有交点定位错误
		return null;
	}
	/*r2,r3交点*/
	var intersections3 = intersection(x2, y2, r2, x3, y3, r3);
	if(intersections3 != undefined && intersections3.length > 0) {
		for(i = 0; i < intersections3.length; i++) {
			if(p3.length == 0 && Math.pow(intersections3[i][0] - x1, 2) +
				Math.pow(intersections3[i][1] - y1, 2) <= Math.pow(r1, 2)) {
				p3 = intersections3[i];
			} else if(p3.length > 0) {
				if(Math.pow(intersections3[i][0] - x1, 2) + Math.pow(intersections3[i][1] - y1, 2) <= Math.pow(r1, 2)) {
					if(Math.sqrt(Math.pow(intersections3[i][0] - x1, 2) +
							Math.pow(intersections3[i][1] - y1, 2)) > Math.sqrt(Math.pow(p3[0] -
							x1, 2) + Math.pow(p3[1] - y1, 2))) {
						p3 = intersections3[i];
					}
				} else {
					if(Math.sqrt(Math.pow(intersections3[i][0] - x1, 2) +
							Math.pow(intersections3[i][1] - y1, 2)) < Math.sqrt(Math.pow(p3[0] -
							x1, 2) + Math.pow(p3[1] - y1, 2))) {
						p3 = intersections3[i];
					}
				}
			} else if(p3.length == 0 && Math.pow(intersections3[i][0] - x1, 2) +
				Math.pow(intersections3[i][1] - y1, 2) > Math.pow(r1, 2)) {
				p3 = intersections3[i];
			}
		}
	} else { //没有交点定位错误
		return null;
	}
	/*质心*/
	centroid[0] = (p1[0] + p2[0] + p3[0]) / 3;
	centroid[1] = (p1[1] + p2[1] + p3[1]) / 3;

	return centroid;
}
/*
 * @params 三个圆的信息
 * @return 返回通过该组基站定位后加权的坐标
 * */
function calculate(x1, y1, r1, x2, y2, r2, x3, y3, r3) {
	//得到未加权的质心坐标
	var rawLoc = triCentroid(x1, y1, r1, x2, y2, r2, x3, y3, r3);
	//alert("rawLoc:"+rawLoc);
	if(rawLoc) {
		//对应的权值
		var weightLoc = [];
		var weight = 0;
		weight += (1.0 / r1 + 1.0 / r2 + 1.0 / r3);
		totalWeight += weight;
		//计算加权过后的坐标
		for(i = 0; i < 2; i++) {
			weightLoc[i] = rawLoc[i] * weight;
		}
		//alert("weightLoc:"+weightLoc);
	}
	return weightLoc;
}

/*
 * @params  arr	所有的设备编号
 * 			size	选取的个数
 * @return 返回所有组合情况
 * */
function doGroup(arr, size) {
	var allResult = [];
	(function(arr, size, result) {
		var arrLen = arr.length;
		if(size > arrLen) {
			return;
		}
		if(size == arrLen) {
			allResult.push([].concat(result, arr))
		} else {
			for(var i = 0; i < arrLen; i++) {
				var newResult = [].concat(result);
				newResult.push(arr[i]);

				if(size == 1) {
					allResult.push(newResult);
				} else {
					var newArr = [].concat(arr);
					newArr.splice(0, i + 1);
					arguments.callee(newArr, size - 1, newResult);
				}
			}
		}
	})(arr, size, []);
	return allResult;
}

var loc27 = [335,-335],
	loc28 = [535,-335],
	loc29 = [535,-460],
 	loc30 = [335,-460],
 	loc31 = [435,398];
var imgPos = [];
/*
 * @params 设备组信息
 * @return 返回最后的加权坐标
 * */
function getLocation(beacons) {
	totalWeight = 0;
	if(beacons.length < 3) {
		return;
	}
	var x1, y1, r1, x2, y2, r2, x3, y3, r3, loc1, loc2, loc3;;
	var arr = [];
	var finalLoc = [0, 0];
	for(i = 0; i < beacons.length; i++) {
		arr[i] = i;
	}
	//将beacons分组
	var allGroup = doGroup(arr, 3);
	//对每个组合计算加权坐标
	for(k = 0; k < allGroup.length; k++) {
		//初始化所有beacon距离
		var beacon1 = beacons[allGroup[k][0]];
		var beacon2 = beacons[allGroup[k][1]];
		var beacon3 = beacons[allGroup[k][2]];
		r1 = Math.sqrt(Math.pow(beacon1.accuracy, 2) - 0.9 * 0.9) * 25;
		r2 = Math.sqrt(Math.pow(beacon2.accuracy, 2) - 0.9 * 0.9) * 25;
		r3 = Math.sqrt(Math.pow(beacon3.accuracy, 2) - 0.9 * 0.9) * 25;

		if(beacon1.minor == '13029') {
			loc1 = loc29;
		} else if(beacon1.minor == '13030') {
			loc1 = loc30;
		} else if(beacon1.minor == '13031') {
			loc1 = loc31;
		} else if(beacon1.minor == '13027') {
			loc1 = loc27;
		} else if(beacon1.minor == '13028') {
			loc1 = loc28;
		}
		if(beacon2.minor == '13029') {
			loc2 = loc29;
		} else if(beacon2.minor == '13030') {
			loc2 = loc30;
		} else if(beacon2.minor == '13031') {
			loc2 = loc31;
		} else if(beacon2.minor == '13027') {
			loc2 = loc27;
		} else if(beacon2.minor == '13028') {
			loc2 = loc28;
		}
		if(beacon3.minor == '13029') {
			loc3 = loc29;
		} else if(beacon3.minor == '13030') {
			loc3 = loc30;
		} else if(beacon3.minor == '13031') {
			loc3 = loc31;
		} else if(beacon3.minor == '13027') {
			loc3 = loc27;
		} else if(beacon3.minor == '13028') {
			loc3 = loc28;
		}
		//alert(r1+"---"+r2+"---"+r3+"==="+loc1+"---"+loc2+"---"+loc3);
		var weightLoc = calculate(loc1[0], loc1[1], r1, loc2[0], loc2[1], r2, loc3[0], loc3[1], r3);
		if(weightLoc) {
			finalLoc[0] += weightLoc[0];
			finalLoc[1] += weightLoc[1];
		}
	}
	//得出最终坐标
	finalLoc = [finalLoc[0] / totalWeight, finalLoc[1] / totalWeight];
	console.log(finalLoc);
	return finalLoc;
}



/*********************************自创定位算法***************************************/
/*
 * @params loc1 距离最近的设备坐标
 * 		   loc2 距离次近的设备坐标
 * 		   minDis 与最近设备间的距离
 * @return 定位的坐标
 * */
function calculateLoc(loc1,loc2,minDis){
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if (isAndroid) {
		
	} else if(isiOS){
		
	} else {
		
	}
	if (loc1 && loc2 && minDis) {
		if(minDis<=1){
			return loc1;
		} else if(minDis>1 && minDis<3.5){
			//比例系数
			var lambda = 1/2;
			var loc = [(loc1[0]+lambda*loc2[0])/(1+lambda),(loc1[1]+lambda*loc2[1])/(1+lambda)];
			return loc;
		} else {
			var loc = [(loc1[0]+loc2[0])/2,(loc1[1]+loc2[1])/2];
			return loc;
		}
	}
}

/*
 * @params beacons 搜索得到的设备集合 
 * @return 返回所在道路两端的设备
 * */
function getLoc(beacons){
	if (beacons) {
		var minDisBeacon,secDisBeacon;
		//1.将设备数组按距离从小到大排好
		var beaconsArr = beacons.sort(function(a,b){
			return a.accuracy - b.accuracy;
		});
		//2.预先找出距离最近的两个设备
		minDisBeacon = beaconsArr[0];
		secDisBeacon = beaconsArr[1];
		var minDis = minDisBeacon.accuracy;
		var loc1,loc2,pos;
		var myjsonRoot = "./data/ibeacons.json";
		$.ajax({
		  	url: myjsonRoot,
		  	success: function(result){
					//3.遍历关系文件找出距离最近设备的具体信息
					for (i=0;i<result.ibeacons.length;i++) {
						if (result.ibeacons[i].minor == minDisBeacon.minor) {
							minDisBeacon = result.ibeacons[i];
							//4.查看与最近设备临近的设备，以判断最近和次近的设备是否相连
							var arrAdjacentBeacons = [];
							for (j=0;j<minDisBeacon.adjacentbeacons.length;j++) {
								arrAdjacentBeacons.push(minDisBeacon.adjacentbeacons[j]);
							}
							if ($.inArray(secDisBeacon.minor,arrAdjacentBeacons) != -1) {
								//5.如若相连则去寻找次近设备的信息
								for (k=0;k<result.ibeacons.length;k++) {
									if (result.ibeacons[k].minor == secDisBeacon.minor){
										secDisBeacon = result.ibeacons[k];
									}
								}
								//6.获得两设备在地图上的坐标
								loc1 = minDisBeacon.location;
								loc2 = secDisBeacon.location;
								//console.log(loc1+"  "+loc2+"  "+minDis);
								//7.根据以上信息将最终坐标计算出来
								pos = calculateLoc(loc1,loc2,minDis);
							} else {
								//5.1如若不相连,则寻找第三近的设备作为次近设备
								secDisBeacon = beaconsArr[2];
								if ($.inArray(secDisBeacon.minor,arrAdjacentBeacons) != -1) {
									//6.1.如若相连则去寻找该设备的信息
									for (k=0;k<result.ibeacons.length;k++) {
										if (result.ibeacons[k].minor == secDisBeacon.minor){
											secDisBeacon = result.ibeacons[k];
										}
									}
									//7.1.获得两设备在地图上的坐标
									loc1 = minDisBeacon.location;
									loc2 = secDisBeacon.location;
									//console.log(loc1+"  "+loc2+"  "+minDis);
									//8.1.根据以上信息将最终坐标计算出来
									pos = calculateLoc(loc1,loc2,minDis);
								} else {
									pos = [];
								}
							}
						}
					}
				},
		  	dataType: 'json',
			//设置ajax为同步执行
		  	async: false
		});
		//alert("min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
		return pos;
	}
}

/****************************摇一摇定位************************************/
if(params) {
	if(isTicket == "ticket" && ticket) {
		//1.摇一摇关注公众号
		BeaconAddContactJsBridge.ready(function() {
			//判断是否关注
			BeaconAddContactJsBridge.invoke('checkAddContactStatus', {}, function(apiResult) {
				if(apiResult.err_code == 0) {
					var status = apiResult.data;
					if(status == 1) {
					} else {
						//跳转到关注页
						BeaconAddContactJsBridge.invoke('jumpAddContact');
					}
				} else {
					//alert(apiResult.err_msg);
				}
			});
		});
		//2.调用jssdk搜索ibeacon
		//将文本框中内容改为当前位置
		document.getElementById("sourceVertex").value = "您当前的位置";
		wx.ready(function() {
			//开始搜索beacon设备
			wx.startSearchBeacons({
				ticket: ticket,
				complete: function(argv) {
					//回调函数
					if(argv.errMsg == "startSearchBeacons:ok") {
						wx.onSearchBeacons({
							complete: function(argv) {
								var beacons = argv.beacons;
								/*var tempPos = getLocation(beacons);
								if(tempPos.length != 0 && tempPos.toString() != "NaN,NaN") {
									imgPos = tempPos;
								}
								//获得离定位点最近的车位信息并记录在文本框中
								closestParkingPlace = vectorSource.getClosestFeatureToCoordinate(imgPos);
								if(document.getElementById("finalVertex").value != "请输入终点车位号" && navigateSwitcher == true) {
									myWay();
								}
								if(imgPos.toString() != "") {
									startMarkerOverlay.setPosition(imgPos);
									map.addOverlay(startMarkerOverlay);
								}*/
								
								/******************************************************/
								var tempPos = getLoc(beacons);
								if (tempPos.toString() != "") {
									imgPos = tempPos;
									//alert(imgPos);
									//获得离定位点最近的车位信息并记录在文本框中
									closestParkingPlace = vectorCircleSource.getClosestFeatureToCoordinate(imgPos);
								}
								if(document.getElementById("finalVertex").value != "请输入终点车位号" && navigateSwitcher == true) {
									myWay(imgPos);
								}
								if (imgPos.toString() != "") {
									startMarkerOverlay.setPosition(imgPos);
									map.addOverlay(startMarkerOverlay);
								}
							}
						});
					}
				}
			});
		});
	}
}

//测试用例
/*var beacons1 = {
   "beacons":[
           	{
           	"major":10008,
           	"minor":13027,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"1.5",
           	"rssi":"-66",
           	"proximity":"1",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13028,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"5",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13029,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"5",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13030,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"4.9",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13031,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"3.7",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	}
           	]
};
//getLocation(beacons1.beacons);

vectorCircleSource.once('change', function(evt){
	var source=evt.target;
	if(source.getState() === 'ready'){
		var tempPos = getLoc(beacons1.beacons);
		if(tempPos.toString() != "") {
			imgPos = tempPos;
			//获得离定位点最近的车位信息并记录在文本框中
			closestParkingPlace = vectorCircleSource.getClosestFeatureToCoordinate(imgPos);
		}
		console.log(imgPos);
		//点击导航后
		if(document.getElementById("finalVertex").value != "请输入终点车位号" && navigateSwitcher == true) {
			myWay(imgPos);
		}
		if(imgPos.toString() != "") {
			startMarkerOverlay.setPosition(imgPos);
			map.addOverlay(startMarkerOverlay);
		}	    	    
	}
});*/
