/**
 * Created by appian on 2018/3/19.
 */
(function(){
  window.onload = function(){

    //canvas
    var canvas = document.getElementById('lineChart'); //
    var ctx  = canvas.getContext('2d');

    var dict = [], len = 40;// 模拟480个数据
    var tempY, xArr = [], yArr = [];

    // 模拟志鑫传入的均匀的数据
    for(var r = 0; r < len; r++) {
      tempY = parseInt(Math.random() * 100 + 500)
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

    // 画粉底
    ctx.beginPath();
    for(var i = 1 ;i < len; i++){
      ctx.lineWidth = .5;
      ctx.strokeStyle = 'transparent';
      ctx.lineTo(dict[i].x, dict[i].y/time);
    }
    ctx.lineTo(dict[len - 1].x, canvas.height - 25);
    ctx.lineTo(dict[1].x, canvas.height - 25);
    ctx.lineTo(dict[1].x, dict[1].y/time);
    ctx.stroke();

    var gradient = ctx.createLinearGradient(dict[len - 1].x, dict[len - 1].y/time, dict[len - 1].x, canvas.height - 30);
    gradient.addColorStop(0,"#FEF6F6");
    gradient.addColorStop(1,"#FFFBFB")
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 0;
    ctx.shadowColor= "rgba(0,0,0,0)";
    ctx.fill();

    //画折线
    ctx.beginPath();
    for(var i = 1 ;i < len; i++){
      ctx.setLineDash([10 , 0]);
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#E44D51';
      ctx.lineTo(dict[i].x, dict[i].y/time);
    }
    ctx.shadowOffsetY = 7;
    ctx.shadowBlur = 10;
    ctx.shadowColor="rgba(228, 77, 81, 0.5)";
    ctx.stroke();

    //画横坐标的点
    for(var i = 0; i < dict.length; i++){
      var x = xArr[i];
      if (i % (len/4) != 0) continue;
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.fillText(dict[i].x, x - 10, canvas.height - 10, 160);//画文字
      ctx.shadowColor="rgba(0,0,0,0)";
    }
  }
})();