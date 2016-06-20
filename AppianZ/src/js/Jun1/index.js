/**
 * Created by JW on 2016/6/6.
 */
var MONEY = 10;
var bottle = 0;
var cover = 0;
var glass = 0;

buy();

function buy (){
    if(MONEY < 0 || bottle < 0 || cover < 0 || glass < 0){
        return;
    }else if(cover < 4 && glass < 2){//需要购买
        if (MONEY - 2 < 0) return;
        MONEY = MONEY - 2;
        bottle++;
        cover++;
        glass++;
        console.log('[1]：money：' + MONEY + ';bottle：' + bottle + ';cover：' + cover + ';glass：' + glass);
    }
    testCover(cover);
    testGlass(glass);
    buy();
}

function testCover (c){
    if(c >= 4){
        bottle += Math.floor(c / 4);
        cover -= Math.floor(c / 4) * 4;
        cover ++;
        glass += Math.floor(c / 4);
        console.log('[2]：money：' + MONEY + ';bottle：' + bottle + ';cover：' + cover + ';glass：' + glass);
    }
}

function testGlass (g){
    if(g >= 2){
        bottle += Math.floor(g / 2);
        cover += Math.floor(g / 2);
        glass -= Math.floor(g / 2) * 2;
        console.log('[3]：money：' + MONEY + ';bottle：' + bottle + ';cover：' + cover + ';glass：' + glass);
    }else if(g == 1){//借一瓶
        bottle++;
        cover++;
        glass--;
        console.log('[4]：money：' + MONEY + ';bottle：' + bottle + ';cover：' + cover + ';glass：' + glass);
        if(MONEY == 0 && cover < 4){
        }
    }
}


