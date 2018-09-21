$(document).ready(function() {
	//首先自动聚焦第一个输入框
	$('div[class=\"bogusInput\"]').children().first().focus();
	//输入完之后自动跳到下一个输入框
	$('#defaultForm')
		//点击文本框自动清空内容
		.on('click', 'input', function() {
			$(this).select();
		})
		.on('focus', 'input', function() {
			document.activeElement.blur();
		})
		//点击新能源汽车加入车牌号第八位的文本框
		.on('click', 'button[id="extralBox"]', function() {
			$("input[name=\"num7\"]").after(
				"<input type=\"text\" class=\"form-control\" name=\"num8\" id=\'num8\'  onfocus=\"xfjianpan1(this.name);xfjianpan(false)\" />"
			);
			$("div[class=\"bogusInput\"]").children().each(function() {
				$(this).css('width', '12.5%');
			});
			num8 = $('#num8');
			num8.on('focus', function() {
				document.activeElement.blur();
			});
			//判断其余文本框是否非空,如果全部有值则聚焦新增文本框
			var num1 = $('input[name=\"num1\"]').val().length;
			var num2 = $('input[name=\"num2\"]').val().length;
			var num3 = $('input[name=\"num3\"]').val().length;
			var num4 = $('input[name=\"num4\"]').val().length;
			var num5 = $('input[name=\"num5\"]').val().length;
			var num6 = $('input[name=\"num6\"]').val().length;
			var num7 = $('input[name=\"num7\"]').val().length;
			if(num1 && num2 && num3 && num4 && num5 && num6 && num7) {
				num8.focus();
			}
			$('#cancel').show();
			$(this).hide();
		})
		//取消额外的文本框
		.on('click', '#cancel', function() {
			var num8 = $("input[name=\"num8\"]");
			$("#num8").remove();
			$("div[class=\"bogusInput\"]").children().each(function() {
				$(this).css('width', '14.2%') //样式要一个一个改,用end()出不来
			});
			$("#extralBox").show();
			$(this).hide();
		})
		//表单验证
		.on('submit', function(e) {
			//查看所有输入框的非空情况
			var num1 = $('input[name=\"num1\"]').val().length;
			var num2 = $('input[name=\"num2\"]').val().length;
			var num3 = $('input[name=\"num3\"]').val().length;
			var num4 = $('input[name=\"num4\"]').val().length;
			var num5 = $('input[name=\"num5\"]').val().length;
			var num6 = $('input[name=\"num6\"]').val().length;
			var num7 = $('input[name=\"num7\"]').val().length;
			//若前七个输入框有空的
			if(!(num1 && num2 && num3 && num4 && num5 && num6 && num7)) {
				toastr.options = {
					"closeButton": false,
					"debug": false,
					"newestOnTop": false,
					"progressBar": false,
					"positionClass": "toast-top-center",
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
				toastr["warning"]("请输入正确的车牌号");
				e.preventDefault();
			} else if($('#num8').length) {
				//判断是否启用了新能源输入框
				if(!($('#num8').val().length)) {
					toastr.options = {
						"closeButton": false,
						"debug": false,
						"newestOnTop": false,
						"progressBar": false,
						"positionClass": "toast-top-center",
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
					toastr["warning"]("请输入正确的车牌号");
					e.preventDefault();
				}
			}

		})
});

//**************************************************************************************************************************
function findLastVaildInputBox(id) {
	id = id.substring(3);
	for(var i = id; i > 0; i--) {
		if($("#" + "num" + i).val().length) //找到从当前输入到第一个输入框,第一个非空文本框id
			break;
	}
	id = "num" + i;
	return id;
}

//键盘部分JS
$("#jianpan .title").css("line-height", $("#jianpan").height() / 5 + "px");

function xfjianpan(id) {

	var jpnub = $("#xfjp td").length;

	move("jianpan"); //开启键盘可移动

	$("#xfjp td").unbind("click");

	if(id != false) {
		$("#jianpan").show();
		var xfjp_text = $("#" + id).val(); //获取input框当前的val值

		$(".input_on").removeClass("input_on");
		$("#" + id).addClass("input_on"); //设置input框选中时的样式

		$("#jptitle").html($("#" + id).attr("placeholder")); //键盘标题，自动获取input的placeholder值

		$("#xfjp td").click(function() {
			var click = $(this).html(); //获取点击按键的内容

			//特殊按键在这添加事件
			//判断点击的按键是否有特殊事件，如果没有则按键内容加在input文本后面
			if(click == "BackSpace") {
				xfjp_text = "";
				var clcId = findLastVaildInputBox(id);
				var clcBox = $("#" + clcId);
				//清空文本框内容,并聚焦该文本框
				clcBox.val(xfjp_text);
				clcBox.focus();
			} else if(click == "shift") {
				for(i = 0; i < jpnub; i++) {
					$("#xfjp td:eq(" + i + ")").html($("#xfjp td:eq(" + i + ")").html().toUpperCase());
				}
			} else if(click == "SHIFT") {
				for(i = 0; i < jpnub; i++) {
					$("#xfjp td:eq(" + i + ")").html($("#xfjp td:eq(" + i + ")").html().toLowerCase());
				}
			} else if(click == "空格") {
				xfjp_text = xfjp_text + " ";
				$("#" + id).val(xfjp_text);
			} else if(click == "Tab") {
				$("#" + id).next().focus();
			} else {
				xfjp_text = click;
				var num = $("#" + id);
				var boxes = $("input");
				num.val(xfjp_text);
				if(id != 'num7' && id != 'num8') { //如果不是最后一个输入框
					num.next().focus();
					num.next().select();
				} else {
					$(".input_on").removeClass("input_on"); //移除选中input的选中样式
					$("#jianpan").hide();
				}
			}

		})
	} else {
		$(".input_on").removeClass("input_on"); //移除选中input的选中样式
		$("#jianpan").hide();
	}
}

//数字-字母键盘
$("#jianpan1 .title").css("line-height", $("#jianpan1").height() / 5 + "px");

function xfjianpan1(id) {
	var jpnub = $("#xfjp1 td").length;

	move("jianpan1"); //开启键盘可移动

	$("#xfjp1 td").unbind("click");

	if(id != false) {
		$("#jianpan1").show();
		var xfjp_text = $("#" + id).val(); //获取input框当前的val值

		$(".input_on").removeClass("input_on");
		$("#" + id).addClass("input_on"); //设置input框选中时的样式

		$("#jptitle1").html($("#" + id).attr("placeholder")); //键盘标题，自动获取input的placeholder值

		$("#xfjp1 td").click(function() {
			var click = $(this).html(); //获取点击按键的内容

			//特殊按键在这添加事件
			//判断点击的按键是否有特殊事件，如果没有则按键内容加在input文本后面
			if(click == "清空") {
				xfjp_text = "";
				var clcId = findLastVaildInputBox(id);
				var clcBox = $("#" + clcId);
				//清空文本框内容,并聚焦该文本框
				clcBox.val(xfjp_text);
				clcBox.focus();
			} else if(click == "shift") {
				for(i = 0; i < jpnub; i++) {
					$("#xfjp1 td:eq(" + i + ")").html($("#xfjp1 td:eq(" + i + ")").html().toUpperCase());
				}
			} else if(click == "SHIFT") {
				for(i = 0; i < jpnub; i++) {
					$("#xfjp1 td:eq(" + i + ")").html($("#xfjp1 td:eq(" + i + ")").html().toLowerCase());
				}
			} else if(click == "空格") {
				xfjp_text = xfjp_text + " ";
				$("#" + id).val(xfjp_text);
			} else {
				xfjp_text = click;
				var num = $("#" + id);
				var boxes = $("input");
				var last = boxes.last();
				num.val(xfjp_text);
				if($('#cancel').is(":visible")) { //最后的元素是num8
					if(id == 'num8') { //如果是最后一个输入框
						$(".input_on").removeClass("input_on"); //移除选中input的选中样式
						$("#jianpan1").hide();
					} else {
						num.next().focus();
						num.next().select();
					}
				} else if(id == 'num7') { //如果是最后一个输入框
					$(".input_on").removeClass("input_on"); //移除选中input的选中样式
					$("#jianpan1").hide();
				} else {
					num.next().focus();
					num.next().select();
				}
			}

		})
	} else {
		$(".input_on").removeClass("input_on"); //移除选中input的选中样式
		$("#jianpan1").hide();
	}
}
$("input").focus(function() {
	document.activeElement.blur();
});

//拖动键盘逻辑
function unmove(obj) {
	$("#" + obj + " .title").unbind("mousedown");
}

function move(obj) {
	var OffsetX = 0;
	var OffsetY = 0;
	var moveKg = false;
	var csZ = 0;

	function d(id) {
		return document.getElementById(id);
	}
	$("#" + obj + " .title").bind("mousedown", function() {
		OffsetX = event.pageX - d(obj).offsetLeft;
		OffsetY = event.pageY - d(obj).offsetTop;
		csZ = $("#" + obj).css("z-index");
		$("#" + obj).css("z-index", "9999");
		moveKg = true;
		jpyd();
	});

	function jpyd() {
		$(document).bind("mousemove", function() {
			var e = e || window.event;
			var mouswX = e.pageX;
			var mouswY = e.pageY;
			var moveX = mouswX - OffsetX;
			var moveY = mouswY - OffsetY;
			var maxX = $(window).width() - d(obj).offsetWidth;
			var maxY = $(window).height() - d(obj).offsetHeight;
			moveX = Math.min(maxX, Math.max(0, moveX));
			moveY = Math.min(maxY, Math.max(0, moveY));
			$("#" + obj).css({
				"left": moveX,
				"top": moveY
			});
		});
		$(document).bind("mouseup", function() {
			moveKg = false;
			$("#" + obj).css("z-index", csZ);
			$(document).unbind("mousemove mouseup");
		})
	}
}