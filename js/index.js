var REQUEST_TYPE = 2; //1国网接口  2江西接口
var OPENMESSAGESERVER = true; // 开启消息服务
var MAPTYPE = "1"; //1.百度地图   2.离线谷歌地图
var MAP_SERVER_URL = "http://localhost:8844"; //离线地图服务端地址
var MESSAGEURL = "";
var iscordova = false;

//暂用IP
var HTTPIP = "http://192.168.43.197:8080";

/*if(isAndroid) {
	MESSAGEURL = window.parent.MESSAGEURL;
} else {
	MESSAGEURL = localStorage.getItem("MESSAGEURL");
}*/

var thStorage = {};
if(iscordova == true) {
	document.write('<script type="text/javascript" src="cordova.js"><\/script>');
}
var pwd = "tellhow"; // 秘钥
var isFirst = true; //用于判断是否是第一次，防止物理返回再次触发十五分钟提醒及重新连接消息服务器
thStorage.setItem = function(k, value) {
	if(value == null || value == "") {
		return localStorage.setItem(k.toString(), "");
	} else {
		return localStorage.setItem(k.toString(), CryptoJS.AES.encrypt(value + "", pwd).toString());
	}
};
thStorage.getItem = function(k) {
	if(localStorage.getItem(k.toString()) == null || localStorage.getItem(k.toString()) == "") {
		return "";
	} else {
		return CryptoJS.AES.decrypt(localStorage.getItem(k.toString()), pwd).toString(CryptoJS.enc.Utf8);
	}
};
thStorage.removeItem = function(k) {
	localStorage.removeItem(k.toString());
}

function onDeviceReady() {}

function httpUtil(requestData, httpurl, fn, errorfn, getorpost) {
	if(getorpost == null || typeof(getorpost) == 'undefined') getorpost = "post";
	//var requestdata1 = eval('(' + requestData + ')');
	//requestdata1.params.session_id = thStorage.getItem("m_sessionid");
	if(REQUEST_TYPE == 1) {
		var appcode = "JXINTZDPDWQQ";
		var appservercode = "commonAction";
		var time = setTimeout(function() {
			errorfn("网络请求超时");
		}, 5000);
		var paramsStr = JSON.stringify(requestdata1);
		window.parent.post(appcode, paramsStr + "", appservercode, function(data) {
			clearTimeout(time);
			if(data != null && data.length > 0) {
				if(data.resultValue == 'session delay') {
					alert("session超时");
					window.parent.navigator.app.exitApp();
					return;
				}
				var result = eval('(' + data + ')');
				console.log("外网移动交互平台插件请求【成功返回】" + JSON.stringify(data));
				fn(result);
			} else {
				errorfn("外网移动交互平台服务器升级，稍后再试...");
				console.log("外网移动交互平台服务器升级，稍后再试...");
			}
		});
	} else if(REQUEST_TYPE == 2) {
		console.log("自定义请求");
		/*var myparams = JSON.parse(JSON.stringify(requestdata1));
		var paramsStr = JSON.stringify(myparams.params);
		var httpurl = "";
		if(isAndroid) {
			httpurl = window.parent.HTTPURL;
		} else {
			httpurl = localStorage.getItem("HTTPURL");
		}*/
		$.ajax({
			//url: httpurl + "?method=" + myparams.method,
			url: HTTPIP + httpurl,
			type: "post",
			data: requestData,
			timeout: 60000,
			//dataType: "json",
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			success: function(data) {
				if(data.resultValue == 'session delay') {
					alert("session超时");
					window.parent.navigator.app.exitApp();
					return;
				}
				fn(data);
			},
			error: function(text) {
				errorfn("网络请求失败");
			}
		});
	}
}

function getPicture(successfn, errorfn, params) {
	if(isAndroid) {
		window.parent.getPicture(function(imageURI) {
			successfn(imageURI);
		}, function(cameraError) {
			errorfn(cameraError);
		}, params);
	} else {
		window.getPictureIos(function(imageURI) {
			successfn(imageURI);
		}, function(cameraError) {
			errorfn(cameraError);
		}, params);
	}

}

// 显示消息通知
function notificationShow() {
	var notification = window.plugins.statusBarNotification;
	notification.notify("掌上供电服务APP", "您有新的工单！", Flag.FLAG_AUTO_CANCEL);
}

//Tab2:值班管理跳转
function zbItemClickToState(id) {
	var stateTo = "";
	if(id == "000001") {
		//日历展示
		stateTo = "zbgl/rlzs";
	} else if(id == "000002") {
		//xls展示
		stateTo = "zbgl/xlszs";
	} else if(id == "000003") {
		//处内领导安排
		stateTo = "zbgl/cnldap";
	} else if(id == "000004") {
		//行政安排
		stateTo = "";
	} else if(id == "000005") {
		//休假安排
		stateTo = "";
	} else if(id == "000006") {
		//待我审批
		stateTo = "zbgl/dwsp";
	} else if(id == "000007") {
		//出差申请
		stateTo = "zbgl/ccsq";
	} else if(id == "000008") {
		//换班申请
		stateTo = "zbgl/hbsq";
	} else if(id == "000009") {
		//请假申请
		stateTo = "zbgl/qjsq";
	} else if(id == "000010") {
		//个人日历
		stateTo = "";
	} else if(id == "000011") {
		//临时调班
		stateTo = "zbgl/lstb";
	} else if(id == "000012") {
		//值班统计
		stateTo = "";
	} else if(id == "000013") {
		//常用管理
		stateTo = "zbgl/cygl";
	} else if(id == "000014") {
		//值班管理
		stateTo = "zbgl/index";
	} else if(id == "000015") {
		//运行管理
		stateTo = "";
	} else if(id == "000016") {
		//通知运行管理
		stateTo = "";
	} else if(id == "000017") {
		//考核管理
		stateTo = "";
	} else if(id == "000018") {
		//技术论坛
		stateTo = "";
	} else if(id == "000019") {
		//通讯录
		stateTo = "zbgl/txl";
	}
	return stateTo;
}