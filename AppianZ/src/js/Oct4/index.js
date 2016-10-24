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
		this.ulIdx = 0; //ul下标计数器,前一次的计数器
		this.ulDomArr = [];//ul的dom元素,【a】
		this.idxArr = [];//更新后的ul的下标 【a】
		this.jsonArr = [];//用来存储每个ul的li中显示的arr【a】
		this.liHeight = 40;
		this.maxHeight = [];//每个ul的最大高度【a】
		this.distance = [];//transition的移动位置【a】
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
		this.initReady(this.jsonData[0]);
		this.initBinding();
	}
	
	MultiPicker.prototype = {
		constructor : MultiPicker,
		generateArrData: function(targetArr){
			var tempArr = [];
			loop(0, targetArr.length, function(i){
				tempArr.push({
					"id": targetArr[i].id,
					"value": targetArr[i].value
				})
			});
			return tempArr;
		},
		checkArrDeep: function(parent){//需要改变
			if ('child' in parent) {
				//初始化jsonArr。每一个ul对应的数组并迭代
				this.jsonArr.push(this.generateArrData(parent.child));
				this.checkArrDeep(parent.child[0]);
			}
			this.idxArr.push(this.ulIdx++);
			//初始化resultArr数组的
			this.resultArr.unshift({
				"id": parent.id,
				"value": parent.value,
			});
		},
		insertLiArr: function(targetUl, arr){
			var html = '';
			var nullObj = {
				id: '-99',
				value: '',
			};
			arr.unshift(nullObj,nullObj);
			arr.push(nullObj,nullObj);
			loop(0, arr.length, function(i){
				html += `<li data-id="${arr[i].id}">${arr[i].value}</li>>`
			});
			targetUl.innerHTML = html;
		},
		initDomFuc : function(){
			var _this = this;
			var html = '';
			html += `<div class="multi-picker-bg" id="multi-picker-bg-${_this.container}">
				<div  class="multi-picker-container" id="multi-picker-container-${_this.container}">
				<div class="multi-picker-btn-box">
				<div class="multi-picker-btn" id="multi-picker-btn-cancel">返回</div>
				<div class="multi-picker-btn" id="multi-picker-btn-save-${_this.container}">提交</div>
				</div>
				<div class="multi-picker-content">
				<div class="multi-picker-up-shadow"></div>
				<div class="multi-picker-down-shadow"></div>
				<div class="multi-picker-line"></div>
				</div></div></div>`;
			$id(_this.container).innerHTML = html;
			_this.jsonArr.push(_this.generateArrData(_this.jsonData));
		},
		initReady : function (target) {
			var _this = this;
			this.ulIdx = 0;
			this.idxArr.length = 0;
			_this.checkArrDeep(target);//查看某对象的深度
			console.log(_this.jsonArr);
			
			var parentNode = $id(`multi-picker-container-${_this.container}`).children[1];//取到class='multi-picker-content',可以在里面插入ul
			if (_this.ulCount <= _this.idxArr.length) {
				// 如果不足,则插入ul,从0开始计数
				loop(_this.ulCount, _this.idxArr.length, function (i) {
					var newPickerDiv = document.createElement('div');
					newPickerDiv.setAttribute('class', 'multi-picker');
					newPickerDiv.innerHTML = `<ul id="multi-picker-${_this.container}-${i}"></ul>`;
					parentNode.insertBefore(newPickerDiv,parentNode.children[parentNode.children.length - 3]);
					var tempDomUl = $id(`multi-picker-${_this.container}-${i}`);
					_this.ulDomArr.push(tempDomUl);
					_this.distance.push(0);
					//插入li
					_this.insertLiArr(tempDomUl, _this.jsonArr[i]);
					
					//绑定事件
					var tempArray = _this.jsonArr[i];
					tempDomUl.addEventListener('touchstart',function(){
						_this.touch(event, _this, tempDomUl, tempArray, i);
					}, false);
					tempDomUl.addEventListener('touchmove',function(){
						_this.touch(event, _this, tempDomUl, tempArray, i);
					}, false);
					tempDomUl.addEventListener('touchend',function(){
						_this.touch(event, _this, tempDomUl, tempArray, i);
					}, false);
				});
			} else { // 当上一次的ulCount 比当前ul的总数来的大的时候要清除子dom
				loop(_this.idxArr.length, _this.ulCount, function (i) {
					var oldPicker = $class('multi-picker')[i];
					oldPicker.parentNode.removeChild(oldPicker);
					_this.ulDomArr.pop();
					_this.jsonArr.pop();
					_this.distance.pop();
					_this.resultArr.pop();
				})
			}
			
			//重新设置宽度和ul的maxHeight
			_this.maxHeight.length = 0;
			loop(0, _this.idxArr.length, function(i){
				$class('multi-picker')[i].style.width = `${100/_this.idxArr.length}%`;
				_this.maxHeight.push($id(`multi-picker-${_this.container}-${i}`).offsetHeight);
			});
			_this.ulCount = _this.idxArr.length;
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
		checkRange : function(ulIdx,resIdx,distance,maxHei) {
			var _this = this;
		},
		initPosition: function(dis, max, idx){
			dis = dis < 0 ? 0 : dis;
			dis = dis > max ? max : dis;
			var sub =  dis % this.liHeight;
			if (sub < this.liHeight / 2) {
				this.distance[idx] = dis - sub ;
			} else {
				this.distance[idx] = dis + (this.liHeight - sub) ;
			}
			return this;
		},
		initSpeed : function (arr,dir,max,idx) {
			var variance = 0;//求方差
			var sum = 0;
			var rate = 0;
			for(var i in arr){
				sum += arr[i] - 0;
			}
			for(var j in arr){
				variance += (arr[j] - (sum / arr.length)) * (arr[j] - (sum / arr.length));
			}
			if((variance / arr.length).toFixed(2) > .1){ //如果方差的结果大于.1 用来控制速度变化幅度
				rate = max > this.liHeight * 15 ? dir * 2 : 0; //如果数组长度是大于15的才会有加速度出现
				this.initPosition(this.distance[idx] + rate, max - 200, idx);
				this.move.speed[0] = .2;
			}else {
				this.initPosition(this.distance[idx], max, idx);
				this.move.speed[0] = this.move.speed[0] > 0.2 ? .2 : this.move.speed[0];
			}
		},
		touch : function(event,that,$selector,array,idx) {
			event = event || window.event;
			event.preventDefault();
			switch (event.type) {
				case "touchstart":
					event.preventDefault();
					that.move.speed = [];
					that.start.Y = event.touches[0].clientY;
					that.start.time = Date.now();
					break;
				case "touchend":
					that.end.Y = Math.abs(event.changedTouches[0].clientY);
					var tempDis = that.distance[idx] + (that.start.Y - that.end.Y);
					that.distance[idx] = tempDis < 0 ? 0 : (tempDis < that.maxHeight[idx] - 200 ? tempDis : that.maxHeight[idx] - 200);
					that.initSpeed(that.move.speed, that.start.Y - that.end.Y, that.maxHeight[idx], idx);
					that.end.index = that.distance[idx] / that.liHeight + 2; //数组下标
					
					console.log('distanceArr:' + that.distance[idx]);
					
					console.log(idx, that.end.index, that.jsonData);
					//设置后续ul并设置result------------
					that.checkRange(idx);
					
					$selector.style.transform = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
					$selector.style.webkitTransform = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
					$selector.style.transition = 'transform ' + that.move.speed[0] + 's ease-out';
					$selector.style.webkitTransition = '-webkit-transform ' + that.move.speed[0] + 's ease-out';
					//设置结果数组
					that.resultArr[idx] = that.jsonArr[idx][that.end.index];
					console.log(that.resultArr);
					break;
				case "touchmove":
					event.preventDefault();
					that.move.Y = event.touches[0].clientY;
					var offset = that.start.Y - that.move.Y;
					if (that.distance[idx] == 0 && offset < 0) { //如果滑动move在顶部
						$selector.style.transform = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
						$selector.style.webkitTransform = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
						$selector.style.transition = 'transform 0.2s ease-out';
						$selector.style.webkitTransition = '-webkit-transform 0.2s ease-out';
					} else {
						$selector.style.transform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
						$selector.style.webkitTransform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
					}
					/*if (this.distance[idx] <= -that.maxHeight[idx]) {
						console.log(this.distance[idx], that.maxHeight[idx]);
						$selector.style.transform = 'translate3d(0, -' + (max + that.liHeight) + 'px, 0)';
						$selector.style.webkitTransform = 'translate3d(0, -' + (max + that.liHeight) + 'px, 0)';
						$selector.style.transition = 'transform 0.3s ease-out';
						$selector.style.webkitTransition = '-webkit-transform 0.3s ease-out';
					}*/
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
  