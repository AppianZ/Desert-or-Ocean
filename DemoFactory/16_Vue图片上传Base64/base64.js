/**
 * Created by appian on 2017/6/23.
 */

Vue.component('upload',{
	template : '#uploadTpl',
	data() {
		return {
			cantReadFile: false,
			result: '',
		};
	},
	mounted() {
		if (typeof (FileReader) === 'undefined') {
			this.cantReadFile = true;
			alert('抱歉，你的浏览器不支持 FileReader，请使用其他浏览器！');
		} else {
			this.$refs.ipt.addEventListener('change', this.readFile, false);
		}
	},
	methods: {
		readFile() {
			if(this.cantReadFile){
				alert('抱歉，你的浏览器不支持 FileReader，请使用其他浏览器！');
				return;
			}
			const file = this.$refs.ipt.files[0];
			if (!/image\/\w+/.test(file.type)) {
				alert('请确保文件为图像类型');
				return;
			}
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				this.result = reader.result;
				this.$emit('on-success', reader.result);
			};
		},
	},
});


new Vue({
	el: '#container',
	methods: {
    uploadImage(file) {
			console.log('--- base64 ---');
			console.log(file);
		},
	},
});