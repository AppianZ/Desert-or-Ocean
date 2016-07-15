/**
 * Created by JW on 2016/6/29.
 */

(function(wid,dcm) {
    var win = wid;
    var doc = dcm;

    function $id(id) {
        return doc.getElementById(id);
    }

    function $class(name) {
        return doc.getElementsByClassName(name);
    }

    function loop(begin,length,fuc) {
        for(var i = begin; i < length ; i++){
            fuc(i);
        }
    }

    function on(action,selector,callback) {
        doc.addEventListener(action,function(e){
            if(selector == e.target.tagName.toLowerCase() || selector == e.target.className || selector == e.target.id){
                callback(e);
            }
        })
    }

    function DateSelector(config) {
        this.input = config.input;
        this.container = config.container;
        this.type = config.type;
        this.param = (config.type == 1)? [1,1,1,1,1] : config.param;
        this.beginTime = config.beginTime;
        this.endTime = config.endTime;
        this.recentTime = config.recentTime;
        this.callbackFuc = config.callbackFuc;
        
        this.ulCount = 0;
        this.ulDomArr = [];
        this.idxArr = [];//更新后的ul的下标
        this.liHeight = 40;
        this.maxHeight = [];
        this.distance = [];
        this.start =  {
            Y : 0,
            time : ''
        };
        this.move = {
            Y : 0,
            speed : []
        };
        this.end = {
            Y : 0,
            index : 0
        };
        this.resultArr = [];
        this.begin_time = [1970,1,1,0,0];
        this.end_time = [new Date().getFullYear() + 1,12,31,23,59];
        this.recent_time = [new Date().getFullYear(),new Date().getMonth() + 1,new Date().getDate(),new Date().getHours(),new Date().getMinutes()];

        this.initDomFuc();
        this.initReady();
        this.initBinding();
    }

    DateSelector.prototype = {
        constructor : DateSelector,
        checkParam : function(){
            var idxArr = [];
            var _this = this;
            loop(0,_this.param.length,function(i){
                if(_this.param[i] > 0){
                    idxArr.push(i);
                }
            });
            this.ulCount = idxArr[idxArr.length - 1] - idxArr[0] + 1;
            loop(idxArr[0],idxArr[idxArr.length - 1] + 1,function (i) {
                _this.param[i] = 1;
                _this.idxArr.push(i);
            });
        },
        checkTime : function(){
            var _this = this;
            var begin_time =  this.begin_time;
            var end_time =  this.end_time;
            var recent_time =  this.recent_time;
            console.log(_this.idxArr);
            if(_this.beginTime.length == 0){
                loop(0,_this.idxArr.length,function(i){
                    _this.beginTime.push(begin_time[_this.idxArr[i]]);
                });
                console.log(_this.beginTime);
            }
            if (_this.endTime.length == 0){
                loop(0,_this.idxArr.length,function(i){
                    _this.endTime.push(end_time[_this.idxArr[i]]);
                });
                console.log(_this.endTime);
            }
            if (_this.recentTime.length == 0){
                loop(0,_this.idxArr.length,function(i){
                    _this.recentTime.push(recent_time[_this.idxArr[i]]);
                });
                console.log(_this.recentTime);
            }
            if (_this.idxArr.length == _this.beginTime.length && _this.beginTime.length == _this.endTime.length && _this.endTime.length == _this.recentTime.length){
                console.log(_this.param);
                loop(0,_this.param.length,function(i){
                    if(_this.param[i] == 0){
                        switch (i) {
                            case 0:
                                begin_time[i] = new Date().getFullYear();
                                end_time[i] = new Date().getFullYear();
                                break;
                            case 1:
                                begin_time[i] = new Date().getMonth() + 1;
                                end_time[i] = new Date().getMonth() + 1;
                                break;
                            case 2:
                                begin_time[i] = new Date().getDate();
                                end_time[i] = new Date().getDate();
                                break;
                            case 3:
                                begin_time[i] = new Date().getHours();
                                end_time[i] = new Date().getHours();
                                break;
                            case 4:
                                begin_time[i] = new Date().getMinutes();
                                end_time[i] = new Date().getMinutes();
                                break;
                        }
                    }else {
                        loop(0, _this.idxArr.length, function (j) {
                            switch (_this.idxArr[j]) {
                                case 0:
                                    begin_time[_this.idxArr[j]] = _this.beginTime[j] >= 1900 ? _this.beginTime[j] : new Date().getFullYear();
                                    end_time[_this.idxArr[j]] = _this.endTime[j] >= 1900 ? _this.endTime[j] : new Date().getFullYear() + 1;
                                    recent_time[_this.idxArr[j]] = _this.recentTime[j];
                                    break;
                                case 1:
                                    begin_time[_this.idxArr[j]] = (_this.beginTime[j] > 0 && _this.beginTime[j] <= 12) ? _this.beginTime[j] : 1;
                                    end_time[_this.idxArr[j]] = _this.endTime[j] > 0 && _this.endTime[j] <= 12 ? _this.endTime[j] : 12;
                                    recent_time[_this.idxArr[j]] = _this.recentTime[j];
                                    break;
                                case 2:
                                    begin_time[_this.idxArr[j]] = _this.beginTime[j] > 0 && _this.beginTime[j] <= new Date(begin_time[0], begin_time[1], 0).getDate() ? _this.beginTime[j] : 1;
                                    end_time[_this.idxArr[j]] = _this.endTime[j] > 0 && _this.endTime[j] <= new Date(end_time[0], end_time[1], 0).getDate() ? _this.endTime[j] : new Date(end_time[0], end_time[1], 0).getDate();
                                    recent_time[_this.idxArr[j]] = _this.recentTime[j];
                                    break;
                                case 3:
                                    begin_time[_this.idxArr[j]] = _this.beginTime[j] >= 0 && _this.beginTime[j] <= 23 ? _this.beginTime[j] : 0;
                                    end_time[_this.idxArr[j]] = _this.endTime[j] >= 0 && _this.endTime[j] <= 23 ? _this.endTime[j] : 23;
                                    recent_time[_this.idxArr[j]] = _this.recentTime[j];
                                    break;
                                case 4 :
                                    begin_time[_this.idxArr[j]] = _this.beginTime[j] >= 0 && _this.beginTime[j] <= 59 ? _this.beginTime[j] : 0;
                                    end_time[_this.idxArr[j]] = _this.endTime[j] >= 0 && _this.endTime[j] <= 59 ? _this.endTime[j] : 59;
                                    recent_time[_this.idxArr[j]] = _this.recentTime[j];
                                    break;
                            }
                        });
                    }
                });
                var bt = new Date(begin_time[0],begin_time[1],begin_time[2],begin_time[3],begin_time[4]).getTime();
                var et = new Date(end_time[0],end_time[1],end_time[2],end_time[3],end_time[4]).getTime();
                var rt = new Date(recent_time[0],recent_time[1],recent_time[2],recent_time[3],recent_time[4]).getTime();
                console.log(_this.begin_time);
                console.log(_this.end_time);
                console.log(_this.recent_time);
                rt <　bt　? alert('当前时间小于开始时间') : "";
                rt >　et　? alert('当前时间超过结束时间') : "";
                return (bt <= rt && rt < et);
            }else {
                alert('error,please open the console to see the errmsg');
                console.log('构造函数的参数param或recentTime设置有误');
                console.log('param必须是连续的1，recentTime的值必须与param中的值对应');
                console.log('构造函数调用失败，请重新设置参数');
                return false;
            }
        },
        initDomFuc : function(){
            var _this = this;
            this.checkParam();
            if(!this.checkTime())return;
            var html = '';
            html += '<div class="date-selector-bg" id="date-selector-bg-'+ _this.container +'">' +
                '<div  class="date-selector-container" id="date-selector-container-'+ _this.container +'">' +
                '<div class="date-selector-btn-box">' +
                '<div class="date-selector-btn" id="date-selector-btn-cancel">返回</div>';

            if(this.type == 1) {
                html += '<div class="date-selector-tab-box">' +
                    '<div class="date-selector-tab date-selector-tab-active">年月日</div>' +
                    '<div class="date-selector-tab">时分</div>' +
                    '</div>';
            }

            html += '<div class="date-selector-btn" id="date-selector-btn-save-' + _this.container + '">提交</div>' +
                '</div>' +
                '<div class="date-selector-content">';

            if(_this.type == 0){
                loop(0,_this.idxArr.length,function(i){
                    html += '<div class="date-selector date-selector-left">' +
                                '<ul id="date-selector-' + _this.container + '-' + _this.idxArr[i] + '"></ul>' +
                            '</div>';
                });
                html += '<div class="date-selector-up-shadow"></div>' +
                        '<div class="date-selector-down-shadow"></div>' +
                        '<div class="date-selector-line"></div>' +
                        '</div>';
                html += '</div></div>';
                $id(_this.container).innerHTML = html;
                loop(0,_this.ulCount,function (i) {
                    $id('date-selector-container-'+ _this.container).querySelectorAll(".date-selector")[i].style.width = (100/_this.ulCount).toFixed(2) + '%';
                });
            }else if(_this.type == 1){
                html += '<div class="date-selector date-selector-left">' +
                            '<ul id="date-selector-' + _this.container + '-0"></ul>' +
                        '</div>' +
                        '<div class="date-selector date-selector-left">' +
                            '<ul id="date-selector-' + _this.container + '-1"></ul>' +
                        '</div>' +
                        '<div class="date-selector date-selector-left">' +
                            '<ul id="date-selector-' + _this.container + '-2"></ul>' +
                        '</div>' +
                        '<div class="date-selector-up-shadow"></div>' +
                        '<div class="date-selector-down-shadow"></div>' +
                        '<div class="date-selector-line"></div>' +
                    '</div>' +
                    '<div class="date-selector-content date-selector-content-right">' +
                        '<div class="date-selector date-selector-right">' +
                            '<ul id="date-selector-' + _this.container + '-3"></ul>' +
                        '</div>' +
                        '<div class="date-selector date-selector-right">' +
                            '<ul id="date-selector-' + _this.container + '-4"></ul>' +
                        '</div>' +
                        '<div class="date-selector-up-shadow"></div>' +
                        '<div class="date-selector-down-shadow"></div>' +
                        '<div class="date-selector-line"></div>' +
                    '</div>';
                html += '</div></div>';
                $id(_this.container).innerHTML = html;
            }
        },
        initReady : function () {
            var _this = this;
            loop(0,_this.ulCount,function(i) {
                var tempDomUl = $id('date-selector-' + _this.container + '-' + _this.idxArr[i]);
                _this.ulDomArr.push(tempDomUl);
                var tempArray = _this['array' +　_this.idxArr[i]] = [];
                switch (_this.idxArr[i]) {
                    case 0:
                        _this.initCommonArr(tempDomUl,tempArray,_this.beginTime[i],_this.endTime[i],'年',i);
                        break;
                    case 1:
                        _this.initCommonArr(tempDomUl,tempArray,1,12,'月',i);
                        break;
                    case 2:
                        _this.initCommonArr(tempDomUl,tempArray,1,31,'日',i);
                        break;
                    case 3:
                        _this.initCommonArr(tempDomUl,tempArray,0,23,'时',i);
                        break;
                    case 4 :
                        _this.initCommonArr(tempDomUl,tempArray,0,59,'分',i);
                        break;
                }
                tempDomUl.addEventListener('touchstart',function(){
                    _this.touch(event,_this,tempDomUl,_this['array' +　_this.idxArr[i]],i);
                }, false);
                tempDomUl.addEventListener('touchmove',function(){
                    _this.touch(event,_this,tempDomUl,_this['array' +　_this.idxArr[i]],i);
                }, false);
                tempDomUl.addEventListener('touchend',function(){
                    _this.touch(event,_this,tempDomUl,_this['array' +　_this.idxArr[i]],i);
                }, false);
            });
        },
        initBinding :  function () {
            var _this = this;
            var bg = $id('date-selector-bg-' + _this.container);
            var container = $id('date-selector-container-' + _this.container);
            var body = doc.body;
            on('touchstart',_this.input,function(){
                bg.classList.add('date-selector-bg-up');
                container.classList.add('date-selector-container-up');
                body.classList.add('date-selector-locked');
            }, false);

            on('touchstart','date-selector-btn-save-' + _this.container,function(){
                _this.callbackFuc(_this.resultArr);
                bg.classList.remove('date-selector-bg-up');
                container.classList.remove('date-selector-container-up');
                body.classList.remove('date-selector-locked');
            },false);

            on('touchstart','date-selector-bg-'+ _this.container,function(){
                bg.classList.remove('date-selector-bg-up');
                container.classList.remove('date-selector-container-up');
                body.classList.remove('date-selector-locked');
            },false);

            on('touchstart','date-selector-btn-cancel',function(){
                bg.classList.remove('date-selector-bg-up');
                container.classList.remove('date-selector-container-up');
                body.classList.remove('date-selector-locked');
            },false);

            on('touchstart','date-selector-tab',function(event){
                var tab = $class('date-selector-tab');
                var content = $class('date-selector-content');
                loop(0,tab.length,function(i){
                    tab[i].classList.remove('date-selector-tab-active');
                });
                event.target.classList.add('date-selector-tab-active');
                if(event.target.innerHTML == '年月日'){
                    content[0].classList.remove('date-selector-content-left');
                    content[1].classList.add('date-selector-content-right');
                }else {
                    content[0].classList.add('date-selector-content-left');
                    content[1].classList.remove('date-selector-content-right');
                }
            },false);
        },
        initCommonArr : function(tempDomUl,tempArr,min,max,str,idx){
            var _this = this;
            var Html = '';
            loop(min,max + 1,function(i){
                tempArr.push(i);
            });
            _this.maxHeight.push(_this.liHeight * (max - min));
            var res = _this.recentTime[idx];
            _this.resultArr.push(res);
            tempArr.unshift('','');
            tempArr.push('','');
            tempDomUl.style.transform = 'translate3d(0,-' + this.liHeight * (tempArr.indexOf(res) - 2) + 'px, 0)';
            tempDomUl.style.webkitTransform = 'translate3d(0,-' + this.liHeight * (tempArr.indexOf(res) - 2) + 'px, 0)';
            _this.distance.push(this.liHeight * (tempArr.indexOf(res) - 2));
            loop(0,tempArr.length,function(j){
                Html += '<li>' + tempArr[j] + (tempArr[j] == ''?'':str) + '</li>';
            });
            tempDomUl.innerHTML = Html;
        },
        initDay : function(year,month,idx){
            var date = 0;
            var sum = new Date(year,month,0).getDate();
            var sub = 0;
            var _this = this;
            var daySelector = $id('date-selector-' + _this.container + '-2');
            if(sum < this.resultArr[idx]){
                sub = sum - this.array2[this.array2.indexOf(this.resultArr[idx])];
                if(sub < 0){
                    var y = daySelector.style.transform.split(',')[1].replace('px','');
                    daySelector.style.transform = 'translate3d(0,' + (y - sub * this.liHeight) + 'px, 0)';
                    daySelector.style.webkitTransform = 'translate3d(0,' + (y - sub * this.liHeight) + 'px, 0)';
                    daySelector.style.transition = 'transform 0.15s ease-out';
                    daySelector.style.webkitTransition = '-webkit-transform 0.15s ease-out';
                    this.resultArr[idx] = -( y / this.liHeight ) + sub + 1;
                }
            }
            this.array2　= [];
            while (date < sum) {
                this.array2.push(date + 1);
                date++;
            }
            var Html = '';
            this.array2.unshift('','');
            this.array2.push('','');
            for(var i = 0; i< this.array2.length ; i++){
                Html += '<li>' + this.array2[i] + (this.array2[i]==''?'':'日') + '</li>';
            }
            daySelector.innerHTML = Html;
            this.maxHeight[idx] = this.liHeight * (sum - 1);
        },
        checkRange : function(){

        },
        initPosition: function(dis,max,idx){
            dis = dis < 0 ? 0 : dis;
            dis = dis > max ? max : dis;
            var sub =  dis % this.liHeight;
            if(sub < this.liHeight/2){
                this.distance[idx] = dis - sub ;
            }else {
                this.distance[idx] = dis + (this.liHeight - sub) ;
            }
            return this;
        },
        initSpeed : function (arr,dir,max,idx) {
            var variance = 0;
            var sum = 0;
            for(var i in arr){
                sum += arr[i] - 0;
            }
            for(var j in arr){
                variance += (arr[j]-(sum/arr.length)) * (arr[j]-(sum/arr.length));
            }
            var rate = 0;
            if((variance/arr.length).toFixed(2) > .1){
                rate = max > this.liHeight * 15 ? dir * 2 : 0;
                this.initPosition(this.distance[idx] + rate, max,idx);
                this.move.speed[0] = .3;
            }else {
                this.initPosition(this.distance[idx],max,idx);
                this.move.speed[0] = this.move.speed[0] > 0.3 ? .3 : this.move.speed[0];
            }
            return this;
        },
        touch : function(event,that,$selector,array,idx) {
            event = event || window.event;
            switch (event.type) {
                case "touchstart":
                    that.move.speed = [];
                    that.start.Y = event.touches[0].clientY;
                    that.start.time = Date.now();
                    break;
                case "touchend":
                    that.end.Y = event.changedTouches[0].clientY;
                    var tempDis = that.distance[idx] + (that.start.Y - that.end.Y);
                    that.distance[idx] = tempDis < 0 ? 0 : (tempDis < that.maxHeight[idx] ? tempDis : that.maxHeight[idx]);
                    // console.log(that.move.speed);
                    that.initSpeed(that.move.speed, that.start.Y - that.end.Y, that.maxHeight[idx], idx);
                    that.resultArr[idx] = array[that.distance[idx]/40 + 2];
                    $selector.style.transform = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
                    $selector.style.webkitTransform = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
                    $selector.style.transition = 'transform ' + that.move.speed[0] + 's ease-out';
                    $selector.style.transition = '-webkit-transform ' + that.move.speed[0] + 's ease-out';
                    that.end.index = that.distance[idx] / that.liHeight + 2;
                    if (that.idxArr[idx] == 0 && that.idxArr[2]) {
                        that.resultArr[idx] = array[that.end.index];
                        that.initDay(that.resultArr[idx], that.resultArr[1],idx + 2);
                    } else if (that.idxArr[idx] == 1 && that.idxArr[2]) {
                        that.resultArr[idx] = array[that.end.index];
                        var tempYear = that.idxArr[0] == 0?that.resultArr[idx] : new Date().getFullYear();
                        that.initDay(tempYear, that.resultArr[idx], idx + 1);
                    } else {}
                    that.checkRange(that.resultArr);
                    console.log(that.resultArr);
                    break;
                case "touchmove":
                    event.preventDefault();
                    that.move.Y = event.touches[0].clientY;
                    var offset = that.start.Y - that.move.Y;
                    if (that.distance[idx] == 0 && offset < 0) {
                        $selector.style.transform = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
                        $selector.style.webkitTransform = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
                        $selector.style.transition = 'transform 0.3s ease-out';
                        $selector.style.transition = '-webkit-transform 0.3s ease-out';
                    } else {
                        $selector.style.transform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
                        $selector.style.webkitTransform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
                    }
                    if (this.distance[idx] <= -that.maxHeight[idx]) {
                        $selector.style.transform = 'translate3d(0, -' + (max + that.liHeight) + 'px, 0)';
                        $selector.style.webkitTransform = 'translate3d(0, -' + (max + that.liHeight) + 'px, 0)';
                        $selector.style.transition = 'transform 0.3s ease-out';
                        $selector.style.transition = '-webkit-transform 0.3s ease-out';
                    }
                    if (Math.abs(offset).toFixed(0) % 5 === 0) {
                        var time = Date.now();
                        that.move.speed.push((Math.abs(offset) / (time - that.start.time)).toFixed(2));
                    }
                    break;
            }
        }
    };
    win.DateSelector = DateSelector;
})(window,document);
  