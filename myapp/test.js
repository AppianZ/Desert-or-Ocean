/**
 * Created by JW on 2016/7/17.
 */
"use strict";
/*function add(){
    return [...arguments].reduce((a,b)=>a+b)
}
console.log(add(1,1));
console.log(add(1,11,3,4,45,23));*/

/*
 let test1 = (a,b)=>{
 return a-b;
 };

 console.log(test1(10,4));*/

/*let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function() {
    console.log('Resolved.');
});

console.log('Hi!');*/

let test2 = (test)=>{
    return new Promise((resolve,reject)=>{
        try {
            test(resolve);
        }catch (err) {
            reject('this is error:' + err);
        }
    })
};

test2(a=>{
    return a(3);
}).then(b=>{
    let c =10;
    console.log(b*c);
    return [b*c,b+c];
}).then(d=>{
    console.log(d);
}).catch(e =>{
    console.log(e);
});


let test3 = (test)=>{
    return new Promise((resolve,reject)=>{
        try {
            test(resolve);
        }catch (err) {
            reject('this is error:' + err);
        }
    })
};

test3(a=>{
    return a(7);
}).then(b=>{
    let c =10;
    console.log(b*c);
    return [b*c,b+c];
}).then(d=>{
    console.log(d);
}).catch(e =>{
    console.log(e);
});


Promise.all([test2,test3]).then(()=>{
    console.log('00000000000000');
});


/*

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(2000).then((value) => {
    console.log(value);
});*/
