/**
 * Created by appian on 16/9/7.
 */
// superagent 是一个专注于处理服务端/客户端的http请求的第三方模块
const request = require('superagent');
// cheerio一个类似于jq的类库
const cheerio = require('cheerio');
// url是你要爬虫的网站地址
const url = "http://www.imooc.com/course/list?c=javascript";

/* superagent的基本语法:
在nodejs客户端中，superagent能根据提供的绝对路径来模拟请求。
request
.get('http://www.baidu.com/search')
.end(function (err, res) {
	
});*/

request
.get(url)
.end((err,data) => {
	const html = data.text;
	// console.log(html);
	getInfo(html);
});

function getInfo(html) {
	// 把前面我们爬到的页面的html代码传进cheerio中
	const $ = cheerio.load(html);
	// console.log($('a').text());
	let arr = [];
	$('.moco-course-wrap').each(function(index, elem) {
		arr.push({
			title: $(elem).find('h3').text().replace(/\s|\\r\\n/g, ''),
			count: $(elem).find('.l').text(),
			href: url + $(elem).find('a').attr('href'),
		})
	});
	console.log(arr);
}
