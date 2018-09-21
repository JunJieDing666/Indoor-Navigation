/* *
 * 全局变量声明
 * 
 * */
//地图视图框
var mapView;
//地图容器
var map;
//声明地图显示的范围
var extent = [0, 0, 3000, 3000];
//定义投影坐标系
var projection = new ol.proj.Projection({
	code: 'EPSG:4326',
	extent: extent
});
//地图比例尺(现实每1m代表地图的像素位)
var scaleFac = 17.67;

//地图信息相关数据的所有url
var mapRenderInfo;
//所有楼层图层变量存放处
var layers = {};
//圆图层的源
var vectorCircleSource;
//车位的源
var vectorSource;
//所有楼层空闲车位的源
var spareVectorSourceJson = {};
//空闲车位
var spare;
//路径规划所得路线图层向量
var lineLayer;

//起终点坐标
var startPos = [0, 0],
	endPos = [0, 0];
//起终楼层
var startFloor, endFloor;

//判断用户使用的是哪种系统的手机分配不同的标准
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

//获取当前页面的网址和所带信息
var currentUrl = window.location.href + "?ticket=ef3c6f765b02b72d9383dc69f841211d";
var params = currentUrl.split("?")[1];
//判断页面是否是摇一摇得到的
if(params) {
	var ticketStr = params.split("&")[0];
	var isTicket = ticketStr.split("=")[0];
	var ticket = ticketStr.split("=")[1];
}

//组成弹出框的元素 
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

//生成弹出框
var overlay = new ol.Overlay(({
	element: container,
	autoPan: true,
	autoPanAnimation: {
		duration: 100 //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）  
	}
}));

//定位点图标
var startMarker = document.getElementById('start-marker');
var endMarker = document.getElementById('end-marker');
//初始化起点终点点标注
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

//记录离定位位置最近的车位
var closestParkingPlace, navigateSwitcher = false;
//离定位点最近的空闲车位
var closestSpareParkingPlace;

//上一次的方位角
var lastAlpha;
//设备当前方向角alpha
var currentAlpha = 0;
//相角差
var degDiff = 0;
//是否需要建立方向坐标系的标志
var isNeedCoor = true;
//首次定位，方向与x轴的角度偏移（0-360deg）
var phi = undefined;
//换算后的图片转动角（从y轴正方向开始顺时针0-360deg）
var theta = 0;
//电子罗盘初始角度偏移，将自建坐标系与罗盘坐标系重叠
var offsetTheta = 0;
//最终的图片转动角
var finalTheta;
//坐标系是否建立成功的标志
var isCoorOk = false;
//建立方向坐标系的次数
var setupCoorCnt = 0;

//上一次的步数
var lastStepCnt = 0;
//当前步数
var currentStepCnt = 0;
//步伐因子（成年人每步距离，单位为m）
var stepDis = 0.5;
//步数差
var stepDiff = 0;
//行走距离
var disChange = 0;
//新旧坐标间的距离
var disPosChange = 0;

//位置信息
var currentPos = [];

//卡尔曼滤波参数
var x_last = 0;
var p_last = 0.02;
var Q = 0.03;
var R = 0.4;
var kg;
var x_mid;
var x_now;
var p_mid;
var p_now;