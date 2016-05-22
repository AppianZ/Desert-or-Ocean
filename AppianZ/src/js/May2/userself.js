var info = Vue.component('info',{
    template : '#infoTpl',
    data : function(){
        return {
            id : $data.id,
            img_url : $data.img_url,
            nickname : $data.nickname,
            sno : $data.sno,
            sex : $data.sex,
            is_attend : $data.is_attend
        }
    }
});

var list = Vue.component('list',{
    template : '#listTpl',
    props : ['el']
});


var V = new Vue({
    el : 'body',
    data : {
        list :  $data.list,
        on : 0,
    },
    methods : {
        'switch' : function(num){
            this.$set('on',num);
        }
    }
});