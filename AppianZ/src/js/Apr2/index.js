/**
 * Created by JW on 2016/4/17.
 */
juicer.set({
    'tag::interpolateOpen': '{{',
    'tag::interpolateClose': '}}'
});

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
            Math.round(value)
        ]
    }
}

var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}

option = {
    title: {
        text: ''
    },
    tooltip: {
        show: 'false'
    },
    grid: {
        left : -2,
        top: 30,
        right: 0,
        bottom:	30,
        borderColor: '#fff'
    },
    xAxis: {
        type: 'category',
        data: ['Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.', 'Sun.'],
        nameTextStyle: {
            color: '#fff',
            fontWeight: 'bolder'
        },
        nameLocation: 'middle'
    },
    yAxis: {
        type: 'category',
        data: [23, 26, 34, 49, 62, 76, 92],
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


// 列表渲染
var section = (function(){
    return {
        'data' : {
            list : $data.list,
            percent : $data.percent
        },
        'tpl' : $('#tpl').html(),
        'general' : function(){
            var html = juicer(this.tpl,this.data);
            $('#bottom').html(html);
            $('#percent').html((this.data.percent - 0).toFixed(2) * 100 + '%')
        }
    }
})();
section.general();