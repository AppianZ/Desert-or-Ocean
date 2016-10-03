/**
 * Created by appian on 16/10/1.
 */
var $data = {
	owner: { //自己
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '如果嗳,请深嗳请深嗳请深嗳',
		value_now: 123123,
		balance_total: 321321,
	},
	master: { //主人的相关信息
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg', //头像
		nickname: '如果嗳,请深嗳', // 昵称
		value_now: 123123, // 身价
		balance_total: 321321, // 金钱
	},
	value_now_list: [{ //按身价排名的好友列表
		id: 1,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '我,别放手',
		value_now: 1,
		balance_total: 111,
	}, {
		id: 2,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '嗳你所以给你最后的自由',
		value_now: 222222,
		balance_total: 222,
	}, {
		id: 3,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '硪扪是塘,甜到忧伤',
		value_now: 33333333333,
		balance_total: 333,
	}, {
		id: 4,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '嗳你所以给你最后的自由',
		value_now: 2222,
		balance_total: 222,
	}, {
		id: 5,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '硪扪是塘,甜到忧伤',
		value_now: 3333,
		balance_total: 333,
	}],
	balance_total_list: [{ //按财富排名的好友列表
		id: 1,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '抱紧我,别放手',
		value_now: 4444,
		balance_total: 444,
	}, {
		id: 2,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '硪扪是塘,甜到忧伤',
		value_now: 5555,
		balance_total: 555,
	}, {
		id: 3,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '嗳你所以给你最后的自由',
		value_now: 6666,
		balance_total: 666,
	}],
	slave_history: [{
		nickname: '吴亮亮',
		alias: '566',
		doing: '跑去yomi+买面包',
		type: 0, // 处理金钱的type,0赚钱,1浪费,2,消费。。。。
		value: 3, // 金钱的数额
	}, {
		nickname: '黄哲宇',
		alias: '小哲',
		doing: '跑去yomi+买面包',
		type: 1, // 处理金钱的type,0赚钱,1浪费,2,消费。。。。
		value: 13, // 金钱的数额
	}],
};