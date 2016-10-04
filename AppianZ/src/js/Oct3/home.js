/**
 * Created by appian on 16/10/1.
 */
var overscroll = function(el) {
	el.addEventListener('touchstart', function() {
		var top = el.scrollTop
			, totalScroll = el.scrollHeight
			, currentScroll = top + el.offsetHeight;
		
		if(top === 0) {
			el.scrollTop = 1
		} else if(currentScroll === totalScroll) {
			el.scrollTop = top - 1
		}
	})
	
	el.addEventListener('touchmove', function(evt) {
		if(el.offsetHeight < el.scrollHeight){
			evt._isScroller = true;
			// alert(123);
		}
	})
};


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
				this.$emit('swithpopup');
			}
		}
	}
});

Vue.component('popup',{
	template : '#popupTpl',
	props : ['el', 'owner', 'status'],
	methods: {
		hidePopup: function () {
			this.$emit('swithpopup');
		},
		pay: function(id){
			alert(id);
		}
	}
});

new Vue({
	el: '#main',
	data: {
		owner: $data.owner,
		tabon : 0,
		payList: $data.pay_available_list,
		valueList: $data.value_now_list,
		balanceList: $data.balance_total_list,
		listType: 0,
		popupObj: {},
		popupstatus: false,
	},
	methods : {
		switchTab : function(num){
			this.tabon = num;
		},
		switchList : function(num){
			this.listType = num;
		},
		swithPopupStatus : function(el){
			this.popupstatus = !this.popupstatus;
			if(!this.popupstatus) return;
			Object.assign(this.popupObj, el);
			console.log(this.popupObj);
		},
		overscroll: function(el) {
			el.addEventListener('touchstart', function() {
				var top = el.scrollTop
					, totalScroll = el.scrollHeight
					, currentScroll = top + el.offsetHeight;
				
				if(top === 0) {
					el.scrollTop = 1
				} else if(currentScroll === totalScroll) {
					el.scrollTop = top - 1
				}
			})
			
			el.addEventListener('touchmove', function(evt) {
				if(el.offsetHeight < el.scrollHeight){
					evt._isScroller = true;
				}
			})
		},
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
		
	}
});
