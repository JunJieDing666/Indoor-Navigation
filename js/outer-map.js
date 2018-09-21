var potsWithInnerMap = [{
	name: "地下融合广场",
	center: "118.855624,32.024534",
	source: "innerMap/myinnermap1.html",
	lots: "48"
}, {
	name: "南京理工大学自动化院办地下停车场",
	center: "118.86223,32.024629",
	source: "innerMap/myinnermap1.html",
	lots: "46"

}, {
	name: "地下融合广场",
	center: "118.855624,32.024534",
	source: "innerMap/myinnermap1.html",
	lots: "36"
}, {
	name: "南京理工大学自动化院办地下停车场",
	center: "118.86223,32.024629",
	source: "innerMap/myinnermap1.html",
	lots: "56"

}, {
	name: "南京理工大学停车场(友谊路)",
	center: "118.85939,32.028944",
	source: "innerMap/myinnermap1.html",
	lots: "123"

}, {
	name: "南京理工大学设计与传媒学院停车场",
	center: "118.858757,32.028571",
	source: "innerMap/myinnermap1.html",
	lots: "156"

}, {
	name: "南京理工大学化工学院停车场",
	center: "118.85917,32.02743",
	source: "innerMap/myinnermap1.html",
	lots: "150"

}, {
	name: "南京理工大学安全工程系停车场",
	center: "118.86248,32.027466",
	source: "innerMap/myinnermap1.html",
	lots: "44"

}, {
	name: "南京理工大学380幢附近停车场",
	center: "118.859545,32.025829",
	source: "innerMap/myinnermap1.html",
	lots: "161"

}, {
	name: "南京理工大学101幢附近停车场",
	center: "118.857147,32.029062",
	source: "innerMap/myinnermap1.html",
	lots: "262"

}, {
	name: "停车场(紫园小区南)",
	center: "118.858365,32.030531",
	source: "innerMap/myinnermap1.html",
	lots: "36"

}, {
	name: "南京理工大学一号路东50米停车场",
	center: "118.859181,32.025392",
	source: "innerMap/myinnermap1.html",
	lots: "78"

}, {
	name: "南京理工大学-收费停车场",
	center: "118.859693,32.031882",
	source: "innerMap/myinnermap1.html",
	lots: "99"

}, {
	name: "紫麓宾馆停车场",
	center: "118.857719,32.030904",
	source: "innerMap/myinnermap1.html",
	lots: "121"

}, {
	name: "南京理工大学综合实验楼停车场",
	center: "118.856475,32.027661",
	source: "innerMap/myinnermap1.html",
	lots: "187"

}, {
	name: "紫麓宾馆停车场二",
	center: "118.857936,32.031134",
	source: "innerMap/myinnermap1.html",
	lots: "210"

}, {
	name: "南京理工大学综合楼南侧停车场",
	center: "118.85646,32.027237",
	source: "innerMap/myinnermap1.html",
	lots: "24"

}, {
	name: "南京理工大学软件学院停车场",
	center: "118.856284,32.029433",
	source: "innerMap/myinnermap1.html",
	lots: "170"

}, {
	name: "停车场(晏公庙新村北)",
	center: "118.862201,32.031794",
	source: "innerMap/myinnermap1.html",
	lots: "70"

}, {
	name: "停车场(晏公庙新村西北)",
	center: "118.862073,32.031712",
	source: "innerMap/myinnermap1.html",
	lots: "11"
}, {
	name: "南京理工大学能源与动力工程停车场",
	center: "118.858838,32.024456",
	source: "innerMap/myinnermap1.html",
	lots: "96"

}, {
	name: "南京理工大学364幢附近停车场",
	center: "118.859787,32.027957",
	source: "innerMap/myinnermap1.html",
	lots: "111"

}, {
	name: "晏公庙西村小区停车场",
	center: "118.861976,32.032509",
	source: "innerMap/myinnermap1.html",
	lots: "232"

}, {
	name: "停车场(白下321大厦北)",
	center: "118.864164,32.023409",
	source: "innerMap/myinnermap1.html",
	lots: "133"
}, {
	name: "停车场(双拜巷151号院西)",
	center: "118.864518,32.030468",
	source: "innerMap/myinnermap1.html",
	lots: "8"
}, {
	name: "南京紫金山科技创业园停车场",
	center: "118.868069,32.030422",
	source: "innerMap/myinnermap1.html",
	lots: "250"
}, {
	name: "金陵生物医疗停车场",
	center: "118.850292,32.033525",
	source: "innerMap/myinnermap1.html",
	lots: "28"
}, {
	name: "停车场(银城东苑东北)",
	center: "118.847416,32.029013",
	source: "innerMap/myinnermap1.html",
	lots: "190"
}, {
	name: "万达紫金明珠停车场",
	center: "118.862155,32.015614",
	source: "innerMap/myinnermap1.html",
	lots: "12"
}];

function createInfoWindowObj_pp(target) {
	var poi;
	for(var i = 0; i < potsWithInnerMap.length; i++) {
		if(potsWithInnerMap[i].center == target.toString()) {
			poi = potsWithInnerMap[i];
			break;
		}
	}

	var title = poi.name,
		content = [];
	content.push("<img src=\"images/logo.png\" style=\"width: 38px;height: 38px\">欢迎使用易停易寻系统!    ");
	content.push("当前车位数:" + '<strong>' + poi.lots + '</strong>');
	//TODO 根据停车场不同，进入不同地图
	content.push("<a href=\"myinnermap.php\">点击进入室内地图</a>\n");
	var infoWindow = new AMap.InfoWindow({
		isCustom: true, //使用自定义窗体
		autoMove: true,
		closeWhenClickMap: true,
		offset: new AMap.Pixel(16, -45),
		showShadow: true
	});
	infoWindow.setContent(createInfoWindowDiv_pp(title, content.join("<br/>"), infoWindow));
	var potCenter = poi.center.split(',');
	potCenter.forEach(function(value, index, array) {
		array[index] = parseFloat(value);
	});
	infoWindow.setPosition(potCenter);

	return infoWindow;
}

function createInfoWindowDiv_pp(title, content, infowindow) {
	var info = document.createElement("div");
	info.className = "info";

	//可以通过下面的方式修改自定义窗体的宽高
	info.style.width = "218px";
	// 定义顶部标题
	var top = document.createElement("div");
	var titleD = document.createElement("div");
	var closeX = document.createElement("img");
	top.className = "info-top";
	titleD.innerHTML = title;
	closeX.src = "https://webapi.amap.com/images/close2.gif";
	closeX.onclick = function() {
		infowindow.close();
	};

	top.appendChild(titleD);
	top.appendChild(closeX);
	info.appendChild(top);

	// 定义中部内容
	var middle = document.createElement("div");
	middle.className = "info-middle";
	middle.style.backgroundColor = 'white';
	middle.innerHTML = content;
	info.appendChild(middle);

	// 定义底部内容
	var bottom = document.createElement("div");
	bottom.className = "info-bottom";
	bottom.style.position = 'relative';
	bottom.style.top = '0px';
	bottom.style.margin = '0 auto';
	var sharp = document.createElement("img");
	sharp.src = "https://webapi.amap.com/images/sharp.png";
	bottom.appendChild(sharp);
	info.appendChild(bottom);
	return info;
}

//根据车位数量决定使用的颜色
function bg_txt_Color(lots) {
	var color = ['red', 'white'];
	switch(true) {
		case lots >= 0 && lots < 10:
			color[0] = 'red';
			color[1] = 'white';
			break;
		case lots >= 10 && lots < 20:
			color[0] = 'orange';
			color[1] = 'darkred';
			break;
		case lots >= 20:
			color[0] = 'green';
			color[1] = 'white';
			break;
	}
	return color;
}

var marker, infowindow;
//初始化一张地图
var map = new AMap.Map('container', {
	zoom: 10,
	resizeEnable: true
});
//给地图引入插件
AMap.plugin(['AMap.Scale', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
	map.addControl(new AMap.Scale());
	var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 5000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
	
	//搜索栏（模糊搜索+点击结果自动搜索）
	var autoOptions = {
		input: "keyword" //使用联想输入的input的id
	};
	autocomplete = new AMap.Autocomplete(autoOptions);
	var placeSearch = new AMap.PlaceSearch({
		map: map
	});
	AMap.event.addListener(autocomplete, "select", function(e) {
		placeSearch.search(e.poi.name)
	});
	
	//定位
	AMap.event.addListener(geolocation, 'complete', function() {
		//返回定位信息
		var str = [];
		str.push(data.position.getLng());
		str.push(data.position.getLat());
		currPos = str;
		return str;
	});
	AMap.event.addListener(geolocation, 'error', function() {
		//返回定位出错信息
		toastr.options = {
			"closeButton": false,
			"debug": false,
			"newestOnTop": false,
			"progressBar": false,
			"positionClass": "toast-bottom-center",
			"onclick": null,
			"preventDuplicates": true,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "1500",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		};
		toastr["warning"]("定位失败,请手动点击右下角的定位按钮");
	});
});

/**************************添加地图点击监听******************/
map.on('click', function(e) {
	if(marker) {
		//取消上一个点标记
		marker.setMap(null);
		marker = null;
		//关闭信息窗体
		infowindow.close();
	}
	//console.log(e.lnglat.getLng()+","+e.lnglat.getLat());
	marker = new AMap.Marker({
		position: [e.lnglat.getLng(), e.lnglat.getLat()],
		map: map,
		animation: 'AMAP_ANIMATION_DROP',
		draggable: true
	});

	//点击点标记弹出信息窗体
	marker.on('click', function(e) {
		infowindow.open(map, e.target.getPosition());
	});
	//引入信息窗体插件
	AMap.plugin('AMap.AdvancedInfoWindow', function() {
		infowindow = new AMap.AdvancedInfoWindow({
			content: '<div class="info-title">搜索框</div><div class="info-content"><p>&nbsp&nbsp欢迎使用易寻易停停车系统。</p></div>',
			offset: new AMap.Pixel(0, -30)
		});
	})
});

/************************添加现有室内地图的停车场的点标记*****************/
var simpleMarkers = [],
	infoWindows_pp;
map.on('zoomchange', function(e) {
	if(map.getZoom() > 11 && !simpleMarkers.length) {
		//加载SimpleMarker
		AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
			for(var i = 0; i < potsWithInnerMap.length; i++) {
				color = bg_txt_Color(parseInt(potsWithInnerMap[i].lots));
				potCenter = potsWithInnerMap[i].center.split(',');
				potCenter.forEach(function(value, index, array) {
					array[index] = parseFloat(value);
				});
				var iconTheme = 'default';

				var simpleMarker = new SimpleMarker({
					iconTheme: iconTheme,
					//使用内置的iconStyle
					iconStyle: color[0],
					//图标文字
					iconLabel: {
						innerHTML: potsWithInnerMap[i].lots,
						style: {
							//颜色, #333, red等等，这里仅作示例，取iconStyle中首尾相对的颜色
							color: color[1]
						}
					},
					//显示定位点
					showPositionPoint: true,
					map: map,
					position: potCenter
				});

				simpleMarkers.push(simpleMarker);
				simpleMarker.on('click', function(e) {
					infoWindows_pp = createInfoWindowObj_pp(e.target.getPosition());
					infoWindows_pp.open(map, e.target.getPosition());
				});
			}
		});
	}

	if(map.getZoom() < 11 && simpleMarkers.length) {
		map.remove(simpleMarkers);
		simpleMarkers = [];
		if(infoWindows_pp)
			infoWindows_pp.close();
	}
});