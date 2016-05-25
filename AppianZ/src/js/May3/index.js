/**
 * Created by JW on 2016/5/23.
 */
var yearArr = [],monthArr = [],dateArr=[];
var liHeight = 40;
var maxYearHeight = 0,maxMonthHeight = 0,maxDateHeight = 0;

var yearUl = document.getElementById('year');
var monthUl = document.getElementById('month');
var dateUl = document.getElementById('date');

var currentYear = new Date().getFullYear();//实际年份
var currentMonth = new Date().getMonth() + 1;//实际年份

window.onload = function () {
    var count = 100;//设置年份多少年
    initArr.initYear(currentYear,count);
    initArr.initMonth();
    initArr.initDate(currentYear,1);
    daySelector.readyLoad();
};

var initArr = (function(){
    return {
        'initArr' : function (arr,ul) {
            var Html = '';
            arr.unshift(' ',' ');
            arr.push(' ',' ');
            for(var i = 0; i< arr.length ; i++){
                Html += '<li>' + arr[i] + '</li>';
            }
            ul.innerHTML = Html;
            return this;
        },
        'initYear' : function(current,count){
            var year = 0;
            while (year < count) {
                yearArr.unshift(current - year);
                year++;
            }
            this.initArr(yearArr,yearUl);
            maxYearHeight = liHeight * (count - 1);
        },
        'initMonth' : function(){
            var month = 0;
            while (month < 12) {
                monthArr.push(month + 1);
                month++;
            }
            this.initArr(monthArr,monthUl);
            maxMonthHeight = liHeight * 11;
        },
        'initDate' : function (year,month){//传入真实年份和月份
            var date = 0;
            var sum = new Date(year,month,0).getDate();
            dateArr　= [];
            while (date < sum) {
                dateArr.push(date + 1);
                date++;
            }
            this.initArr(dateArr,dateUl);
            maxDateHeight = liHeight * (sum - 1);
        }
    }
})();


var daySelector = (function(){
    return {
        start: { //所有跟touchstart有关的参数
            Y : 0,
            time : ''
        } ,
        move : { //所有跟touchmove有关的参数
            Y : 0,
            speed : []
        },
        end : { //所有跟touchmove有关的参数
            Y : 0,
            index : 0
        },
        initListener : function(ul,max,array){
            var _this = this;
            ul.addEventListener('touchstart',function(){
                _this.touch(event,_this,ul,max,array);
            }, false);
            ul.addEventListener('touchmove',function(){
                _this.touch(event,_this,ul,max,array);
            }, false);
            ul.addEventListener('touchend',function(){
                _this.touch(event,_this,ul,max,array);
            }, false);
        },
        readyLoad : function(){
            this.initListener(yearUl,maxYearHeight,yearArr);
            this.initListener(monthUl,maxMonthHeight,monthArr);
            this.initListener(dateUl,maxDateHeight,dateArr);
        },
        initPosition: function(dis,max){  //位置格式化
            dis = dis < 0 ? 0 : dis;
            dis = dis > max ? max : dis;
            var sub =  dis % liHeight;
            if(sub < liHeight/2){
                this.distance = dis - sub ;
            }else {
                this.distance = dis + (liHeight - sub) ;
            }
            return this;
        },
        initSpeed : function (arr,dir,max) { //速度Arr格式化
            var variance = 0;
            var sum = 0;
            for(var i in arr){
                sum += arr[i] - 0;
            }
            for(var j in arr){
                variance += (arr[j]-(sum/arr.length)) * (arr[j]-(sum/arr.length));
            }
            console.log('方差:' + (variance/arr.length).toFixed(2));

            if((variance/arr.length).toFixed(2) > .1){ //可根据速度变化来调节滑动状态！！！
                this.initPosition(this.distance + dir * 3,max);
                this.move.speed[0] = .3;
            }else {
                this.initPosition(this.distance,max);
                this.move.speed[0] = this.move.speed[0] > 0.3 ? .3 : this.move.speed[0];
            }
            return this;
        },
        touch : function(event,that,$selector,max,arrry){
            event = event || window.event;
            switch(event.type) {
                case "touchstart":
                    that.move.speed = [];
                    that.start.Y = event.touches[0].clientY;
                    that.start.time = Date.now();
                    break;
                case "touchend":
                    that.end.Y = event.changedTouches[0].clientY;
                    var tempDis = that.distance + (that.start.Y - that.end.Y);
                    that.distance = tempDis < 0 ? 0 : (tempDis < max ? tempDis : max);
                    console.log(that.move.speed);
                    this.initSpeed(that.move.speed,that.start.Y - that.end.Y,max);
                    $selector.style.transform = 'translate3d(0,-' +  that.distance + 'px, 0)';
                    $selector.style.transition = 'all ' + that.move.speed[0] + 's ease-out';
                    that.end.index = that.distance/liHeight + 2;
                    if($selector.getAttribute('id') == 'year') {
                        currentYear = arrry[that.end.index];
                        initArr.initDate(currentYear,currentMonth);
                    }else if($selector.getAttribute('id') == 'month') {
                        currentMonth = arrry[that.end.index];
                        initArr.initDate(currentYear,currentMonth);
                    }
                    break;
                case "touchmove":
                    event.preventDefault();
                    that.move.Y = event.touches[0].clientY;
                    var offset = that.start.Y - that.move.Y;
                    if (that.distance == 0 && offset < 0) {
                        $selector.style.transform = 'translate3d(0,' + 1.5 * liHeight + 'px, 0)';
                        $selector.style.transition = 'all 0.3s ease-out';
                    }else {
                        $selector.style.transform = 'translate3d(0,-'+ (offset + that.distance) +'px, 0)';
                    }
                    if(this.distance <= -max){
                        $selector.style.transform = 'translate3d(0, -' + (max+liHeight) + 'px, 0)';
                        $selector.style.transition = 'all 0.3s ease-out';
                    }

                    if (Math.abs(offset) % 5 === 0) {//存储速度
                        var time = Date.now();
                        that.move.speed.push((Math.abs(offset) / (time - that.start.time)).toFixed(2));
                    }
                    break;
            }
        }
    }
})();




