/**
 * Created by appian on 2018/3/19.
 */
(function(){
  window.onload = function(){

    //canvas
    var canvas = document.getElementById('lineChart'); //
    var ctx  = canvas.getContext('2d');

    var dict = [], len = 480;// 模拟480个数据
    var tempY, xArr = [], yArr = [];

    // 模拟志鑫传入的均匀的数据
    for(var r = 0; r < len; r++) {
      tempY = parseInt(Math.random() * 100 + 900)
      xArr.push(canvas.width/len * r);
      yArr.push(tempY);
    }
    console.log(xArr);
    console.log(yArr);

    // 得到纵坐标的两个极值
    var minY = Math.min.apply(Math, yArr);
    var maxY = Math.max.apply(Math, yArr);

    // 转换xy轴
    for(var k = 0; k < len; k++) {
      dict.push({
        x: xArr[k],
        y: maxY - yArr[k] // min - ( y - min ) + (max - min) - min
      })
    }

    // 将值域区间成比例放大
    var time = (maxY - minY)/canvas.height * 1.5;

    // 画横线
    ctx.strokeStyle = 'green';
    ctx.setLineDash([5, 2]);
    ctx.lineWidth = .4;

    // 第一条线
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(xArr[len - 1], 0);
    ctx.stroke();

    // 第二条线
    ctx.beginPath();
    ctx.moveTo(0, ((maxY - minY) * .3333)/time);
    ctx.lineTo(xArr[len - 1], ((maxY - minY) * .3333)/time);
    ctx.stroke();

    // 第三条线
    ctx.beginPath();
    ctx.moveTo(0, ((maxY - minY) * .6666)/time);
    ctx.lineTo(xArr[len - 1], ((maxY - minY) * .6666)/time);
    ctx.stroke();

    // 第四条线
    ctx.beginPath();
    ctx.moveTo(0, (maxY - minY)/time);
    ctx.lineTo(xArr[len - 1], (maxY - minY)/time);
    ctx.stroke();

    // 画原点
    ctx.moveTo(dict[0].x, dict[0].y/ time);

    //画折线
    ctx.beginPath();
    for(var i = 1 ;i < len; i++){
      ctx.setLineDash([10 , 0]);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'red';
      ctx.lineTo(dict[i].x, dict[i].y/time);
    }
    ctx.stroke();

    //画横坐标的点
    for(var i = 0; i < dict.length; i++){
      var x = xArr[i];
      if (i % 120 != 0) continue;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.fillText(dict[i].x, x, canvas.height - 30, 60);//画文字
    }
  }
})();