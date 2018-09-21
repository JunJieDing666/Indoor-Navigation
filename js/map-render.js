/* *
 * 地图图层渲染
 * 
 * */

/* *
 * @func 渲染圆图层
 * @param url_circle 圆图层的geojson文件
 * @return vectorLayer_circle 圆图层变量
 * */
function mapRenderCircle(url_circle) {
	//第一层坐标圆图层
	var style_circle = new ol.style.Style({
		fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
			color: 'rgba(255, 255, 255, 1)'
		}),
		stroke: new ol.style.Stroke({ //边界样式
			color: '#c0c0c0',
			width: 1
		})
	});
	var vectorLayer_circle = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: url_circle,
			projection: projection,
			format: new ol.format.GeoJSON({
				extractStyles: false
			})
		}),
		style: style_circle
	});
	vectorCircleSource = vectorLayer_circle.getSource();
	//第一层坐标圆的源
	return vectorLayer_circle;
}

/* *
 * @func 渲染电梯图层
 * @param url_elevator 电梯图层的geojson文件
 * @return vectorLayer_elevator 电梯图层变量
 * */
function mapRenderElevator(url_elevator) {
	//第一层电梯
	var style_elevator = new ol.style.Style({
		fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
			color: 'rgba(255,215,0, 1)'
		}),
		stroke: new ol.style.Stroke({ //边界样式
			color: '#c0c0c0',
			width: 1
		})
	});
	var vectorLayer_elevator = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: url_elevator,
			projection: projection,
			format: new ol.format.GeoJSON({
				extractStyles: false
			})
		}),
		style: style_elevator
	});
	return vectorLayer_elevator;
}

/* *
 * @func 渲染车位图层
 * @param url_parking 车位图层的geojson文件
 * @return vectorLayer_elevator 车位图层变量
 * */
function mapRenderParkingPlace(url_parking, spareplace, index) {
	//初始化停车位，并设置所有车位为红色（占用状态）
	var style_parking = new ol.style.Style({
		fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
			color: 'rgba(255, 192, 203, 1)'
		}),
		stroke: new ol.style.Stroke({ //边界样式
			color: '#c0c0c0',
			width: 1
		})
	});
	var vectorLayer_parking = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: url_parking,
			projection: projection,
			format: new ol.format.GeoJSON({
				extractStyles: false
			})
		}),
		style: style_parking
	});

	//获得停车位图层的源
	vectorSource = vectorLayer_parking.getSource();
	//空闲车位样式（绿色）
	var spareStyle = new ol.style.Style({
		fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
			color: 'rgba(124, 205, 124, 1)'
		}),
		stroke: new ol.style.Stroke({ //边界样式
			color: '#c0c0c0',
			width: 1
		})
	});
	//空闲车位的源,由于直接拷贝会影响原来的source,这里采用重新addFeature来构造
	var spareVectorSource = new ol.source.Vector({
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	});
	//渲染空闲车位
	vectorSource.once('change', function(evt) {
		var source = evt.target;
		var spare = spareplace[index];
		if(source.getState() === 'ready') {
			//1.获取所有车位元素
			parkingplaceFeatures = source.getFeatures();
			//2.车位元素并非顺序排列，所以先记录下所有元素的id（例：2,5,1,6,44,12....）
			var Ids = [];
			for(var i = 0; i < parkingplaceFeatures.length; i++) {
				Ids.push(parkingplaceFeatures[i].getProperties().Id);
			}
			//3.然后从中找到空闲车位id所对应的特征元素的下标（例：id为5的车位下标为2）
			for(var i = 0; i < spare.length; i++) {
				var id2key = Ids.indexOf(spare[i]);
				parkingplaceFeatures[id2key].setStyle(spareStyle);
				//将空闲车位的信息记录起来，用于后续找最近车位
				spareVectorSource.addFeature(parkingplaceFeatures[id2key]);
			}
			//将该楼层空闲车位情况记录下来
			spareVectorSourceJson[index] = spareVectorSource;
		}
	});

	return vectorLayer_parking;
}

/* *
 * @func 渲染路线图层
 * @param url_road 路线图层的geojson文件
 * @return vectorLayer_road 路线图层变量
 * */
function mapRenderRoad(url_road) {
	var style_road = new ol.style.Style({
		fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
			color: 'rgba(209,209,209, 1)'
		}),
		stroke: new ol.style.Stroke({ //边界样式
			color: '#c0c0c0',
			width: 1
		})
	});
	var vectorLayer_road = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: url_road,
			projection: projection,
			format: new ol.format.GeoJSON({
				extractStyles: false
			})
		}),
		style: style_road
	});
	return vectorLayer_road;
}

/* *
 * @func 渲染楼梯图层
 * @param url_stairs 楼梯图层的geojson文件
 * @return vectorLayer_stairs 楼梯图层变量
 * */
function mapRenderStairs(url_stairs) {
	var style_stairs = new ol.style.Style({
		fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
			color: 'rgba(175,238,238, 1)'
		}),
		stroke: new ol.style.Stroke({ //边界样式
			color: '#c0c0c0',
			width: 1
		})
	});
	var vectorLayer_stairs = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: url_stairs,
			projection: projection,
			format: new ol.format.GeoJSON({
				extractStyles: false
			})
		}),
		style: style_stairs
	});
	return vectorLayer_stairs;
}

/* *
 * @func 渲染背景图层
 * @param url_wall 背景图层的geojson文件
 * @return vectorLayer_wall 背景图层变量
 * */
function mapRenderWall(url_wall) {
	var style_wall = new ol.style.Style({
		fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
			color: 'rgba(180, 180, 180, 1)'
		}),
		stroke: new ol.style.Stroke({ //边界样式
			color: '#c0c0c0',
			width: 1
		})
	});
	var vectorLayer_wall = new ol.layer.Vector({
		source: new ol.source.Vector({
			url: url_wall,
			projection: projection,
			format: new ol.format.GeoJSON({
				extractStyles: false
			})
		}),
		style: style_wall
	});
	return vectorLayer_wall;
}

/* *
 * @func	根据输入的数据动态生成楼层控件
 * @param	startF 起始楼层（num）
 * 			endF 终点楼层（num）（此二者输入大小关系随意）
 * 			currF 指定初始化显示哪一层（不填默认为楼层较高的一个）
 * @return	null
 * */
function floorCtrl(startF, endF, currF) {
	//sF始终为较高层，eF始终为较低层
	var sF = startF > endF ? startF : endF;
	var eF = startF > endF ? endF : startF;
	//如果当前楼层的初始化值不在
	if(currF < eF || currF > sF) {
		alert("floorCtrl函数参数设置错误");
	}
	//检测是否加载了jquery库
	if(typeof jQuery == 'undefined') {
		alert("jQuery library is not found");
	}
	//设置currF默认值为1
	if(arguments.length == 2) {
		var currF = sF;
	}
	var fcDiv = $('#float-left');
	for(var i = sF; i >= eF; i--) {
		if(i == 0) continue;
		fcDiv.append("<a href=\"javascript:;\">" + i + "F" + "</a>");
	}
	$('#float-left a').each(function(index, dom) {
		if($(dom).text() == (currF + "F")) {
			$(dom).addClass("on");
		}
	});
}

/********************初始化地图**************************************/
/* *
 * @func 根据楼层初始化对应的各图层，全局变量layers增加一条记录，例如：‘1F’：layergroup
 * @param index 楼层对应索引，例：'1F'
 * @return null
 * */
function layerInit(index) {
	if(!arguments.length) {
		//如果没有输入,则默认初始化当前楼层的图层
		var index = $('#float-left a.on').html();
	}

	var layergroup = [];
	//如果该层图层没有初始化过
	if(!layers[index]) {
		vectorLayer_circle = mapRenderCircle(mapRenderInfo['floor'][index]['circle']);
		vectorLayer_elevator = mapRenderElevator(mapRenderInfo['floor'][index]['elevator']);
		vectorLayer_parking = mapRenderParkingPlace(mapRenderInfo['floor'][index]['parkingplace'], spare, index);
		vectorLayer_road = mapRenderRoad(mapRenderInfo['floor'][index]['road']);
		vectorLayer_stairs = mapRenderStairs(mapRenderInfo['floor'][index]['stairs']);
		vectorLayer_wall = mapRenderWall(mapRenderInfo['floor'][index]['wall']);
		layergroup = [vectorLayer_wall, vectorLayer_road, vectorLayer_circle,
			vectorLayer_elevator, vectorLayer_parking, vectorLayer_stairs
		];
		layers[index] = layergroup;
	}

}

/* *
 * @func 初始化地图(立即执行函数)
 * @param null
 * @return null
 * */
var mapInit = function() {
	//1.通过RESTful发送该停车场的名称或编号向后端请求获得地图信息相关数据的所有url和空闲车位编号
	mapRenderInfo = {
		map_name: "CenterMall",
		floor: {
			'1F': {
				circle: "data/1-circle.geojson",
				elevator: "data/1-elevator.geojson",
				parkingplace: "data/1-parkingplace.geojson",
				road: "data/1-road.geojson",
				stairs: "data/1-stairs.geojson",
				wall: "data/1-wall.geojson",
				matrix: "data/1-matrix.json",
				beacons: "data/ibeacons.json"
			},
			'2F': {
				circle: "data/2-circle.geojson",
				elevator: "data/2-elevator.geojson",
				parkingplace: "data/2-parkingplace.geojson",
				road: "data/2-road.geojson",
				stairs: "data/2-stairs.geojson",
				wall: "data/2-wall.geojson",
				matrix: "data/2-matrix.json",
				beacons: "data/ibeacons.json"
			}
		},
		ibeacon: {
			'ibeacons': "data/ibeacons.json"
		}
	};
	spare = {
		'1F': [50, 77, 61],
		'2F': [168, 145]
	};

	//2.初始化楼层控件
	var floorArr = Object.keys(mapRenderInfo['floor']);
	var sF = floorArr[0];
	sF = parseInt(sF.substring(0, sF.length - 1));
	var eF = floorArr[floorArr.length - 1];
	eF = parseInt(eF.substring(0, eF.length - 1));
	//动态生成楼层控件
	floorCtrl(sF, eF, sF);

	//3.初始化地图视图框
	mapView = new ol.View({
		projection: projection,
		//初始地图中心
		center: [520, -150],
		//初始缩放大小
		zoom: 1,
		//限制地图拖动范围
		extent: [-1000, -3000, 2000, 1000],
		//限制最大缩放倍数
		maxZoom: 5,
		//限制最小缩放倍数
		minZoom: 0,
		//禁止旋转
		enableRotation: false
	});

	//4.初始化当前楼层地图
	var index = $('#float-left a.on').html();
	layerInit(index);
	map = new ol.Map({
		target: 'map',
		layers: layers[index],
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
}();

/******自动加载路径规划对话框内容(若之前扫过将在此载入位置)*******/
if(localStorage.parkingplace !== undefined) {
	document.getElementById("finalVertex").value = localStorage.parkingplace;
}

/********************************单击弹出popup**********************************/
//关闭弹出框按钮
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

	if(feature && (feature.get('featuretype') == "parkingplace" || feature.get('featuretype') == "point")) {
		var center = feature.get('center');
		var id = feature.get('Id');
		mapView.animate({
			center: center
		}, {
			duration: 1
		});
		content.innerHTML = '<p>您点击的是:' + '<code>' + id + '</code>' + '号车位</p>';
		overlay.setPosition(center);
		map.addOverlay(overlay);
		//为弹出框的按钮添加点击事件
		$("#popup-btn-start").click(function() {
			//设为起点
			startPos = center;
			startFloor = feature.get('floor');
			document.getElementById("sourceVertex").value = id;
			overlay.setPosition(undefined);
		});
		$("#popup-btn-end").click(function() {
			//设为终点
			endPos = center;
			endFloor = feature.get('floor');
			document.getElementById("finalVertex").value = id;
			overlay.setPosition(undefined);
		});
	}

};

//地图点击事件返回点击像素点，并显示出弹出框
map.on('click', function(evt) {
	//TODO 可能有问题的代码
	/*if(evt.dragging) { //如果是拖动地图造成的鼠标移动，则不作处理  
		return;
	}*/
	var pixel = map.getEventPixel(evt.originalEvent);
	displayFeatureInfo(pixel);
});

/******************************楼层转换控件点击事件绑定****************************/
$('#float-left a').on('click', function() {
	$(this).addClass('on').siblings().removeClass('on');
	var index = $(this).html();
	//如果有弹出框则关闭
	if(overlay.getPosition()) {
		overlay.setPosition(undefined);
		closer.blur();
	}
	layerInit(index);
	map.setLayerGroup(new ol.layer.Group({
		layers: layers[index]
	}));
	//画出该层路径，如果没有就不画
	//drawPath(lineLayers);
});
