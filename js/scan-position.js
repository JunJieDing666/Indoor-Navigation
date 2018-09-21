/****************************扫一扫定位************************************/
/* *
 * @des		扫描定位的函数
 * @param	locx,locy	车位坐标
 * 			parkingplace	车位号
 * @return	让定位的位置显示在图上
 * */
function scanPos(locx, locy, parkingplace) {
	//记录定位位置
	var loc = [locx, locy];
	//定位到该点
	mapView.animate({
		center: loc
	}, {
		duration: 1
	});
	content.innerHTML = '<p>扫码定位的车位是:' + '<code>' + parkingplace + '</code>' + '号车位</p>';
	overlay.setPosition(loc);
	map.addOverlay(overlay);
	//为弹出框的按钮添加点击事件
	$("#popup-btn-start").click(function() {
		//设为起点
		document.getElementById("sourceVertex").value = parkingplace;
		overlay.setPosition(undefined);
		//弹出吐司提示用户
		$(function() {
			$.mytoast({
				text: "已为您记录当前位置，点击右上角可查看。",
				type: "success"
			});
		});
	});
	$("#popup-btn-end").click(function() {
		//设为终点
		document.getElementById("finalVertex").value = parkingplace;
		overlay.setPosition(undefined);
		//弹出吐司提示用户
		$(function() {
			$.mytoast({
				text: "已为您记录当前位置，点击右上角可查看。",
				type: "success"
			});
		});
		//将位置存储到本地
		if(typeof(Storage) !== "undefined") {
			//支持 localStorage  sessionStorage 对象!
			localStorage.parkingplace = parkingplace;
			document.getElementById("finalVertex").value = parkingplace;
		} else {
			// 抱歉! 不支持 web 存储。
			$(function() {
				$.mytoast({
					text: "您目前的浏览器版本不支持记忆功能，请手动输入车位号。",
					type: "error"
				});
			});
		}
	});

}

/*为内部扫一扫按钮绑定点击事件*/
wx.ready(function() {
	document.querySelector('#scanhref').onclick = function() {
		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
			scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
			success: function(res) {
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
						scanPos(locx, locy, parkingplace);
					}
				}
			}
		});
	};
});

/* 外部扫一扫定位
 * example:(http://djj4211.bj01.bdysite.com/myinnermap.php?scanQRC=1
 * &parkinglot=nanligong&locx=307&locy=-462&parkingplace=36)*/
if(params) {
	var ticketStr = params.split("&")[0];
	var isTicket = ticketStr.split("=")[0];
	if(isTicket == "scanQRC") {
		var parkinglotScan = params.split("&")[1].split("=")[1];
		var locxScan = params.split("&")[2].split("=")[1];
		var locyScan = params.split("&")[3].split("=")[1];
		var parkingplaceScan = params.split("&")[4].split("=")[1];
		scanPos(locxScan, locyScan, parkingplaceScan);
	}
}