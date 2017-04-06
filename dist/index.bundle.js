/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mobDateSelector = __webpack_require__(1);

	var _mobDateSelector2 = _interopRequireDefault(_mobDateSelector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	new _mobDateSelector2.default({
		input: 'date-selector-inputs', //点击触发插件的input框的id
		container: 'targetContainers', //插件插入的容器id
		type: 0,
		//0：不需要tab切换，自定义滑动内容，建议小于三个；
		//1：需要tab切换，【年月日】【时分】完全展示，固定死，可设置开始年份和结束年份
		param: [1, 1, 0, 1, 0],
		//设置['year','month','day','hour','minute'],1为需要，0为不需要,需要连续的1
		beginTime: [2001, 1, -31, 19], //如空数组默认设置成1970年1月1日0时0分开始，如需要设置开始时间点，数组的值对应param参数的对应值。
		endTime: [2020, 11, 25, 20], //如空数组默认设置成次年12月31日23时59分结束，如需要设置结束时间点，数组的值对应param参数的对应值。
		recentTime: [], //如不需要设置当前时间，被为空数组，如需要设置的开始的时间点，数组的值对应param参数的对应值。
		success: function success(arr) {
			alert(arr);
			console.log(arr);
		} //回调
	}); /**
	     * Created by appian on 2016/11/30.
	     */

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by appian on 16/8/5.
	 */
	__webpack_require__(2);
	(function (wid, dcm) {
		var win = wid;
		var doc = dcm;
		
		function $id(id) {
			return doc.getElementById(id);
		}
		
		function $class(name) {
			return doc.getElementsByClassName(name);
		}
		
		function loop(begin, length, fuc) {
			for ( var i = begin; i < length; i++ ) {
				if (fuc(i)) break;
			}
		}
		
		function on(action, selector, callback) {
			doc.addEventListener(action, function (e) {
				if (selector == e.target.tagName.toLowerCase() || selector == e.target.className || selector == e.target.id) {
					callback(e);
				}
			})
		}
		
		function DateSelector(config) {
			this.input      = config.input;
			this.container  = config.container;
			this.type       = config.type;
			this.param      = (config.type == 1) ? [1, 1, 1, 1, 1] : config.param;
			this.beginTime  = config.beginTime;
			this.endTime    = config.endTime;
			this.recentTime = config.recentTime;
			this.success    = config.success;
			
			this.ulCount     = 0;
			this.ulDomArr    = [];
			this.idxArr      = [];
			this.liHeight    = 40;
			this.maxHeight   = [];
			this.distance    = [];
			this.start       = {
				Y: 0,
				time: ''
			};
			this.move        = {
				Y: 0,
				speed: []
			};
			this.end         = {
				Y: 0,
				index: 0
			};
			this.resultArr   = [];
			this.begin_time  = [1970, 1, 1, 0, 0];
			this.end_time    = [new Date().getFullYear() + 1, 12, 31, 23, 59];
			this.recent_time = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate(), new Date().getHours(), new Date().getMinutes()];
			
			this.initDomFuc();
			this.initReady();
			this.initBinding();
		}
		
		DateSelector.prototype = {
			constructor: DateSelector,
			checkParam: function () {
				var idxArr = [];
				var _this  = this;
				loop(0, _this.param.length, function (i) {
					if (_this.param[i] > 0) {
						idxArr.push(i);
					}
				});
				this.ulCount = idxArr[idxArr.length - 1] - idxArr[0] + 1;
				loop(idxArr[0], idxArr[idxArr.length - 1] + 1, function (i) {
					_this.param[i] = 1;
					_this.idxArr.push(i);
				});
			},
			checkTime: function () {
				var _this       = this;
				var begin_time  = this.begin_time;
				var end_time    = this.end_time;
				var recent_time = this.recent_time;
				if (_this.beginTime.length == 0) {
					loop(0, _this.idxArr.length, function (i) {
						_this.beginTime.push(begin_time[_this.idxArr[i]]);
					});
				}
				if (_this.endTime.length == 0) {
					loop(0, _this.idxArr.length, function (i) {
						_this.endTime.push(end_time[_this.idxArr[i]]);
					});
				}
				if (_this.recentTime.length == 0) {
					loop(0, _this.idxArr.length, function (i) {
						_this.recentTime.push(recent_time[_this.idxArr[i]]);
					});
				}
				if (_this.idxArr.length == _this.beginTime.length && _this.beginTime.length == _this.endTime.length && _this.endTime.length == _this.recentTime.length) {
					loop(0, _this.param.length, function (i) {
						if (_this.param[i] == 0) {
							switch (i) {
								case 0:
									begin_time[i] = new Date().getFullYear();
									end_time[i]   = new Date().getFullYear();
									break;
								case 1:
									begin_time[i] = new Date().getMonth() + 1;
									end_time[i]   = new Date().getMonth() + 1;
									break;
								case 2:
									begin_time[i] = new Date().getDate();
									end_time[i]   = new Date().getDate();
									break;
								case 3:
									begin_time[i] = new Date().getHours();
									end_time[i]   = new Date().getHours();
									break;
								case 4:
									begin_time[i] = new Date().getMinutes();
									end_time[i]   = new Date().getMinutes();
									break;
							}
						} else {
							loop(0, _this.idxArr.length, function (j) {
								switch (_this.idxArr[j]) {
									case 0:
										_this.beginTime[j] = begin_time[_this.idxArr[j]] = _this.beginTime[j] >= 1900 ? _this.beginTime[j] : new Date().getFullYear();
										_this.endTime[j] = end_time[_this.idxArr[j]] = _this.endTime[j] >= 1900 ? _this.endTime[j] : new Date().getFullYear() + 1;
										recent_time[_this.idxArr[j]] = _this.recentTime[j];
										break;
									case 1:
										_this.beginTime[j] = begin_time[_this.idxArr[j]] = (_this.beginTime[j] > 0 && _this.beginTime[j] <= 12) ? _this.beginTime[j] : 1;
										_this.endTime[j] = end_time[_this.idxArr[j]] = (_this.endTime[j] > 0 && _this.endTime[j] <= 12) ? _this.endTime[j] : 12;
										recent_time[_this.idxArr[j]] = _this.recentTime[j];
										break;
									case 2:
										_this.beginTime[j] = begin_time[_this.idxArr[j]] = (_this.beginTime[j] > 0 && _this.beginTime[j] <= new Date(begin_time[0], begin_time[1], 0).getDate()) ? _this.beginTime[j] : 1;
										_this.endTime[j] = end_time[_this.idxArr[j]] = (_this.endTime[j] > 0 && _this.endTime[j] <= new Date(end_time[0], end_time[1], 0).getDate()) ? _this.endTime[j] : new Date(end_time[0], end_time[1], 0).getDate();
										recent_time[_this.idxArr[j]] = _this.recentTime[j];
										break;
									case 3:
										_this.beginTime[j] = begin_time[_this.idxArr[j]] = (_this.beginTime[j] >= 0 && _this.beginTime[j] <= 23) ? _this.beginTime[j] : 0;
										_this.endTime[j] = end_time[_this.idxArr[j]] = (_this.endTime[j] >= 0 && _this.endTime[j] <= 23) ? _this.endTime[j] : 23;
										recent_time[_this.idxArr[j]] = _this.recentTime[j];
										break;
									case 4 :
										_this.beginTime[j] = begin_time[_this.idxArr[j]] = (_this.beginTime[j] >= 0 && _this.beginTime[j] <= 59) ? _this.beginTime[j] : 0;
										_this.endTime[j] = end_time[_this.idxArr[j]] = (_this.endTime[j] >= 0 && _this.endTime[j] <= 59) ? _this.endTime[j] : 59;
										recent_time[_this.idxArr[j]] = _this.recentTime[j];
										break;
								}
							});
						}
					});
					var bt = new Date(begin_time[0], begin_time[1], begin_time[2], begin_time[3], begin_time[4]).getTime();
					var et = new Date(end_time[0], end_time[1], end_time[2], end_time[3], end_time[4]).getTime();
					var rt = new Date(recent_time[0], recent_time[1], recent_time[2], recent_time[3], recent_time[4]).getTime();
					rt < bt ? alert('当前时间小于开始时间') : "";
					rt > et ? alert('当前时间超过结束时间') : "";
					return (bt <= rt && rt < et);
				} else {
					alert('error,please open the console to see the errmsg');
					console.warn('type为1时,时间数组长度为0或5');
					console.warn('构造函数的参数param或recentTime设置有误');
					console.warn('param必须是连续的1，recentTime的值必须与param中的值对应');
					console.warn('构造函数调用失败，请重新设置参数');
					return false;
				}
			},
			checkTimeArr: function (arr1, arr2, length) {
				var checkStatus = true;
				loop(0, length, function (i) {
					if (arr1[i] != arr2[i]) checkStatus = false;
				});
				return checkStatus;
			},
			initDomFuc: function () {
				var _this = this;
				this.checkParam();
				if (!this.checkTime())return;
				var html = '';
				html += '<div class="date-selector-bg" id="date-selector-bg-' + _this.container + '">' +
					'<div  class="date-selector-container" id="date-selector-container-' + _this.container + '">' +
					'<div class="date-selector-btn-box">' +
					'<div class="date-selector-btn" id="date-selector-btn-cancel">返回</div>';
				
				if (this.type == 1) {
					html += '<div class="date-selector-tab-box">' +
						'<div class="date-selector-tab date-selector-tab-active">年月日</div>' +
						'<div class="date-selector-tab">时分</div>' +
						'</div>';
				}
				
				html += '<div class="date-selector-btn" id="date-selector-btn-save-' + _this.container + '">提交</div>' +
					'</div>' +
					'<div class="date-selector-content">';
				
				if (_this.type == 0) {
					loop(0, _this.idxArr.length, function (i) {
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
					loop(0, _this.ulCount, function (i) {
						$id('date-selector-container-' + _this.container).querySelectorAll(".date-selector")[i].style.width = (100 / _this.ulCount).toFixed(2) + '%';
					});
				} else if (_this.type == 1) {
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
			initReady: function () {
				var _this   = this;
				var realIdx = 0;
				loop(0, _this.ulCount, function (i) {
					realIdx       = _this.idxArr[i];
					var min       = 0;
					var max       = 0;
					var tempDomUl = $id('date-selector-' + _this.container + '-' + _this.idxArr[i]);
					_this.ulDomArr.push(tempDomUl);
					var tempArray = _this['array' + _this.idxArr[i]] = [];
					switch (realIdx) {
						case 0:
							_this.initCommonArr(tempDomUl, tempArray, _this.beginTime[i], _this.endTime[i], '年', i);
							break;
						case 1:
							min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 1)) ? _this.beginTime[i] : 1;
							max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 1)) ? _this.endTime[i] : 12;
							_this.initCommonArr(tempDomUl, tempArray, min, max, '月', i);
							break;
						case 2:
							min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 2)) ? _this.beginTime[i] : 1;
							max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 2)) ? _this.endTime[i] : new Date(_this.recent_time[0], _this.recent_time[1], 0).getDate();
							_this.initCommonArr(tempDomUl, tempArray, min, max, '日', i);
							break;
						case 3:
							min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 3)) ? _this.beginTime[i] : 0;
							max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 3)) ? _this.endTime[i] : 23;
							_this.initCommonArr(tempDomUl, tempArray, min, max, '时', i);
							break;
						case 4 :
							min = (_this.checkTimeArr(_this.begin_time, _this.recent_time, 4)) ? _this.beginTime[i] : 0;
							max = (_this.checkTimeArr(_this.end_time, _this.recent_time, 4)) ? _this.endTime[i] : 59;
							_this.initCommonArr(tempDomUl, tempArray, min, max, '分', i);
							break;
					}
					tempDomUl.addEventListener('touchstart', function () {
						_this.touch(event, _this, tempDomUl, _this['array' + _this.idxArr[i]], i);
					}, false);
					tempDomUl.addEventListener('touchmove', function () {
						_this.touch(event, _this, tempDomUl, _this['array' + _this.idxArr[i]], i);
					}, false);
					tempDomUl.addEventListener('touchend', function () {
						_this.touch(event, _this, tempDomUl, _this['array' + _this.idxArr[i]], i);
					}, false);
				});
			},
			initBinding: function () {
				var _this     = this;
				var bg        = $id('date-selector-bg-' + _this.container);
				var container = $id('date-selector-container-' + _this.container);
				var body      = doc.body;
				on('touchstart', _this.input, function () {
					bg.classList.add('date-selector-bg-up');
					container.classList.add('date-selector-container-up');
					body.classList.add('date-selector-locked');
				}, false);
				
				on('touchstart', 'date-selector-btn-save-' + _this.container, function () {
					_this.success(_this.resultArr);
					bg.classList.remove('date-selector-bg-up');
					container.classList.remove('date-selector-container-up');
					body.classList.remove('date-selector-locked');
				}, false);
				
				on('touchstart', 'date-selector-bg-' + _this.container, function () {
					bg.classList.remove('date-selector-bg-up');
					container.classList.remove('date-selector-container-up');
					body.classList.remove('date-selector-locked');
				}, false);
				
				on('touchstart', 'date-selector-btn-cancel', function () {
					bg.classList.remove('date-selector-bg-up');
					container.classList.remove('date-selector-container-up');
					body.classList.remove('date-selector-locked');
				}, false);
				
				on('touchstart', 'date-selector-tab', function (event) {
					var tab     = $class('date-selector-tab');
					var content = $class('date-selector-content');
					loop(0, tab.length, function (i) {
						tab[i].classList.remove('date-selector-tab-active');
					});
					event.target.classList.add('date-selector-tab-active');
					if (event.target.innerHTML == '年月日') {
						content[0].classList.remove('date-selector-content-left');
						content[1].classList.add('date-selector-content-right');
					} else {
						content[0].classList.add('date-selector-content-left');
						content[1].classList.remove('date-selector-content-right');
					}
				}, false);
			},
			initCommonArr: function (tempDomUl, tempArr, min, max, str, idx) {
				var _this = this;
				var Html  = '';
				loop(min, max + 1, function (i) {
					tempArr.push(i);
				});
				_this.maxHeight.push(_this.liHeight * (max - min));
				var res = _this.recentTime[idx];
				_this.resultArr.push(res);
				tempArr.unshift('', '');
				tempArr.push('', '');
				tempDomUl.style.transform       = 'translate3d(0,-' + this.liHeight * (tempArr.indexOf(res) - 2) + 'px, 0)';
				tempDomUl.style.webkitTransform = 'translate3d(0,-' + this.liHeight * (tempArr.indexOf(res) - 2) + 'px, 0)';
				_this.distance.push(this.liHeight * (tempArr.indexOf(res) - 2));
				loop(0, tempArr.length, function (j) {
					Html += '<li>' + tempArr[j] + (tempArr[j] === '' ? '' : str) + '</li>';
				});
				tempDomUl.innerHTML = Html;
			},
			initRangeArr: function (min, max, str, checkIdx, dir) {
				var _this      = this;
				var realIdx    = _this.idxArr[checkIdx];
				var arr        = [];
				var $selector  = $id('date-selector-' + _this.container + '-' + realIdx);
				var targetLong = 0;
				loop(min, max + 1, function (k) {
					arr.push(k);
				});
				var Html = '';
				arr.unshift('', '');
				arr.push('', '');
				for ( var i = 0; i < arr.length; i++ ) {
					Html += '<li>' + arr[i] + (arr[i] === '' ? '' : str) + '</li>';
				}
				_this['array' + realIdx] = [];
				_this['array' + realIdx] = arr;
				$selector.innerHTML      = Html;
				
				if (dir == 0) {
					targetLong                               = min > this.resultArr[checkIdx] ? 0 : -arr.indexOf(this.resultArr[checkIdx]) * this.liHeight + this.liHeight * 2;
					this.resultArr[checkIdx]                 = this.resultArr[checkIdx] < min ? min : this.resultArr[checkIdx];
					this.recent_time[_this.idxArr[checkIdx]] = _this.resultArr[checkIdx];
				} else if (dir == 1) {
					targetLong                               = max > this.resultArr[checkIdx] ?
					-arr.indexOf(this.resultArr[checkIdx]) * this.liHeight + this.liHeight * 2 :
					-arr.indexOf(max) * this.liHeight + this.liHeight * 2;
					this.resultArr[checkIdx]                 = this.resultArr[checkIdx] > max ? max : this.resultArr[checkIdx];
					this.recent_time[_this.idxArr[checkIdx]] = _this.resultArr[checkIdx];
				} else {
					if (arr.indexOf(this.resultArr[checkIdx]) == -1) {
						targetLong = (this.maxHeight[checkIdx] > this.liHeight * (max - min)) ? -this.liHeight * (max - min) : -this.distance[checkIdx];
					} else {
						targetLong = -arr.indexOf(this.resultArr[checkIdx]) * this.liHeight + 2 * this.liHeight;
					}
					this.recent_time[realIdx] = -targetLong / this.liHeight + 1;
					this.resultArr[checkIdx]  = arr[-targetLong / this.liHeight + 2];
				}
				
				$selector.style.transform        = 'translate3d(0,' + targetLong + 'px, 0)';
				$selector.style.webkitTransform  = 'translate3d(0,' + targetLong + 'px, 0)';
				$selector.style.transition       = 'transform 0.15s ease-out';
				$selector.style.webkitTransition = '-webkit-transform 0.15s ease-out';
				this.maxHeight[checkIdx]         = this.liHeight * (max - min);
				this.distance[checkIdx]          = Math.abs(targetLong);
			},
			checkRange: function (checkIdx) {
				var _this = this;
				if (checkIdx >= _this.ulCount - 1) return;
				var min     = 0;
				var max     = 0;
				var str     = '';
				var dir     = 0; //0在顶部,1在底部,-1在中间
				var realIdx = _this.idxArr[checkIdx];
				switch (realIdx) {
					case 0:
						min = 1;
						max = 12;
						str = '月';
						break;
					case 1:
						min = 1;
						max = new Date(_this.recent_time[0], _this.recent_time[1], 0).getDate();
						str = '日';
						break;
					case 2:
						min = 0;
						max = 23;
						str = '时';
						break;
					case 3:
						min = 0;
						max = 59;
						str = '分';
						break;
				}
				
				loop(0, checkIdx + 1, function (p) {
					if (_this.beginTime[p] != _this.resultArr[p]) {
						dir = 1;
						loop(0, checkIdx + 1, function (q) {
							if (_this.endTime[q] != _this.resultArr[q]) dir = -1;
						});
					}
				});
				
				if (dir == 0) {
					min = _this.beginTime[checkIdx + 1] >= min ? _this.beginTime[checkIdx + 1] : 0;
				} else if (dir == 1) {
					max = _this.endTime[checkIdx + 1] <= max ? _this.endTime[checkIdx + 1] : 0;
				}
				_this.initRangeArr(min, max, str, checkIdx + 1, dir);
				_this.checkRange(checkIdx + 1);
			},
			initPosition: function (dis, max, idx) {
				dis     = dis < 0 ? 0 : dis;
				dis     = dis > max ? max : dis;
				var sub = dis % this.liHeight;
				if (sub < this.liHeight / 2) {
					this.distance[idx] = dis - sub;
				} else {
					this.distance[idx] = dis + (this.liHeight - sub);
				}
				return this;
			},
			initSpeed: function (arr, dir, max, idx) {
				var variance = 0;
				var sum      = 0;
				for ( var i in arr ) {
					sum += arr[i] - 0;
				}
				for ( var j in arr ) {
					variance += (arr[j] - (sum / arr.length)) * (arr[j] - (sum / arr.length));
				}
				var rate = 0;
				if ((variance / arr.length).toFixed(2) > .1) {
					rate = max > this.liHeight * 15 ? dir * 2 : 0;
					this.initPosition(this.distance[idx] + rate, max, idx);
					this.move.speed[0] = .2;
				} else {
					this.initPosition(this.distance[idx], max, idx);
					this.move.speed[0] = this.move.speed[0] > 0.2 ? .2 : this.move.speed[0];
				}
				return this;
			},
			touch: function (event, that, $selector, array, idx) {
				event = event || window.event;
				event.preventDefault();
				switch (event.type) {
					case "touchstart":
						that.move.speed = [];
						that.start.Y    = event.touches[0].clientY;
						that.start.time = Date.now();
						break;
					case "touchend":
						that.end.Y         = event.changedTouches[0].clientY;
						var tempDis        = that.distance[idx] + (that.start.Y - that.end.Y);
						that.distance[idx] = tempDis < 0 ? 0 : (tempDis < that.maxHeight[idx] ? tempDis : that.maxHeight[idx]);
						that.initSpeed(that.move.speed, that.start.Y - that.end.Y, that.maxHeight[idx], idx);
						var tempRes = that.end.index = that.distance[idx] / that.liHeight + 2;
						
						$selector.style.transform        = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
						$selector.style.webkitTransform  = 'translate3d(0,-' + that.distance[idx] + 'px, 0)';
						$selector.style.transition       = 'transform ' + that.move.speed[0] + 's ease-out';
						$selector.style.webkitTransition = '-webkit-transform ' + that.move.speed[0] + 's ease-out';
						
						that.recent_time[that.idxArr[idx]] = that.resultArr[idx] = that['array' + that.idxArr[idx]][tempRes];
						that.checkRange(0);
						
						break;
					case "touchmove":
						event.preventDefault();
						that.move.Y = event.touches[0].clientY;
						var offset  = that.start.Y - that.move.Y;
						if (that.distance[idx] == 0 && offset < 0) {
							$selector.style.transform        = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
							$selector.style.webkitTransform  = 'translate3d(0,' + 1.5 * that.liHeight + 'px, 0)';
							$selector.style.transition       = 'transform 0.3s ease-out';
							$selector.style.webkitTransition = '-webkit-transform 0.3s ease-out';
						} else {
							$selector.style.transform       = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
							$selector.style.webkitTransform = 'translate3d(0,-' + (offset + that.distance[idx]) + 'px, 0)';
						}
						if (this.distance[idx] <= -that.maxHeight[idx]) {
							$selector.style.transform        = 'translate3d(0, -' + that.liHeight + 'px, 0)';
							$selector.style.webkitTransform  = 'translate3d(0, -' + that.liHeight + 'px, 0)';
							$selector.style.transition       = 'transform 0.3s ease-out';
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
		if (true) {
			module.exports = DateSelector;
		} else if (typeof define == "function" && define.amd) {
			define([], function () {
				return DateSelector;
			})
		} else {
			win.DateSelector = DateSelector;
		}
	})(window, document);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "* {\n    padding: 0;\n    margin: 0;\n}\n\n.date-selector-locked {\n    height: 100% !important;\n    overflow: hidden !important;\n}\n\n.date-selector-bg {\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgba(75, 75, 75, 0);\n    height: 100%;\n    width: 100%;\n    overflow: hidden;\n    transition: all .3s ease;\n    -webkit-transition: all .3s ease;\n    z-index: -1;\n}\n\n.date-selector-bg-up {\n    z-index: 999 !important;\n    background: rgba(75, 75, 75, 0.65) !important;\n}\n\n.date-selector-container {\n    width: 100%;\n    height: 250px;\n    position: absolute;\n    bottom: 0;\n    transform: translate3d(0, 250px, 0);\n    -webkit-transform: translate3d(0, 250px, 0);\n    left: 0;\n    background-color: #FFF;\n    transition: transform .3s ease;\n    -webkit-transition: -webkit-transform .3s ease;\n    z-index: -1;\n}\n\n.date-selector-container-up {\n    transform: translate3d(0, 0, 0) !important;\n    -webkit-transform: translate3d(0, 0, 0) !important;\n}\n\n.date-selector-btn-box {\n    display: block;\n    position: absolute;\n    text-align: center;\n    width: 100%;\n    height: 50px;\n    line-height: 50px;\n    background: rgba(218, 218, 218, .7);\n    z-index: 10;\n}\n\n.date-selector-btn-box .date-selector-btn {\n    position: absolute;\n    display: inline-block;\n    margin: 0 20px;\n    color: #fff;\n    right: 0;\n}\n\n.date-selector-btn-box .date-selector-btn:nth-child(1) {\n    left: 0;\n    right: initial;\n}\n\n.date-selector-tab-box {\n    display: inline-block;\n    border-radius: 10px;\n    margin: 9px 0;\n    height: 32px;\n    box-sizing: border-box;\n    line-height: 30px;\n    color: rgba(218, 218, 218, .7);\n    background: #fff;\n    border: 1px solid #fff;\n}\n\n.date-selector-tab-box .date-selector-tab {\n    display: inline-block;\n    padding: 0 10px;\n    transition: all .3s ease;\n}\n\n.date-selector-tab-box .date-selector-tab:first-child {\n    border-right: 1px solid #fff;\n}\n\n.date-selector-tab-box .date-selector-tab-active {\n    color: #fff;\n    border-radius: 10px;\n    background: rgba(219, 219, 219, 1);\n}\n\n.date-selector-content-left {\n    transform: translate3d(-100%, 0, 0) !important;\n    -webkit-transform: translate3d(-100%, 0, 0) !important;\n}\n\n.date-selector-content-right {\n    transform: translate3d(100%, 0, 0) !important;\n    -webkit-transform: translate3d(100%, 0, 0) !important;\n}\n\n.date-selector-content {\n    position: absolute;\n    width: 100%;\n    background: #fff;\n    font-size: 0;\n    top: 50px;\n    z-index: 10;\n    transform: translate3d(0, 0, 0);\n    -webkit-transform: translate3d(0, 0, 0);\n    transition: transform .3s ease;\n    -webkit-transition: -webkit-transform .3s ease;\n}\n\n.date-selector-content .date-selector {\n    display: inline-block;\n    height: 200px;\n    overflow: hidden;\n    position: relative;\n    z-index: -1;\n}\n\n.date-selector-content .date-selector-left {\n    width: 33.33%;\n}\n\n.date-selector-content .date-selector-right {\n    width: 50%;\n}\n\n.date-selector-content ul::-webkit-scrollbar {\n    display: none;\n}\n\n.date-selector-content li {\n    height: 40px;\n    text-align: center;\n    font-size: 16px;\n    line-height: 40px;\n    list-style: none;\n}\n\n.date-selector-content .date-selector-up-shadow, .date-selector-content .date-selector-down-shadow {\n    width: 100%;\n    height: 80px;\n    position: absolute;\n    pointer-events: none;\n    background-image: linear-gradient(to bottom, #FFF, rgba(255, 255, 255, 0));\n    z-index: 50;\n}\n\n.date-selector-content .date-selector-up-shadow {\n    top: 0;\n}\n\n.date-selector-content .date-selector-down-shadow {\n    bottom: 0;\n    z-index: 50;\n    background-image: linear-gradient(to top, #FFF, rgba(255, 255, 255, 0));\n}\n\n.date-selector-content .date-selector-line {\n    width: 95%;\n    height: 40px;\n    position: absolute;\n    top: 80px;\n    left: 50%;\n    pointer-events: none;\n    box-sizing: border-box;\n    border-top: 1px solid #DCDCDC;\n    border-bottom: 1px solid #DCDCDC;\n    transform: translate3d(-50%, 0, 0);\n    -webkit-transform: translate3d(-50%, 0, 0);\n}\n\n/*# sourceMappingURL=dateController.css.map */\n", ""]);

	// exports


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);