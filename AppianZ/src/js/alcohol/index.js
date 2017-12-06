/**
 * Created by appian on 2017/12/5.
 */
var list = [{
  name: '【纯粮酒】纯手工小曲高粱',
  price: '   20',
  unit: '元/斤',
  url: './gaoliang.jpeg',
}, {
  name: '【纯粮酒】纯手工小曲五粮53度',
  price: '   50',
  unit: '元/瓶',
  url: './wuliang53.jpeg',
}, {
  name: '【纯粮酒】纯手工大曲五粮53度',
  price: '   65',
  unit: '元/瓶',
  url: './daqu53.jpeg',
}, {
  name: '【纯粮酒】纯手工大曲五粮65度',
  price: '   75',
  unit: '元/瓶',
  url: './daqu65.jpeg',
}, {
  name: '【纯粮酒】纯手工竹叶青45度',
  price: '   70',
  unit: '元/瓶',
  url: './zhuyeqing.jpeg',
}, {
  name: '【纯粮酒】纯手工红茅烧45度',
  price: '   50',
  unit: '元/瓶',
  url: './hongmaosao.jpeg',
}]

new Vue({
  el: '#container',
  data: {
    list: list,
  }
})