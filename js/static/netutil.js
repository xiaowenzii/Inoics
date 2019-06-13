//条件菜单显示隐藏状态
var ITEM_SELECTED = '0';
var ITEM_DEFUALT1 = '1';
var ITEM_DEFUALT2 = '2';

var PROVINCE_LIST = [{
		code: '0000',
		name: '全部'
	},
	{
		code: '0001',
		name: '江西省'
	},
	{
		code: '0002',
		name: '湖北省'
	}
];

var CITY_JX = [ //江西城市
	{
		code: '0001-0000',
		name: '全部'
	},
	{
		code: '0001-0001',
		name: '南昌市'
	},
	{
		code: '0001-0002',
		name: '上饶市'
	}
]

var CITY_HB = [ //湖北城市
	{
		code: '0002-0000',
		name: '全部'
	},
	{
		code: '0002-0001',
		name: '武汉市'
	},
	{
		code: '0002-0002',
		name: '襄阳市'
	}
]

var SCHOOL_LEVEL_LIST = [{
		code: '0000',
		name: '全部'
	},
	{
		code: '0001',
		name: '一本'
	},
	{
		code: '0002',
		name: '二本'
	},
	{
		code: '0003',
		name: '三本'
	}
]

var CLASSFY_LIST = [{
		code: '0000',
		name: '科学',
		checked: true
	},
	{
		code: '0001',
		name: '医学',
		checked: false
	},
	{
		code: '0002',
		name: '生物',
		checked: false
	},
	{
		code: '0003',
		name: '化学',
		checked: false
	}
]

var MORE_TYPE_LIST = [{
		code: '0000',
		name: '学费'
	},
	{
		code: '0001',
		name: '人数'
	}
]

var MORE_TUITION_LIST = [{
		code: '0001-0000',
		name: '0-5000元',
		checked: false
	},
	{
		code: '0001-0001',
		name: '5000-10000元',
		checked: false
	},
	{
		code: '0001-0002',
		name: '10000-15000元',
		checked: false
	},
	{
		code: '0001-0003',
		name: '15000-20000元',
		checked: false
	}
]
var MORE_PERSON_NUM_LIST = [{
		code: '0002-0000',
		name: '0-5000人',
		checked: false
	},
	{
		code: '0002-0001',
		name: '5000-10000人',
		checked: false
	},
	{
		code: '0002-0002',
		name: '10000-15000人',
		checked: false
	},
	{
		code: '0002-0003',
		name: '15000-20000人',
		checked: false
	}
]
