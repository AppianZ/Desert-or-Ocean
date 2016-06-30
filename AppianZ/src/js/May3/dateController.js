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
        for(var i = begin; i < length ; i ++){
            fuc(i);
        }
    }

    function DateSelector(config){
        this.container = config.container;
        this.type = config.type;
        this.param = config.param;
        this.range = (config.type === 1 || config.param[0] === 1)?
            ((config.range.length == 2 && config.range[0] < config.range[1])?
                config.range : [1950,new Date().getFullYear() + 1]): [];
        this.ulCount = 0;
        this.initFuc();
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
            console.log(this.param);
            this.ulCount = idxArr[idxArr.length - 1] - idxArr[0] + 1;
            loop(idxArr[0],idxArr[idxArr.length - 1] + 1,function (i) {
                _this.param[i] = 1;
            });
            console.log(this.param);
            console.log(this.ulCount);
        },
        initFuc : function(){
            var _this = this;
            this.checkParam();
            var html = '';
            html += '<div id="date-selector-bg">' +
                '<div id="date-selector-container">' +
                '<div class="date-selector-btn-box">' +
                '<div class="date-selector-btn" id="date-selector-btn-cancel">返回</div>';
            if(this.type == 1) {
                html += '<div class="date-selector-tab-box">' +
                    '<div class="date-selector-tab date-selector-tab-active">年月日</div>' +
                    '<div class="date-selector-tab">时分</div>' +
                    '</div>';
            }
            html += '<div class="date-selector-btn" id="date-selector-btn-save">提交</div>' +
                '</div>' +
                '<div class="date-selector-content">';//27行

            if(this.type == 0){//写死的固定死的
                html += ''
            }else if(this.type == 1){


            }





            /*loop(0,_this.ulCount - 1,function (i) {
                $class('date-selector')[i].style.width = (100/_this.ulCount).toFixed(2) + '%';
                console.log($class('date-selector')[i].style.width);
            });*/
        }
    };
    win.DateSelector = DateSelector;
})(window,document);


new DateSelector({
    container : "",//插入的容器id
    type : 0,
    //0：不需要tab切换，自定义滑动内容，建议小于三个；
    //1：需要tab切换，年月日时分完全展示，固定死，可设置开始年份和结束年份
    param : [1,0,1,0,0],
    //设置['year','month','day','hour','minute'],1为需要，0为不需要
    range : [1960,2017],//如果设置了需要年份的情况下，才生效的年份范围
    submit : function(){}
});

