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
	pay_available_list: [{ //按财富排名的好友列表
		id: 1,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '111抱紧我,别放手',
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
	},{ //按财富排名的好友列表
		id: 1,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '111抱紧我,别放手',
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
	},{ //按财富排名的好友列表
		id: 1,
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '111抱紧我,别放手',
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
	balance_total_list: [],
	slave_list: [{ //按身价排名的好友列表
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
	slave_history: [{
		created_at: '2016-22-22 33:22:22',
		desc: '吴亮亮跑去学校购买了一盒酸奶,然后又去超市买了一个小面包,然后送给了嘎宝一个飞吻',
	}, {
		created_at: '2016-11-11 33:22:22',
		desc: '吴亮亮很恶心,跑到噶宝面前放了个p,还扇了扇,wa,好臭',
	},{
		created_at: '2016-22-22 33:22:22',
		desc: '吴亮亮跑去学校购买了一盒酸奶,然后又去超市买了一个小面包,然后送给了嘎宝一个飞吻',
	}, {
		created_at: '2016-11-11 33:22:22',
		desc: '吴亮亮很恶心,跑到噶宝面前放了个p,还扇了扇,wa,好臭',
	},{
		created_at: '2016-22-22 33:22:22',
		desc: '吴亮亮跑去学校购买了一盒酸奶,然后又去超市买了一个小面包,然后送给了嘎宝一个飞吻',
	}],
};