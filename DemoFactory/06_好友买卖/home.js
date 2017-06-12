/**
 * Created by appian on 16/10/1.
 */
Vue.component('info',{
	template : '#infoTpl',
	data : function(){
		return {
			headType: 0,
			owner: $data.owner,
			master: $data.master,
		}
	},
	methods: {
		switchHead: function () {
			if (this.master.headimgurl == '') return;
			this.headType = Math.abs(this.headType - 1);
		}	
	},
});

Vue.component('list',{
	template : '#listTpl',
	props : ['el', 'idx', 'type'],
	methods: {
		payStraight: function(){
			if (this.type === 0) {
				this.$emit('swithpopup', this.el, 0);
			}
		}
	}
});

Vue.component('popup',{
	template : '#popupTpl',
	props : ['el', 'owner', 'status', 'type'],
	methods: {
		hidePopup: function () {
			this.$emit('swithpopup');
		},
		pay: function(id){
			alert(id);
		},
	}
});

Vue.component('slave', {
	template: '#slaveTpl',
	props: ['el', 'idx', 'current'],
	data: function() {
		return {
			oparetions: $data.oparetions,
		}
	},
	methods : {
		switchReadMore: function(){
			this.$emit('switchslave', this.idx);
		},
		doSthToSlave: function (id) {
			console.log('执行操作' + id);
		}
	}
});

Vue.component('history', {
	template: '#historyTpl',
	props: ['el'],
});

new Vue({
	el: '#main',
	data: {
		owner: $data.owner,
		coin: '',//金币数组
		tabon : 0, //导航类型
		listType: 0,//首屏的三个列表类型
		showList: [],
		payList: $data.pay_available_list,
		valueList: $data.value_now_list,
		balanceList: $data.balance_total_list,
		popupObj: {},
		popupStatus: false,//首屏弹层
		popupType: 0, // 0为固定底部大按钮,1为小按钮
		eventType: true, // 第二屏切换
		hideStatus: true, // 控制第二屏
		historyList: $data.slave_history,
		slaveList: $data.slave_list,
		currentSlave: -1,
		moneyType: -1,//尾屏type,-1没有,0:充值,1提现
		inputNumber: '',// 输入框的数字
	},
	methods : {
		overscroll: function(el) {
			el.addEventListener('touchstart', function() {
				var top = el.scrollTop
					, totalScroll = el.scrollHeight
					, currentScroll = top + el.offsetHeight;
				
				if(top === 0) {
					el.scrollTop = 1;
				} else if(currentScroll === totalScroll) {
					el.scrollTop = top - 1;
				}
			});
			
			el.addEventListener('touchmove', function(evt) {
				if(el.offsetHeight < el.scrollHeight){
					evt._isScroller = true;
				}
			});
		},
		switchTab : function(obj) {
			this.tabon = obj.num;
			if(obj.num == 2) {
				this.coin = this.owner.balance_total.toString();
				if(this.coin == null || this.coin == 0)
					$("#money b p").eq(0).css({"max-width":"300px","-webkit-transform": "translate3d(0,-"+(0) +"px,0)"});
				else this.coinScroll();
			} else {
				this.coin = this.owner.balance_total.toString().split("");
				for (var i = 0 ; i < this.coin.length; i++) {
					$("#money b p").eq(i).css({"max-width":"300px","-webkit-transform":"translate3d(0,0,0)"})
				}
				this.moneyType = -1;
				this.inputNumber = '';
			}
		},
		switchList : function(obj){
			this.listType = obj.num;
			if (obj.num == 0) this.showList = this.payList;
			else if (obj.num == 1) this.showList = this.valueList;
			else if (obj.num == 2) this.showList = this.balanceList;
		},
		swithPopupStatus : function(el, type) {
			if (this.listType > 0) return;
			this.popupStatus = !this.popupStatus;
			this.popupType = type;
			if(!this.popupStatus || type == 1) return;
			Object.assign(this.popupObj, el);
		},
		switchEventType : function(){
			this.eventType = !this.eventType;
			var _this = this;
			setTimeout(function () {
				_this.hideStatus = !_this.hideStatus;
			},350);
		},
		switchCurrentSlave: function (idx) {
			if(this.currentSlave == idx) this.currentSlave = -1;
			else this.currentSlave = idx;
		},
		coinScroll: function() {
			this.coin = this.owner.balance_total.toString().split("");
			for (var i = 0 ; i < this.coin.length; i++) {
				$("#money b p").eq(i).css({"max-width":"300px","-webkit-transform":"translate3d(0,-"+(this.coin[i]*1.40625) +"rem,0)"})
			}
		},
		switchMoneyType: function(type) {
			if (type == 1) {
				alert('提现功能暂未开放');
			}else {
				this.moneyType = type;
				this.inputNumber = '';
			}
		},
		inputMoney: function(num) {
			this.inputNumber += num;
		},
		deleteMoney: function() {
			this.inputNumber = this.inputNumber.substr(0,(this.inputNumber.length -1));
		},
		submitMoey: function() {
			alert(this.moneyType, this.inputNumber);
			this.moneyType = -1;
			this.inputNumber = '';
		}
	},
	mounted: function() {
		this.overscroll(document.querySelector('#containleft'));
		this.overscroll(document.querySelector('#containcenter'));
		this.overscroll(document.querySelector('#containright'));
		document.body.addEventListener('touchmove', function(evt) {
			if(!evt._isScroller) {
				evt.preventDefault();
			}
		});
		this.showList = this.payList;
	},
	watch: {
		inputNumber: function(){
			if(this.moneyType == 1 && this.inputNumber > this.owner.balance_total){
				alert('输入的数字超出兑换范围');
				this.inputNumber = this.inputNumber.substr(0,(this.inputNumber.length -1));
			}else if (this.moneyType == 0 && this.inputNumber.length > 6) {
				alert('输入的数字超出范围');
				this.inputNumber = this.inputNumber.substr(0,(this.inputNumber.length -1));
			}
		},
	}
});
