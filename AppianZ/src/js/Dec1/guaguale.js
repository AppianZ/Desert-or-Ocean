/**
 * Created by appian on 2017/12/13.
 */

function GuaGuaLe(idFront, idBack) {
  this.$eleFront = document.getElementById(idFront);
  this.$eleBack = document.getElementById(idBack);
  this.frontCanvas = new Canvas2D(this.$eleFront);
  this.backCanvas = new Canvas2D(this.$eleBack);
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
      backFillColor: '#FDD09A',
      backFontColor: '#CC2031',
      backFontSize: 24,
      msg: '什么都没刮到'
    };
    defaultAttr = Object.assign({}, defaultAttr, desAttr);
    return defaultAttr;
  },

  init: function (desAttr) {
    var attr = this.mergeAttr(desAttr);

    // 初始化前面的canvas
    this.frontCanvas.penColor(attr.frontFillColor);
    this.frontCanvas.drawRect({x: 0, y: 0}, {x: this.frontCanvas.width(), y: this.frontCanvas.height()}, true);

    // 初始化背面的canvas的背景
    this.backCanvas.penColor(attr.backFillColor);
    this.backCanvas.fontSize(attr.backFontSize);
    this.backCanvas.drawRect({x: 0, y: 0}, {x: this.backCanvas.width(), y: this.backCanvas.height()}, true);

    // 初始化背面的canvas的文字
    this.backCanvas.penColor(attr.backFontColor);
    this.backCanvas.drawTextInCenter(attr.msg, true);

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