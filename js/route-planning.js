/******************************路径规划功能****************************************/
/* *
 * @func	画路径函数
 * @param	pointList	路线点集合
 * @return	让两点之间最短路径显示在图上
 * */
function findPath(pointList) {
	//0.清理原先图层
	if(lineLayer) {
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

//为路径规划交换按钮绑定点击事件
$("body").delegate("#exchange", "touchstart", function(event) {
	var sourceVertex = document.getElementById("sourceVertex").value;
	var finalVertex = document.getElementById("finalVertex").value;
	document.getElementById("sourceVertex").value = finalVertex;
	document.getElementById("finalVertex").value = sourceVertex;
});

/* *
 * @func	路径规划主要业务逻辑
 * @param	certainPos	定位点所在位置（不一定是在圆点上）
 * @return	规划路径，并显示在地图上
 * */
function myWay(certainPos) {
	//1.生成起点终点标注（被清除过后需要重新初始化）
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

	//2.获得起终点车位号
	var sourceVertex = document.getElementById("sourceVertex").value;
	var finalVertex = document.getElementById("finalVertex").value;

	//3.判断是定位导航还是普通路径规划
	if(sourceVertex == '您当前的位置') {
		startFloor = closestParkingPlace.get('floor');
	}

	//4.判断起点和终点是否在同一层，以确定到哪个文件中搜索目标点信息
	var startFloorInt = startFloor.split("F")[0];
	var endFloorInt = endFloor.split("F")[0];
	if(startFloorInt == endFloorInt) {
		//起终点同层
		var url = "data/" + startFloorInt + "-parkingplace.geojson";
		$.ajax({
			url: url,
			success: function(result) {
				//纠正id偏移
				var startId = result.features[0].properties.Id;
				sourceVertex = sourceVertex - startId;
				finalVertex = finalVertex - startId;

				//判断起终点是否存在
				if((result.features[sourceVertex] || sourceVertex == '您当前的位置') && result.features[finalVertex]) {
					if(sourceVertex == '您当前的位置') {
						sourceVertex = closestParkingPlace.get('Id');
					} else {
						sourceVertex = result.features[sourceVertex].properties.Rid;
					}
					//记录终点车位
					localStorage.parkingplace = finalVertex + startId;
					//将车位id转换为离车位最近圆点的rid
					finalVertex = result.features[finalVertex].properties.Rid;
				} else {
					//如果不合法，弹出警示
					$(function() {
						$.mytoast({
							text: "请在地图上选择起点和终点",
							type: "warning"
						});
					});
				}
			},
			dataType: 'json',
			//设置ajax为同步执行
			async: false
		});
	} else {
		//起终点不同层
		var startFloorUrl = "data/" + startFloorInt + "-parkingplace.geojson";
		var endFloorUrl = "data/" + endFloorInt + "-parkingplace.geojson";
		//到不同楼层的车位文件中将车位id转为Rid
		$.ajax({
			url: startFloorUrl,
			success: function(result) {
				var startId = result.features[0].properties.Id;
				sourceVertex = sourceVertex - startId;
				if(sourceVertex == '您当前的位置') {
					sourceVertex = closestParkingPlace.get('Id');
				} else if(result.features[sourceVertex]) {
					sourceVertex = result.features[sourceVertex].properties.Rid;
				} else {
					$(function() {
						$.mytoast({
							text: "请选择正确的起点",
							type: "warning"
						});
					});
				}
			},
			dataType: 'json',
			async: false
		});

		$.ajax({
			url: endFloorUrl,
			success: function(result) {
				var startId = result.features[0].properties.Id;
				finalVertex = finalVertex - startId;
				if(result.features[finalVertex]) {
					localStorage.parkingplace = finalVertex + startId;
					//转换id和rid
					finalVertex = result.features[finalVertex].properties.Rid;
				} else {
					$(function() {
						$.mytoast({
							text: "请选择正确的终点",
							type: "warning"
						});
					});
				}
			},
			dataType: 'json',
			async: false
		});
	}

	//3.将车位号转换为圆点号
	/*$.ajax({
		url: "data/1-parkingplace.geojson",
		success: function(result) {
			if((result.features[sourceVertex - 1] || sourceVertex == '您当前的位置') && result.features[finalVertex - 1]) {
				if(sourceVertex == '您当前的位置') {
					sourceVertex = closestParkingPlace.get('Id');
				} else {
					sourceVertex = result.features[sourceVertex - 1].properties.Rid;
				}
				//记录终点坐标
				localStorage.parkingplace = finalVertex;
				//将车位id转换为离车位最近圆点的rid
				finalVertex = result.features[finalVertex - 1].properties.Rid;
			}
		},
		dataType: 'json',
		//设置ajax为同步执行
		async: false
	});*/

	//4.获得路径圆点，根据其坐标绘制出路径       TODO 不同楼层遍历不同文件
	$.ajax({
		url: "data/2-circle.geojson",
		success: function(result) {
			//纠正id偏移
			var startId = result.features[0].properties.Id;
			
			if(result.features[sourceVertex - startId] && result.features[finalVertex - startId]) {
				//TODO 多层路径导航
				var path = searchPath(sourceVertex, finalVertex, "2F", "2F");
				var pathPos = [];
				var pos;
				for(i = 0; i < path.length; i++) {
					if(result.features[path[i]-startId]) {
						var pos = result.features[path[i]-startId].properties.center;
						pathPos[i] = pos;
					}
				}
				//如果有确定的坐标则以此坐标为起点
				if(certainPos.toString() != "") {
					pathPos[0] = certainPos;
				}
				//1.给起点终点加点标注
				startPos = pathPos[0];
				startMarkerOverlay.setPosition(startPos);
				map.addOverlay(startMarkerOverlay);
				endPos = pathPos[pathPos.length - 1];
				endMarkerOverlay.setPosition(endPos);
				map.addOverlay(endMarkerOverlay);
				findPath(pathPos);
				//先判断是否为摇一摇状态，如果是才有停止导航的按钮
				if(params) {
					if(isTicket == "ticket" && ticket) {
						document.getElementById('search').innerText = "停止导航";
					}
				}
				//启动导航的标志,根据规划次数自动置反
				navigateSwitcher = !navigateSwitcher;
			} else {
				$(function() {
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

}

//为路径规划导航按钮绑定点击事件
$("body").delegate("#search", "click", function(event) {
	//关闭模态框
	$("#myModal").modal('hide');

	//先判断是否为摇一摇状态，如果是才有导航的按钮
	if(params) {
		if(isTicket == "ticket" && ticket) {
			if(!navigateSwitcher) {
				myWay([]);
			} else {
				//清除图层
				if(lineLayer && startMarkerOverlay && endMarkerOverlay) {
					map.removeLayer(lineLayer);
					map.removeOverlay(startMarkerOverlay);
					map.removeOverlay(endMarkerOverlay);
				}
				document.getElementById('search').innerText = "导航";
			}
		}
	} else {
		//直接进行路径规划
		myWay([]);
	}

});

//定位后为一键停车寻车按钮添加点击事件
$("body").delegate("#park-car", "click", function(event) {
	//找到最近空余车位
	var currentFloor = $('#float-left a.on').html();
	if(spareVectorSourceJson[currentFloor].getFeatures().length) {
		//如果当前楼层有空余车位
		closestSpareParkingPlace = spareVectorSourceJson[currentFloor]
			.getClosestFeatureToCoordinate(startPos);
	} else {
		//当前楼层没有空余车位，到最近楼层找 TODO 做完多层路径规划继续做这个

	}
	document.getElementById("finalVertex").value = closestSpareParkingPlace.get('Id');
	endFloor = closestSpareParkingPlace.get("floor");
	endPos = closestSpareParkingPlace.get("center");
	myWay([]);
});

$("body").delegate("#find-car", "click", function(event) {
	//TODO 检查本地是否有存储停车的位置,没有则提示输入车牌号，向服务器请求停车的位置
	myWay([]);
});