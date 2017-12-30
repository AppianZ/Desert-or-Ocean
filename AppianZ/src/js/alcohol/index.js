/**
 * Created by appian on 2017/12/5.
 */
var list = [{
  name: '【纯粮酒】传统工艺白兰地53°',
  hot: true,
  desc: '新品上市 惊喜连连',
  price: '   130',
  unit: '元/斤',
  url: './bailandi.jpeg',
}, {
  name: '【纯粮酒】传统工艺竹叶青45°',
  hot: true,
  desc: '清香顺口 入口丝滑',
  price: '   70',
  unit: '元/瓶',
  url: './zhuyeqing.jpeg',
}, {
  name: '【纯粮酒】传统工艺小曲五粮53°',
  desc: '精心酿造 送礼佳品',
  price: '   50',
  unit: '元/瓶',
  url: './wuliang53.jpeg',
}, {
  name: '【纯粮酒】传统工艺大曲五粮53°',
  desc: '口感醇正 销量领先',
  price: '   65',
  unit: '元/瓶',
  url: './daqu53.jpeg',
}, {
  name: '【纯粮酒】传统工艺大曲五粮63°',
  desc: '唇齿留香 意犹未尽',
  price: '   75',
  unit: '元/瓶',
  url: './daqu65.jpeg',
}, {
  name: '【纯粮酒】传统工艺红茅烧45°',
  desc: '甘甜顺喉 回味无穷',
  price: '   50',
  unit: '元/瓶',
  url: './hongmaosao.jpeg',
}, {
  name: '【纯粮酒】传统工艺小曲高粱',
  desc: '亲朋小聚 必备佳品',
  price: '   20',
  unit: '元/斤',
  url: './gaoliang.jpeg',
}]

new Vue({
  el: '#container',
  data: {
    list: list,
  }
})