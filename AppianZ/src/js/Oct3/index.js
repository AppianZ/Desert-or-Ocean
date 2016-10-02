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
		switchHead: function (type) {
			this.headType = type;
		}	
	},
});

Vue.component('list',{
	template : '#listTpl',
	props : ['el', 'idx'],
});


new Vue({
	el: '#main',
	data: {
		on : 0,
		statusList: $data.friends_by_status,
		goldenList: $data.friends_by_golden,
		listType: 0,
	},
	methods : {
		switchTab : function(num){
			this.on = num;
		},
	},
	created : function () {
		console.log(this);
	}
});