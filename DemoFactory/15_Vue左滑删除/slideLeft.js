/**
 * Created by appian on 2017/6/9.
 */
new Vue({
	el: '#container',
	data: {
		list: [{
			"userId": "1001",
			"account": "1001-1001-1001",
			"nickName": "毛大大",
		},{
			"userId": "1002",
			"account": "1002-1002-1002",
			"nickName": "邓大大",
			"status": 1
		},{
			"userId": "1003",
			"account": "1003-1003-1003",
			"nickName": "江大大",
			"status": 1
		},{
			"userId": "1004",
			"account": "1004-1004-1004",
			"nickName": "胡大大",
			"status": 1
		},{
			"userId": "1005",
			"account": "1005-1005-1005",
			"nickName": "习大大",
			"status": 1
		}],
		currentIdx: -1,
		lastIdx: -1,
		makesure: false,
		keyword: '',
	},
	mounted() {
		const that = this;
		etouch("#list", ".con", () => {
		}).on('swiper',function(e,touch) {
			that.makesure = true;
			const fontSize = parseInt(document.getElementsByTagName('HTML')[0].style.fontSize) * 2.66667 * (-1);
			if (touch.distanceX < 0) {
				$(this).css("-webkit-transform",'translate3d('+ (touch.distanceX < fontSize ? fontSize : touch.distanceX)  +'px,0,0)');
			} else {
				that.currentIdx = -1;
				$(this).css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transition':'all .2s ease'});
				setTimeout(() => {
					$(this).css({'-webkit-transition':'none'});
				}, 200);
			}
		}).on('left',function() {
			that.makesure = true;
			const con = $("#list .con");
			if(that.lastIdx < 0) return;
			con.eq(that.lastIdx).css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transition':'all .2s ease'});
			setTimeout(() => {
				con.eq(that.lastIdx).css({'-webkit-transition':'none'});
			}, 500);
		}).on('right',function() {
			that.currentIdx = -1;
			const con = $("#list .con");
			con.eq(that.lastIdx).css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transition':'all .2s ease'});
			setTimeout(() => {
				con.eq(that.lastIdx).css({'-webkit-transition':'none'});
			}, 200);
		});
	},
	methods: {
		deleteItem(id, index) {
			if(!confirm(`确定删除 第${index}个好友,id ${id}`)) {
				this.currentIdx = -1;
				this.makesure = false;
				const con = $("#list .con");
				con.eq(index).css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transition':'all .2s ease'});
				setTimeout(() => {
					con.eq(index).css({'-webkit-transition':'none'});
				}, 200);
			} else {
				this.list.splice(index, 1);
				this.currentIdx = -1;
				this.makesure = false;
				const con = $("#list .con");
				con.eq(index).css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transition':'all .2s ease'});
				setTimeout(() => {
					con.eq(index).css({'-webkit-transition':'none'});
				}, 200);
			}
		},
		touchStart(idx) {
			this.lastIdx = this.currentIdx;
			this.currentIdx = idx;
			this.makesure = false;
		},
		clickDetail(id, index) {
			alert(`你在点击 第${index}个好友,id ${id}`);
			this.currentIdx = -1;
			this.makesure = false;
			const con = $("#list .con");
			con.eq(index).css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transition':'all .2s ease'});
			setTimeout(() => {
				con.eq(index).css({'-webkit-transition':'none'});
			}, 200);
		},
	},
});