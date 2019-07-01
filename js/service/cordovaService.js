angular.module('app.cordova.services', [])
	.factory('cordovaService', ['$rootScope', 'ionicService', 'stateService',
		function($rootScope, ionicService, stateService) {
			var cordovaUtils = {
				//开始定位
				location: function(callback, errorcallback) {
					if (type) {
						if (isAndroid) {
							window.parent.navigator.mlocation.mLocation('startLocation', '', callback, errorcallback);
						} else {
							setTimeout(function() {
								locationPosition.getCurrentLocation(callback, errorcallback, "getLocation");
							}, 1000);
						}
					} else {
						var options = {
							maximumAge: 3000,
							timeout: 100000,
							enableHighAccuracy: true
						};
						if (isAndroid) {
							window.parent.navigator.geolocation.getCurrentPosition(function(data) {
								var result = {};
								result.lng = data.coords.longitude;
								result.lat = data.coords.latitude;

								var convertor = new Convertor('nLsK9qUii8uBZlkPAQUozAf9mR5xNVZF');
								var result2 = convertor.GCJ2BD09(result);

								callback(result2);
							}, errorcallback, options);
						} else {
							navigator.geolocation.getCurrentPosition(function(data) {
								var result = {};
								result.lng = data.coords.longitude;
								result.lat = data.coords.latitude;

								var convertor = new Convertor('nLsK9qUii8uBZlkPAQUozAf9mR5xNVZF');
								var result2 = convertor.GCJ2BD09(result);

								callback(result2);
							}, errorcallback, options);
						}
					}
				},

				//二维码扫描
				saomiao: function() {
					if (type) {
						if (isAndroid) {
							window.parent.cordova.plugins.barcodeScanner.scan(onScanSuccess, onScanError);
						} else {
							cordova.plugins.barcodeScanner.scan(onScanSuccess, onScanError);
						}
					} else {
						if (isAndroid) {
							window.parent.navigator.forward.goToScanTwoDiemCode(onScanSuccess, onScanError);
						} else {
							navigator.forward.goToScanTwoDiemCode(onScanSuccess, onScanError);
						}
					}

					function onScanSuccess(data) {
						var str = data.text;
						var arr = str.split(",");
					}

					function onScanError(error) {
						ionicService.toast("扫描失败:" + error, 1000);
					}
				},

				//电话拨号
				callNumber: function(phonenumber, callback, errorcallback) {
					try {
						if (type) {
							if (isAndroid) {
								window.parent.plugins.CallNumber.callNumber(callback, errorcallback, phonenumber, false);
							} else {
								plugins.CallNumber.callNumber(callback, errorcallback, phonenumber, false);
							}
						} else {
							window.location.href = "tel:" + phonenumber;
						}
					} catch (e) {}
				},

				//cordova拍照
				getPicture: function(callback, errorcallback, option) {
					try {
						if (isAndroid) {
							window.parent.navigator.camera.getPicture(callback, errorcallback, option);
						} else {
							navigator.camera.getPicture(callback, errorcallback, option);
						}
					} catch (e) {
						ionicService.toast("拍照失败", 1000);
					}
				}

			};
			return cordovaUtils;
		}
	])
