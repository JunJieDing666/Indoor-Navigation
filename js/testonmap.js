var marker, infowindow;
//初始化一张地图
var map = new AMap.Map('container', {
	zoom: 10,
});
//给地图引入比例尺及定位插件
AMap.plugin(['AMap.Scale', 'AMap.Geolocation', 'AMap.Autocomplete','AMap.PlaceSearch'], function() {
	map.addControl(new AMap.Scale());
	map.addControl(new AMap.Geolocation({
		enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	}));
	//搜索栏（模糊搜索+点击结果自动搜索）
	var autoOptions = {
		input: "keyword" //使用联想输入的input的id
	};
	autocomplete = new AMap.Autocomplete(autoOptions);
	var placeSearch = new AMap.PlaceSearch({
        map:map
    });
    AMap.event.addListener(autocomplete, "select", function(e){
       //TODO 针对选中的poi实现自己的功能
       placeSearch.search(e.poi.name)
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
//console.log(map.getZoom());
var innerMapMarker, innerMapInfoWindow;
map.on('zoomchange',function(e){
	if(map.getZoom() > 9 && innerMapMarker == undefined){
		//加入南理工停车场点标注
		innerMapMarker = new AMap.Marker({
			position: [118.855507, 32.024541],
			map: map,
			animation: 'AMAP_ANIMATION_DROP',
			draggable: false
		});
		//引入信息窗体插件
		AMap.plugin('AMap.AdvancedInfoWindow', function() {
			innerMapInfoWindow = new AMap.AdvancedInfoWindow({
				content: '<div class="info-title">融合时代地下停车场</div><div class="info-content"><a href="./myinnermap.php"><button type="button">进入停车场室内地图</button></a></div>',
				offset: new AMap.Pixel(0, -30)
			});
		});
		//点击点标记弹出信息窗体
		innerMapMarker.on('click', function(e) {
			innerMapInfoWindow.open(map, e.target.getPosition());
		});
	}
	if(map.getZoom() <= 9 && innerMapMarker){
		map.remove([innerMapMarker]);		
		innerMapMarker = undefined;
	}
});








