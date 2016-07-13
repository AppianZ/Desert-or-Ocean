/**
 * Created by JW on 2016/7/12.
 */
(function(wid,dcm) {
    var win = wid;
    var doc = dcm;

    function $id(name) {
        return doc.getElementById(name);
    }

    function $class(name) {
        return doc.getElementsByClassName(name);
    }

    function loop(begin,length,fuc) {
        for(var i = begin; i < length ; i ++){
            fuc(i);
        }
    }

    function on(action,selector,callback) {
        doc.addEventListener(action,function(e){
            if(selector == e.target.tagName.toLowerCase() || selector == e.target.className || selector == e.target.id){
                callback(e);
            }
        })
    }

    function CalendarSelector(config) {
        this.input = config.input;
        this.container = config.container;
        this.isSundayFirst = config.isSundayFirst;
        this.isHide = config.isHide;
        this.startTime = config.startTime;
        this.finishTime = config.finishTime;
        this.callbackFuc = config.callbackFuc;
    }

})(window,document);