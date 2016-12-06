/**
 * Created by appian on 2016/12/1.
 */
import MultiPicker from 'mob-multi-picker';

new MultiPicker({
	input : 'targetInput',//点击触发插件的input框的id
	container : 'targetContainer',//插件插入的容器id
	jsonData: $city,
	success : function(arr){
		alert('页面会显示最终结果');
		console.log(arr);
	}//回调
})