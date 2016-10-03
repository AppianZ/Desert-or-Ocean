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
				alert(123);
			}
		}
	}
});


new Vue({
	el: '#main',
	data: {
		tabon : 0,
		payList: $data.pay_available_list,
		valueList: $data.value_now_list,
		balanceList: $data.balance_total_list,
		listType: 0,
	},
	methods : {
		switchTab : function(num){
			this.tabon = num;
		},
		switchList : function(num){
			this.listType = num;
		},
	},
	created : function () {
		console.log(this);
	}
});