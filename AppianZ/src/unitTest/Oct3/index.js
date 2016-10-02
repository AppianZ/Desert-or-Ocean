/**
 * Created by appian on 16/10/1.
 */
var $data = {
	owner: { //自己
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '如果嗳,请深嗳',
		social_status: 123123,
		golden: 321321,
	},
	master: { //主人的相关信息
		headimgurl: '', //头像
		nickname: '如果嗳,请深嗳', // 昵称
		social_status: 123123, // 身价
		golden: 321321, // 金钱
	},
	friends_by_status: [{ //按身价排名的好友列表
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '抱紧我,别放手',
		social_status: 1111,
		golden: 111,
	}, {
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '嗳你所以给你最后的自由',
		social_status: 2222,
		golden: 222,
	}, {
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '硪扪是塘,甜到忧伤',
		social_status: 3333,
		golden: 333,
	}],
	friends_by_golden: [{ //按财富排名的好友列表
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '抱紧我,别放手',
		social_status: 4444,
		golden: 444,
	}, {
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '硪扪是塘,甜到忧伤',
		social_status: 5555,
		golden: 555,
	}, {
		headimgurl: 'http://7xqsim.com1.z0.glb.clouddn.com/%E5%8D%B7%E7%A6%8F.jpg',
		nickname: '嗳你所以给你最后的自由',
		social_status: 6666,
		golden: 666,
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