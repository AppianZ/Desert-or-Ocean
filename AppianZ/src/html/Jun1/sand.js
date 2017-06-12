/**
 * Created by appian on 2017/6/7.
 */
var end = 1500; // 倒计时的秒数
// canvas开始
var distance = 0;
var distanceIncrease = 0.02; // 平移增量
var ctxWidth = 500;
var ctxHeight = 500;
var handlerTop = null;
var handlerBottom = null;
var totalTime = 1800 * 1000; // 倒计时剩余的时间(毫秒)
var remainTime = end * 1000; // 倒计时剩余的时间(毫秒)
var time = remainTime / totalTime; // 倒计时剩余的时间(毫秒)的百分比
var mistake = .15;

function waveOne(ctx, progress) {
	for (var i = 0; i < ctxWidth; ++i) {
		var point = {
			x: i,
			y: 50 * Math.sin(0.01 * i + Math.PI - distance) + ctxHeight * (1 - progress)
		};
		draw(ctx, 'rgba(228,84,94,.3)', point.x, point.y);
	}
}

function waveTwo(ctx, progress) {
	for (var i = 0; i < ctxWidth; ++i) {
		var point = {
			x: i,
			y: 40 * Math.sin(0.01 * i + distance) + ctxHeight * (1 - progress)
		};
		draw(ctx, 'rgba(228,84,94,.4)', point.x, point.y);
	}
}

function waveThree(ctx, progress) {
	for (var i = 0; i < ctxWidth; ++i) {
		var point = {
			x: i,
			y: 30 * Math.sin(0.01 * i + .5 * Math.PI + distance) + ctxHeight * (1 - progress)
		};
		draw(ctx, 'rgba(228,84,94,.5)', point.x, point.y);
	}
}

function draw(ctx, color, x, y) {
	ctx.lineWidth = 1;
	ctx.strokeStyle = color;
	ctx.beginPath(); //重置当前的路径。
	ctx.moveTo(x, ctxHeight); //先保存一个坐标
	ctx.lineTo(x, y); //从moveTo提供的坐标绘制到x,y 的一条直线
	ctx.closePath();
	ctx.stroke(); //通过此函数将以上绘制的图形绘制到画布上
}

function drawTop(ctx, progress) {
	return function () {
		distance += distanceIncrease;
		remainTime -= 1000 / 60;
		time = remainTime / totalTime;
		ctx.clearRect(0, 0, ctxWidth, ctxHeight); // 清空给定矩形内的指定像素
		waveOne(ctx, progress);
		waveTwo(ctx, progress);
		waveThree(ctx, progress);
		cancelAnimationFrame(handlerTop);
		handlerTop = requestAnimationFrame(drawTop(ctx, time - mistake));
	}
}

function drawBottom(ctx, progress) {
	return function () {
		distance += distanceIncrease;
		ctx.clearRect(0, 0, ctxWidth, ctxHeight);
		waveOne(ctx, progress);
		waveTwo(ctx, progress);
		waveThree(ctx, progress);
		cancelAnimationFrame(handlerBottom);
		if(end === 5) document.getElementById('sandBottom').setAttribute('class', 'end');
		handlerBottom = requestAnimationFrame(drawBottom(ctx, 1 - time - mistake));
	}
}

var cvstop = document.getElementById('cvstop');
var cvsbottom = document.getElementById('cvsbottom');
 
if (cvstop.getContext) {
	var ctx = cvstop.getContext('2d');
	handlerTop = requestAnimationFrame(drawTop(ctx, time - mistake));
}
if (cvsbottom.getContext) {
	var ctx = cvsbottom.getContext('2d');
	handlerBottom = requestAnimationFrame(drawBottom(ctx, 1 - time - mistake));
}
// canvas结束
