/**
 * Created by JW on 2016/4/3.
 */
var $wrap = document.getElementById('wrap');
var distance = 0;
var width = document.body.offsetWidth;

var password = (function(){
    return {
        'check' : function(){
            var $input = document.getElementsByTagName('input');
            if($input[0].value == $data.username && $input[1].value == $data.password){
                alert('ok');
            } else {
                alert('fail');
                $input[0].value = '';
                $input[1].value = '';
            }
             return this;
        }
    }
})();

var pin = (function(){
    var pinArr = [];
    var $pin = document.getElementById('pin');
    var $span = document.getElementById('pin').getElementsByTagName('span');
    return {
        'init' : function(){
            for(var j = 0; j < 4; j++){
                $span[j].removeAttribute('class');
            }
        },
        'click' : function(value){
            if(this.check()){
                pinArr.push(value);
                for(var i = 0; i < pinArr.length; i++){
                    $span[i].setAttribute('class','on');
                }
                console.log(pinArr);
                if(pinArr.length == 4){
                    var fin = '';
                    for(var k = 0 ; k < 4; k++){
                        fin += pinArr[k];
                    }
                    if(fin == $data.pinword){
                        $wrap.style= 'none';
                        $wrap.removeAttribute('class');
                        distance = 0;
                        pinArr.length = 0;
                        this.init();
                    } else {
                        $pin.setAttribute('class','shocks');
                        var _this = this;
                        setTimeout(function(){
                            pinArr.length = 0;
                            $pin.removeAttribute('class');
                            _this.init();
                        },500);
                    }
                }else {}
            }else {
                pinArr.length = 0;
                this.init();
            }
        },
        'check': function(){
            if(pinArr.length > 4){
            }else {
                return true;
            }
        },
        'delete' : function(){
            pinArr.pop();
            this.init();
            for(var i = 0; i < pinArr.length; i++){
                $span[i].setAttribute('class','on');
            }
        },
        'moveToLeft' : function(){
            $wrap.style= 'none';
            $wrap.removeAttribute('class');
            distance = 0;
            pinArr.length = 0;
            this.init();
        }
    }
})();

var touchMove = (function () {
    return  {
        start : 0,
        move : 0,
        end : 0,
        'readyLoad' : function () {
            document.addEventListener('touchstart',this.touch.bind(this),false);
            document.addEventListener('touchmove',this.touch.bind(this),false);
            document.addEventListener('touchend',this.touch.bind(this),false);
        },
        'touch' : function(){
            var event = event || window.event;
            switch(event.type) {
                case "touchstart":
                    this.start = event.touches[0].clientX;
                    break;
                case "touchend":
                    this.end = event.changedTouches[0].clientX;
                    var tempDis = (this.end - this.start).toFixed(2);
                    if(tempDis >=  width / 2){
                        distance = width;
                    }else if( tempDis <=  - width / 2){
                        distance = 0;
                    }
                    $wrap.style.transform = 'translate3d(' +  distance + 'px, 0 , 0)';
                    $wrap.style.transition = 'all .5s ease';
                    break;
                case "touchmove":
                    event.preventDefault();
                    this.move = event.touches[0].clientX;
                    var offset = (this.move - this.start).toFixed(2);
                    var dis = distance + (offset - 0);
                    if (distance == 0 && offset < 0 || dis > width){
                    }else{
                        $wrap.style.transform = 'translate3d(' + dis + 'px, 0 , 0)';
                        $wrap.style.transition = 'none';
                    }
                    break;
            }
        }
    }
})();

window.onload = function () {
    touchMove.readyLoad();
};

window.onkeydown = function(ev){
    if(ev.keyCode == 13){
        password.check();
    }
};

var $td = document.getElementsByTagName('td');

for(var i = 0; i < $td.length; i ++){
    $td[i].onclick = function(){
        var value = this.getAttribute('data-val') - 0;
        if(value >= 0){
            pin.click(value);
        }else if (value == -1){
            pin.moveToLeft();
        }else {
            pin.delete();
        }
    }
}
