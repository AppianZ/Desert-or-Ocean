/**
 * Created by JW on 2016/4/3.
 */
var password = (function(){
    return {
        'check' : function(){
            var $input = document.getElementsByTagName('input');
            if($input[0].value == $data.username && $input[1].value == $data.password){
                console.log('ok');
            } else {
                console.log($input[0].value + $input[1].value);
                alert('login fail');
            }
             return this;
        },
        'moveToRight' : function(){
            document.getElementById('wrap').setAttribute('class','right');
        }
    }
})();

var pin = (function(){
    var pinArr = [];
    return {
        'init' : function(){
            for(var j = 0; j < 4; j++){
                document.getElementById('pin').getElementsByTagName('span')[j].removeAttribute('class');
            }
        },
        'click' : function(value){
            var $pin = document.getElementById('pin');
            if(this.check()){
                pinArr.push(value);
                for(var i = 0; i < pinArr.length; i++){
                    $pin.getElementsByTagName('span')[i].setAttribute('class','on');
                }
                console.log(pinArr);
                if(pinArr.length == 4){
                    var fin = '';
                    for(var k = 0 ; k < 4; k++){
                        fin += pinArr[k];
                    }
                    if(fin == $data.pinword){
                        document.getElementById('wrap').removeAttribute('class');
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
                document.getElementById('pin').getElementsByTagName('span')[i].setAttribute('class','on');
            }
        },
        'moveToLeft' : function(){
            document.getElementById('wrap').removeAttribute('class');
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
        distance : 0,
        selector : document.getElementById('wrap'),
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
                    var tempDis = this.distance + (this.start - this.end);
                    console.log('end ----' , tempDis);
                    // this.selector.style.transform = 'translate3d(0,-' +  this.distance + 'px, 0)';
                    break;
                case "touchmove":
                    event.preventDefault();
                    this.move = event.touches[0].clientX;
                    var offset = this.start - this.move;
                    console.log('move------',offset);
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

document.getElementById('toRight').onclick = function(){
    password.moveToRight();
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
