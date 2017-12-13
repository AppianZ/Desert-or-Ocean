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

  context.font = '24px Verdana, Geneva, sans-serif';
  context.textBaseline = 'top';

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
   * 得到文本在canvas上绝对居中时的左上角坐标
   * 文本的字体大小也可以作为参数传递
   * context.font = fontSize + 'px Verdana, Geneva, sans-serif';
   * @param text
   * @returns {{x: number, y: number}}
   *
   *  小矩形代表文字, 求出A点坐标
   * ┌-----------------┐
   * ┆   A╭-------╮    ┆
   * ┆    ╰-------╯    ┆
   * └-----------------┘
   *
   */
  this.calculateTextCenterPos = function (text) {
    var textWidth = context.measureText(text).width;
    var textHeight = parseInt(context.font);
    return {
      x: width / 2 - textWidth / 2,
      y: height / 2 - textHeight / 2
    };
  }

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
  $(window).resize(function () {
    pageOffset = $canvas.offset();
  });

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
   * 将文本根据左上角坐标绘制到canvas的中间
   * 根据是否需要填充, 绘制实心字体 or 绘制描边字体。
   * @param text
   * @param fill
   */
  this.drawTextInCenter = function (text, fill) {
    var point = this.calculateTextCenterPos(text);
    if (fill) context.fillText(text, point.x, point.y);
    else context.strokeText(text, point.x, point.y);
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

  /**
   * 设置字体大小
   * @param fontSize
   * @returns {*}
   */
  this.fontSize = function (fontSize) {
    if (arguments.length) {
      context.font = fontSize + 'px Verdana, Geneva, sans-serif';
      return this;
    }
    return context.fontSize;
  }
}