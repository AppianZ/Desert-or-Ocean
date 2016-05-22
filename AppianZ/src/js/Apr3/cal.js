/**
 * Created by JW on 2016/5/5.
 */
function getDayArr(year,month){
    var recentArr = [];
    var recentFirstDay = new Date(year,month-1,1).getDay();
    var recentMonthDate = new Date(year,month,0).getDate();
    console.log(year,month);
    var lastMonth = new Date(year,month-1,0).getDate();
    if(recentFirstDay == 0) {
        var temp = 7;
    } else {
        var temp = recentFirstDay;
    }
    recentArr.push(year);
    for(var i = temp ; i > 1; i--) {
        recentArr.push(lastMonth - i + 2 + 'c');
    }
    for(var i = 1 ; i <= recentMonthDate ; i++) {
        recentArr.push(i);
    }
    if((recentFirstDay + recentMonthDate - 1) % 7 != 0){
        for(var i = 0 ; i <(7-(recentFirstDay + recentMonthDate - 1) % 7) ; i++) {
            recentArr.push(i + 1 + 'c');
        }
    }
    recentArr.push(month);
    return recentArr;
}
function getDayObj(year,month) {
    var lastYear = new Date(year,month-2,1).getFullYear();
    var lastMonth = new Date(year,month-2,1).getMonth()+1;
    var lastArray = getDayArr(lastYear,lastMonth);
    console.log(lastArray);

    var recentArray = getDayArr(year,month);
    console.log(recentArray);

    var nextYear =  new Date(year,month,1).getFullYear();
    var nextMonth = new Date(year,month,1).getMonth()+1;
    var nextArray = getDayArr(nextYear,nextMonth);
    console.log(nextArray);

    return {
        before : lastArray,
        now : recentArray,
        after : nextArray
    }
}

function initDate() {
    initMouthArr();
    var uls = $("#dateBox ul");
    var index = MOUTHARR.indexOf(NOWMONTH);

    if(NOWMONTH == BEGINMONTH) { //当前时间等于开始时间
        var datesObj = getDayObj(new Date().getFullYear(),NOWMONTH + 1);
    } else if(NOWMONTH == ENDMONTH) { //当前时间等于结束时间
        var datesObj = getDayObj(new Date().getFullYear(),NOWMONTH - 1);
        dateBox.css('-webkit-transform','translate3d('+ 9 * -dateBoxWith +'px,0,0)');
    } else { //当前时间都不等的情况
        var datesObj = getDayObj(new Date().getFullYear(),NOWMONTH);
        dateBox.css('-webkit-transform','translate3d('+ index * -dateBoxWith +'px,0,0)');
    }

    setInitMonth(datesObj.before,0);
    setInitMonth(datesObj.now,1);
    setInitMonth(datesObj.after,2);

    if($data.change) {
        uls.append('<div id="dateBg" class="change"></div>')
    }else {
        uls.append('<div id="dateBg"></div>')
    }
    function setInitMonth(arr,idx) {
        uls.eq(idx).data("year", arr.shift());
        uls.eq(idx).data("month", arr.pop());
        uls.eq(idx).attr("id", uls.eq(idx).data("year")+'-'+uls.eq(idx).data("month"));
        $.each(arr, function (index, item) {
            setColor(idx,item,uls.eq(idx).data("year"),uls.eq(idx).data("month"));
        });
    }
    function setColor(index,item,year,month) {
        if(String(item).indexOf('c') > 0) {
            uls.eq(index).append('<li class="other"><i>' + String(item).replace('c', '') + '</i></li>');
        } else {
            uls.eq(index).append('<li data-url="'+ year +'-'+ month +'-'+ item +'"><i>'+ item +'</i></li>')
        }
    }


}
initDate();

