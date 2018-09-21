/* *
 * 获取方向角变化用于航位推测来辅助定位
 * 
 * */
if(window.DeviceOrientationEvent) {
	window.addEventListener('deviceorientation', function(event) {
			var a = document.getElementById('alpha'),
				b = document.getElementById('beta'),
				g = document.getElementById('gamma'),
				alpha = event.alpha,
				beta = event.beta,
				gamma = event.gamma;
			if(event.webkitCompassHeading) {
				//IOS
				alpha = event.webkitCompassHeading;
			} else {
				//Android
				alpha = -(event.alpha);
			}
			currentAlpha = alpha;
			//图标随方向旋转，且移动定位点
			if(isCoorOk) {
				finalTheta = currentAlpha - offsetTheta + theta;
				startMarker.style.transform = "rotate(" + finalTheta + "deg)";
			}
			/*a.innerHTML = Math.round(alpha);
			b.innerHTML = Math.round(offsetTheta);
			g.innerHTML = Math.round((90 - finalTheta)%360);*/
		},
		false);
} else {
	document.querySelector('body').innerHTML = '您的浏览器不支持';
}

//判断用户是否切换了应用
var hiddenProperty = 'hidden' in document ? 'hidden' :
	'webkitHidden' in document ? 'webkitHidden' :
	'mozHidden' in document ? 'mozHidden' :
	null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function() {
	if(!document[hiddenProperty]) {
		console.log('页面非激活');
	} else {
		console.log('页面激活');
		//切换回页面后要重新建立方向坐标系
		startMarker.setAttribute('src', 'images/start.png');
		startMarker.style.transform = "rotate(0deg)";
		isCoorOk = false;
	}
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);

