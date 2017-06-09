/**
 * Created by appian on 2017/6/9.
 */
new Vue({
	el: '#container',
	data: {
		current: 1,
		list: [],
		currentIdx: -1,
		lastIdx: -1,
		keyword: '',
		makesure: false,
	},
	components: {
		tab: FootTab,
	},
	mounted() {
		getUserInit().then(ret => {
			this.list = ret;
		});
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
			con.eq(that.lastIdx).css({'-webkit-transform':'translate3d(0,0,0)','-webkit-transition':'all .2s ease'});
			setTimeout(() => {
				con.eq(that.lastIdx).css({'-webkit-transition':'none'});
			}, 400);
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
			// 删除todo ajax
			if(!confirm('确定要删除该客户吗?')) {
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
		linkDetail(id) {
			alert(id);
		},
	},
});