/**
 * Created by appian on 16/10/17.
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
			if(fuc(i)) break;
		}
	}
	
	function on(action,selector,callback) {
		doc.addEventListener(action,function(e){
			if(selector == e.target.tagName.toLowerCase() || selector == e.target.className || selector == e.target.id){
				callback(e);
			}
		})
	}
	
	function MultiPicker(config) {
		this.input = config.input;
		this.container = config.container;
		this.jsonData = config.jsonData;
		this.callbackFuc = config.callbackFuc;
		
		this.ulCount = 0; //记录上一次的
		this.ulIdx = 0; //滑动后出现的ul下标,从0开始
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
		this.initDomFuc();
		this.initReady();
		this.initBinding();
	}
	
	MultiPicker.prototype = {
		constructor : MultiPicker,
		checkArrDeep: function(parent){
			if ('child' in parent) {
				this.idxArr.push(this.ulIdx++);
				this.checkArrDeep(parent.child[0]);
			} else this.idxArr.push(this.ulIdx++);
			console.log(this.idxArr);
		},
		initDomFuc : function(){
			var _this = this;
			var html = '';
			html += '<div class="multi-picker-bg" id="multi-picker-bg-'+ _this.container +'">' +
				'<div  class="multi-picker-container" id="multi-picker-container-'+ _this.container +'">' +
				'<div class="multi-picker-btn-box">' +
				'<div class="multi-picker-btn" id="multi-picker-btn-cancel">返回</div>' +
				'<div class="multi-picker-btn" id="multi-picker-btn-save-' + _this.container + '">提交</div>' +
				'</div>' +
				'<div class="multi-picker-content">' +
				'<div class="multi-picker-up-shadow"></div>' +
				'<div class="multi-picker-down-shadow"></div>' +
				'<div class="multi-picker-line"></div>' +
				'</div></div></div>';
				$id(_this.container).innerHTML = html;
		},
		initReady : function () {
			var _this = this;
			this.ulIdx = 0;
			this.idxArr.length = 0;
			_this.checkArrDeep(_this.jsonData[0]);
			
			var parentNode = $id('multi-picker-container-' + _this.container).children[1];
			if (_this.ulCount <= _this.idxArr.length) {
				loop(_this.ulCount, _this.idxArr.length, function (i) {
					var newPickerDiv = document.createElement('div');
					newPickerDiv.setAttribute('class', 'multi-picker');
					newPickerDiv.innerHTML = `<ul id="multi-picker-${_this.container}-${i}"></ul>`;
					parentNode.insertBefore(newPickerDiv,parentNode.children[parentNode.children.length - 3]);
				});
			} else {
				
			}
			
			
			
			
			/*loop(0,_this.ulCount,function(i) {
				var tempDomUl = $id(`multi-picker-${_this.container}-${i}`);
				_this.ulDomArr.push(tempDomUl);
				var tempArray = _this['array' +　_this.idxArr[i]] = [];
				tempDomUl.addEventListener('touchstart',function(){
					_this.touch(event,_this,tempDomUl,_this['array' +　_this.idxArr[i]],i);
				}, false);
				tempDomUl.addEventListener('touchmove',function(){
					_this.touch(event,_this,tempDomUl,_this['array' +　_this.idxArr[i]],i);
				}, false);
				tempDomUl.addEventListener('touchend',function(){
					_this.touch(event,_this,tempDomUl,_this['array' +　_this.idxArr[i]],i);
				}, false);
			});*/
		},
		initBinding :  function () {
			var _this = this;
			var bg = $id('multi-picker-bg-' + _this.container);
			var container = $id('multi-picker-container-' + _this.container);
			var body = doc.body;
			on('touchstart',_this.input,function(){
				bg.classList.add('multi-picker-bg-up');
				container.classList.add('multi-picker-container-up');
				body.classList.add('multi-picker-locked');
			}, false);
			
			on('touchstart','multi-picker-btn-save-' + _this.container,function(){
				_this.callbackFuc(_this.resultArr);
				bg.classList.remove('multi-picker-bg-up');
				container.classList.remove('multi-picker-container-up');
				body.classList.remove('multi-picker-locked');
			},false);
			
			on('touchstart','multi-picker-bg-'+ _this.container,function(){
				bg.classList.remove('multi-picker-bg-up');
				container.classList.remove('multi-picker-container-up');
				body.classList.remove('multi-picker-locked');
			},false);
			
			on('touchstart','multi-picker-btn-cancel',function(){
				bg.classList.remove('multi-picker-bg-up');
				container.classList.remove('multi-picker-container-up');
				body.classList.remove('multi-picker-locked');
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
				Html += '<li>' + tempArr[j] + (tempArr[j] === ''?'':str) + '</li>';
			});
			tempDomUl.innerHTML = Html;
		},
		initRangeArr : function(month,ulIdx,arrIdx,min,max){
			var _this = this;
			var year = _this.idxArr[0] == 0? _this.resultArr[0] : _this.begin_time[0];
			var $selector = $id('multi-picker-' + _this.container + '-' + arrIdx);
			var str = $selector.querySelectorAll("li")[2].innerHTML.substr(-1);
			var dir = (min == -1 ? 1 : 0);//0在顶部,1在底部
			min = (min == -1 ? (arrIdx > 2 ? 0 : 1): min);
			if(max == -1){
				switch (arrIdx) {
					case 0:
						break;
					case 1:
						max = 12;
						break;
					case 2:
						max = new Date(year,month,0).getDate();
						break;
					case 3:
						max = 23;
						break;
					case 4:
						max = 59;
						break;
				}
			}
			var y = 0;
			
			var arr　= [];
			loop (min,max + 1,function(k){
				arr.push(k);
			});
			
			var Html = '';
			arr.unshift('','');
			arr.push('','');
			for(var i = 0; i< arr.length ; i++){
				Html += '<li>' + arr[i] + (arr[i] === '' ?'':str) + '</li>';
			}
			
			_this['array' + arrIdx] = [];
			_this['array' + arrIdx] = arr;
			
			$selector.innerHTML = Html;
			if(dir == 0){
				y = min > this.resultArr[ulIdx] ? 0 : -arr.indexOf(this.resultArr[ulIdx]) * this.liHeight + 80;
				this.resultArr[ulIdx] = this.resultArr[ulIdx] < min ?  min : this.resultArr[ulIdx];
				this.recent_time[_this.idxArr[ulIdx]] = _this.resultArr[ulIdx];
			}else if(dir == 1){
				y = max > this.resultArr[ulIdx] ?
				-arr.indexOf(this.resultArr[ulIdx]) * this.liHeight + 80 :
				-arr.indexOf(max) * this.liHeight + 80;
				this.resultArr[ulIdx] = this.resultArr[ulIdx] > max ?  max : this.resultArr[ulIdx];
				this.recent_time[_this.idxArr[ulIdx]] = _this.resultArr[ulIdx];
			}else {console.log('error')}
			
			$selector.style.transform = 'translate3d(0,' + y + 'px, 0)';
			$selector.style.webkitTransform = 'translate3d(0,'+ y + 'px, 0)';
			$selector.style.transition = 'transform 0.15s ease-out';
			$selector.style.webkitTransition = '-webkit-transform 0.15s ease-out';
			this.maxHeight[ulIdx] = this.liHeight * (max - min);
			this.distance[ulIdx] = Math.abs(y);
		},
		checkRange : function(ulIdx,resIdx,distance,maxHei){
			var _this = this;
			var needInit = true;
			if(distance == 0){
				loop(0,ulIdx,function(n){
					if(_this.distance[n] != 0)needInit=false;
				});
			}else if(distance == maxHei){
				loop(0,ulIdx,function(n){
					if(_this.distance[n] != _this.maxHeight[n])needInit=false;
				});
			}
			
			if(distance == 0 && needInit){
				if(ulIdx + 1 == _this.ulCount){
					_this.resultArr[ulIdx] = _this['array' + _this.idxArr[ulIdx]][2];
					_this.recent_time[_this.idxArr[ulIdx]] = _this.resultArr[ulIdx];
				}
				loop(ulIdx + 1,_this.ulCount,function(k){
					var tempMin = (k == ulIdx + 1 || _this.begin_time[k] == _this.recent_time[k])?_this.beginTime[k]:-1;
					if(tempMin == -1) {
						loop(k,_this.ulCount,function(m){
							tempMin = (_this.distance[m-1] == 0 || _this.distance[m] == 0) ? _this.beginTime[k] : -1;
							if(tempMin != -1){return true;}
						});
					}
					_this.initRangeArr(_this.recent_time[1],k,_this.idxArr[k],tempMin,-1);
					_this.resultArr[ulIdx] = _this['array' + _this.idxArr[ulIdx]][2];
					_this.recent_time[_this.idxArr[ulIdx]] = _this.resultArr[ulIdx];
				});
			}else if(distance == maxHei && needInit){
				var tempIdx = _this['array' + _this.idxArr[ulIdx]].length - 3;
				if(ulIdx + 1 == _this.ulCount){
					_this.resultArr[ulIdx] = _this['array' + _this.idxArr[ulIdx]][tempIdx];
					_this.recent_time[_this.idxArr[ulIdx]] = _this.resultArr[ulIdx];
				}
				loop(ulIdx + 1,_this.ulCount,function(k){
					var tempStatus = true;
					var tempMax = (k == ulIdx + 1 || _this.end_time[k] == _this.recent_time[k])?_this.endTime[k]:-1;
					loop(0,k,function(n){
						if(_this.distance[n] != _this.maxHeight[n]){
							tempMax = -1;
							tempStatus = false;
						}
					});
					
					if(tempMax == -1 && tempStatus) {
						loop(k,_this.ulCount,function(m){
							tempMax = (_this.distance[m-1] == _this.maxHeight[m-1] || _this.distance[m] == _this.maxHeight[m]) ? _this.endTime[k] : -1;
							if(tempMax != -1){return true}
						});
					}
					_this.initRangeArr(_this.end_time[1],k,_this.idxArr[k],-1,tempMax);
					tempIdx = _this['array' + _this.idxArr[ulIdx]].length - 3;
					_this.resultArr[ulIdx] = _this['array' + _this.idxArr[ulIdx]][tempIdx];
					_this.recent_time[_this.idxArr[ulIdx]] = _this.resultArr[ulIdx];
				});
			}else {
				_this.resultArr[ulIdx] = _this['array' + _this.idxArr[ulIdx]][resIdx];
				this.recent_time[_this.idxArr[ulIdx]] = _this.resultArr[ulIdx];
				loop(ulIdx + 1,_this.ulCount,function(k){
					_this.initRangeArr(_this.recent_time[1],k,_this.idxArr[k],-1,-1);
				});
			}
			console.log('应得到的结果' + _this.resultArr);
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
				this.move.speed[0] = .2;
			}else {
				this.initPosition(this.distance[idx],max,idx);
				this.move.speed[0] = this.move.speed[0] > 0.2 ? .2 : this.move.speed[0];
			}
			return this;
		},
		touch : function(event,that,$selector,array,idx) {
			event = event || window.event;
			event.preventDefault();
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
					var tempRes = that.distance[idx]/40 + 2;
					that.end.index = that.distance[idx] / that.liHeight + 2;
					
					that.checkRange(idx,tempRes,that.distance[idx],that.maxHeight[idx]);
					
					$selector.style.transform = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
					$selector.style.webkitTransform = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
					$selector.style.transition = 'transform ' + that.move.speed[0] + 's ease-out';
					$selector.style.webkitTransition = '-webkit-transform ' + that.move.speed[0] + 's ease-out';
					break;
				case "touchmove":
					event.preventDefault();
					that.move.Y = event.touches[0].clientY;
					var offset = that.start.Y - that.move.Y;
					if (that.distance[idx] == 0 && offset < 0) {
						$selector.style.transform = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
						$selector.style.webkitTransform = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
						$selector.style.transition = 'transform 0.3s ease-out';
						$selector.style.webkitTransition = '-webkit-transform 0.3s ease-out';
					} else {
						$selector.style.transform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
						$selector.style.webkitTransform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
					}
					if (this.distance[idx] <= -that.maxHeight[idx]) {
						$selector.style.transform = 'translate3d(0, -' + (max + that.liHeight) + 'px, 0)';
						$selector.style.webkitTransform = 'translate3d(0, -' + (max + that.liHeight) + 'px, 0)';
						$selector.style.transition = 'transform 0.3s ease-out';
						$selector.style.webkitTransition = '-webkit-transform 0.3s ease-out';
					}
					if (Math.abs(offset).toFixed(0) % 5 === 0) {
						var time = Date.now();
						that.move.speed.push((Math.abs(offset) / (time - that.start.time)).toFixed(2));
					}
					break;
			}
		}
	};
	win.MultiPicker = MultiPicker;
})(window,document);
  