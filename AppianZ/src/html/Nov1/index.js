/**
 * Created by appian on 2016/11/30.
 */
import DateSelector from 'mob-date-selector';

new DateSelector({
	input : 'date-selector-inputs',//点击触发插件的input框的id
	container : 'targetContainers',//插件插入的容器id
	type : 0,
	//0：不需要tab切换，自定义滑动内容，建议小于三个；
	//1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
	param : [1,1,0,1,0],
	//设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
	beginTime : [2001,1,-31,19],//如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
	endTime : [2020,11,25,20],//如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
	recentTime : [],//如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
	success : function(arr){
		alert(arr);
		console.log(arr);
	}//回调
})