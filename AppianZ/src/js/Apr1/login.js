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
        'moveLeft' : function(){
            document.getElementById('password').setAttribute('class','left');
            document.getElementById('pinword').setAttribute('class','right');
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
                        document.getElementById('password').removeAttribute('class');
                        document.getElementById('pinword').removeAttribute('class');
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
        'moveRight' : function(){
            document.getElementById('password').removeAttribute('class');
            document.getElementById('pinword').removeAttribute('class');
            pinArr.length = 0;
            this.init();
        }
    }
})();


window.onkeydown = function(ev){
    if(ev.keyCode == 13){
        password.check();
    }
};

document.getElementsByClassName('iconfont')[1].onclick = function(){
    password.moveLeft();
};

var $td = document.getElementsByTagName('td');
console.log($td);

for(var i = 0; i < $td.length; i ++){
    $td[i].onclick = function(){
        var value = this.getAttribute('data-val') - 0;
        if(value >= 0){
            pin.click(value);
        }else if (value == -1){
            pin.moveRight();
        }else {
            pin.delete();
        }
    }
}
