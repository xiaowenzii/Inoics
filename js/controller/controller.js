angular.module('train.controllers', [])
	.controller('loginCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$ionicLoading', 'ionicService', function(
		$rootScope, $scope, $state, $timeout, $ionicLoading, ionicService) {
		$scope.vc = {
			//登入
			dologin: function() {
				$state.go("tab");
			}
		}
	}])

	.controller('tabsCtrl', ['$rootScope', '$scope', '$stateParams', '$timeout', function($rootScope, $scope, $stateParams,
		$timeout) {}])

	.controller('tab1Ctrl', function($rootScope, $scope, $state, $stateParams, $ionicHistory, $timeout, $ionicLoading,
		$ionicPopup, ionicService, formatService) {
		$scope.vo = {
			aaa: '城市',
			itemI: {
				province: ITEM_DEFUALT1,
				level: ITEM_DEFUALT1,
				classify: ITEM_DEFUALT1,
				more: ITEM_DEFUALT1
			},
			itemII: {
				city: false
			},
			hideItem: false,
			//省份
			province: {
				selected: '0000',
				provinceList: PROVINCE_LIST
			},
			//城市
			city: {
				selected: '',
				cityList: []
			},
			cityJx: CITY_JX,
			cityHb: CITY_HB,
			//学校级别数据
			level: {
				selected: '0000',
				levelList: SCHOOL_LEVEL_LIST
			},
			//分类数据
			classify: {
				checked: '',
				classifyList: CLASSFY_LIST
			},
			//更多
			moreType: {
				selected: '0000',
				moreTypeList: MORE_TYPE_LIST
			},
			moreCon: {},
			moreTuition: {
				checked: '',
				dataList: MORE_TUITION_LIST
			},
			morePersonNum: {
				checked: '',
				dataList: MORE_PERSON_NUM_LIST
			},
			sj: formatService.formatDate(new Date()),
			maxtime: '2030.12.12'
		}

		$scope.ready = (function() {
			$scope.vo.moreCon = $scope.vo.moreTuition;
		})()
	})

	.controller('tab2Ctrl', function($rootScope, $scope, $state, $ionicHistory, $interval, $timeout, $ionicLoading,
		$location,
		$ionicPopup, ionicService) {
		$scope.vo = {
			delayData: '',
			theTime: new Date().toLocaleTimeString()
		}
		
		$scope.vc = {
			//保存数据
			save: function() {
				if (iscordova) {
					cordovaService.sqlOperate('save');
				} else {
					ionicService.toast("非移动端操作", 1000);
				}
			},
			//查询数据
			search: function() {
				if (iscordova) {
					cordovaService.sqlOperate('search');
				} else {
					ionicService.toast("非移动端操作", 1000);
				}
			}
		}

		//$interval服务
		$timeout(function() {
			$scope.vo.delayData = "星期三";
		}, 1000);

		//$interval 服务
		$interval(function() {
			$scope.vo.theTime = new Date().toLocaleTimeString();
		}, 1000);
	})

	.controller('tab3Ctrl', function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $ionicPopup, formatService) {
		$scope.vo = {
			//当前 年,月,日, 假期日
			currentDay: '',
			currentMonth: '',
			currentYear: '',
			glHoliday: '',
			nlHoliday: '',
		}

		$scope.vc = {
			//创建日历
			initTime: function() {
				//初始化显示 当前年和月
				var now = new Date();
				$scope.vo.currentYear = now.getFullYear();
				$scope.vo.currentMonth = now.getMonth() + 1;
				$scope.vo.currentDay = now.getDate();
				$scope.vo.glHoliday = getHolidays($scope.vo.currentMonth, $scope.vo.currentDay);
				//展示指定的年和月的所有日期
				$scope.vc.showCleander($scope.vo.currentYear, $scope.vo.currentMonth);
			},
			//展示指定的年和月的所有日期
			showCleander: function (year, month) {
				$scope.nldate = show_lunar_calendar(year, month, $scope.currentDay)
				$scope.vo.glHoliday = getHolidays(month, $scope.currentDay);
				$scope.vo.nlHoliday = getnlHolidays($scope.nldate);
				$scope.dayList = [];
			
				$scope.beforeDays = [];
				for (var i = 1; i <= monthContainDays(year, month - 1); i++) {
					var nldate = show_lunar_calendar(year, month - 1, i);
					var day = {};
					var holiday = getHolidays(month - 1, i);
					var nlHoliday = getnlHolidays(nldate);
					day.daycount = i;
					day.holiday = holiday;
					day.nldate = nldate;
					day.nlHoliday = nlHoliday;
					if (day.holiday || day.nlHoliday) {
						day.isHoliday = true;
					} else {
						day.isHoliday = false;
					}
					day.display = false;
					$scope.beforeDays.push(day);
				}
			
				$scope.afterDays = [];
				for (var i = 1; i <= monthContainDays(year, month + 1); i++) {
					var nldate = show_lunar_calendar(year, month + 1, i);
					var day = {};
					var holiday = getHolidays(month + 1, i);
					var nlHoliday = getnlHolidays(nldate);
					day.daycount = i;
					day.holiday = holiday;
					day.nldate = nldate;
					day.nlHoliday = nlHoliday;
					if (day.holiday || day.nlHoliday) {
						day.isHoliday = true;
					} else {
						day.isHoliday = false;
					}
					day.display = false;
					$scope.afterDays.push(day);
				}
				//得到表示指定年和月的1日的那个时间对象
				var date = new Date(year, month - 1, 1);
			
				//判断这个月1号是星期几，然后添加响应空格
				var dayOfWeek = date.getDay();
				var stack = [];
			
				for (var i = 0; i < dayOfWeek; i++) {
					stack.push($scope.beforeDays.pop());
			
				}
				stack.reverse();
				for (var i = 0; i < dayOfWeek; i++) {
					stack.push($scope.beforeDays.pop());
					$scope.dayList.push(stack.shift());
				}
			
				//计算一个月有多少天
				var daysOfMonth = monthContainDays(year, month);
				//从1号开始添加日历数字
				for (var i = 1; i <= daysOfMonth; i++) {
					var nldate = show_lunar_calendar(year, month, i);
					var day = {};
					var holiday = getHolidays(month, i);
					var nlHoliday = getnlHolidays(nldate);
					day.daycount = i;
					day.holiday = holiday;
					day.nldate = nldate;
					day.nlHoliday = nlHoliday;
					if (day.holiday || day.nlHoliday) {
						day.isHoliday = true;
					} else {
						day.isHoliday = false;
					}
					$scope.dayList.push(day);
				}
				console.log($scope.dayList);
			
				date.setDate(daysOfMonth);
				var dayOfLastWeek = date.getDay();
				for (var i = 6 - dayOfLastWeek; i > 0; i--) {
					$scope.dayList.push($scope.afterDays.shift());
				}
			},
			//返回月份包含的天数 
			monthContainDays: function(year, month) {
				return new Date(year, month, 0).getDate();
			},
			//获取公历节假日名称
			getHolidays :function(month, date) {
				var holiday = "";
				if ((month == 1) && (date == 1)) {
					holiday = "元旦";
				}
			
				if ((month == 3) && (date == 12)) {
					holiday = "植树节";
				}
			
				if ((month == 4) && (date == 5)) {
					holiday = "清明";
				}
			
				if ((month == 5) && (date == 1)) {
					holiday = "劳动节";
				}
			
				if ((month == 5) && (date == 4)) {
					holiday = "青年节";
				}
			
				if ((month == 6) && (date == 1)) {
					holiday = "儿童节";
				}
			
				if ((month == 8) && (date == 1)) {
					holiday = "建军节";
				}
			
				if ((month == 8) && (date == 16)) {
					holiday = "情人节";
				}
			
				if ((month == 10) && (date == 1)) {
					holiday = "国庆节";
				}
			
				if ((month == 12) && (date == 25)) {
					holiday = "圣诞节";
				}
				return holiday;
			},
			//获取农历节假日名称
			getnlHolidays: function(nldate) {
				nldate = nldate.month + nldate.day;
				var nlHolidays = "";
				if (nldate == "正月初一") {
					nlHolidays = "春节";
				}
				if (nldate == "正月十五") {
					nlHolidays = "元宵节";
				}
				if (nldate == "五月初五") {
					nlHolidays = "端午节";
				}
				if (nldate == "七月初七") {
					nlHolidays = "七夕";
				}
				if (nldate == "七月十五") {
					nlHolidays = "中元节";
				}
				if (nldate == "八月十五") {
					nlHolidays = "中秋节"
				}
				if (nldate == "九月初九") {
					nlHolidays = "重阳节"
				}
				if (nldate == "腊月初八") {
					nlHolidays = "腊八节"
				}
				if (nldate == "腊月廿四") {
					nlHolidays = "小年"
				}
				return nlHolidays;
			}
		}
	})
