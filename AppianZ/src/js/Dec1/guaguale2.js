/**
 * Created by appian on 2017/12/13.
 */

/**
 * 给原型链增加一个offset方法
 */
Element.prototype.offset = function () {
  return {
    top: this.offsetTop,
    left: this.offsetLeft,
  };
}

function Canvas2D($canvas) {
  var context = $canvas.getContext('2d'),
    width = $canvas.offsetWidth,
    height = $canvas.offsetHeight,
    pageOffset = $canvas.offset();

  /**
   * 绘制矩形的函数
   * 根据是否需要填充, 绘制全充满矩形 or 只绘制矩形边框。
   * @param start
   * @param end
   * @param isFill
   */
  this.drawRect = function (start, end, isFill) {
    var w = end.x - start.x, h = end.y - start.y;
    if (isFill) context.fillRect(start.x, start.y, w, h);
    else context.strokeRect(start.x, start.y, w, h);
  };

  /**
   * 得到canvas的宽度
   * @returns number
   */
  this.width = function () {
    return width;
  }

  /**
   * 得到canvas的高度
   * @returns number
   */
  this.height = function () {
    return height;
  }

  /**
   * 得到canvas相对于文档的偏移
   */
  this.resetOffset = function () {
    pageOffset = $canvas.offset();
  }

  /**
   * 当屏幕大小发生变化，重新计算offset
   */
  window.onresize = function () {
    pageOffset = $canvas.offset();
  };

  /**
   * 将页面上的左边转化为canvas中的坐标
   * @param pageX
   * @param pageY
   * @returns {{x: number, y: number}}
   */
  this.getCanvasPoint = function (pageX, pageY) {
    return {
      x: pageX - pageOffset.left,
      y: pageY - pageOffset.top
    }
  }

  /**
   * 清除区域，此用户鼠标擦出刮奖涂层
   * clearRect - canvas的橡皮擦
   * @param start
   * @returns {*}
   */
  this.clearRect = function (point) {
    context.clearRect(point.x, point.y, 10, 10);
    return this;
  };

  /**
   * 设置画笔宽度
   * @param newWidth
   * @returns {*}
   */
  this.penWidth = function (newWidth) {
    if (arguments.length) {
      context.lineWidth = newWidth;
      return this;
    }
    return context.lineWidth;
  };

  /**
   * 设置画笔颜色
   * @param newColor
   * @returns {*}
   */
  this.penColor = function (newColor) {
    if (arguments.length) {
      context.strokeStyle = newColor;
      context.fillStyle = newColor;
      return this;
    }
    return context.strokeStyle;
  };
}


// ----


function GuaGuaLe(idFront) {
  this.$eleFront = document.getElementById(idFront);
  this.frontCanvas = new Canvas2D(this.$eleFront);
  this.isStart = false;
}

GuaGuaLe.prototype = {
  constructor: GuaGuaLe,

  /**
   * 将用户的传入的参数和默认参数做合并
   * @param desAttr
   * @returns {{frontFillColor: string, backFillColor: string, backFontColor: string, backFontSize: number, msg: string}}
   */
  mergeAttr: function (desAttr) {
    desAttr = desAttr || {};
    var defaultAttr = {
      frontFillColor: '#AFAFAE',
      percent: .8,
      success: function () {
        console.log('here is success callback');
      }
    };
    defaultAttr = Object.assign({}, defaultAttr, desAttr);
    return defaultAttr;
  },

  init: function (desAttr) {
    var attr = this.mergeAttr(desAttr);

    // 初始化前面的canvas
    this.frontCanvas.penColor(attr.frontFillColor);
    this.frontCanvas.drawRect({x: 0, y: 0}, {x: this.frontCanvas.width(), y: this.frontCanvas.height()}, true);

    var _this = this;

    //设置事件
    this.$eleFront.addEventListener('mousedown', function(e) {
      _this.mouseDown(e);
    })
    this.$eleFront.addEventListener('mousemove', function(e) {
      _this.mouseMove(e);
    })
    this.$eleFront.addEventListener('mouseup', function() {
      _this.mouseUp();
    })
  },

  mouseDown: function (event) {
    this.isStart = true;
    this.startPoint = this.frontCanvas.getCanvasPoint(event.pageX, event.pageY);
  },

  mouseMove: function (event) {
    if (!this.isStart)return;
    var p = this.frontCanvas.getCanvasPoint(event.pageX, event.pageY);
    this.frontCanvas.clearRect(p);
  },

  mouseUp: function() {
    this.isStart = false;
  }
};