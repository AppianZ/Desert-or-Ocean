/**
 * Created by appian on 16/9/7.
 */
// superagent 是一个专注于处理服务端/客户端的http请求的第三方模块
const request = require('superagent');
// cheerio一个类似于jq的类库
const cheerio=require('cheerio');
// url是你要爬虫的网站地址
const url="http://www.imooc.com/course/list?c=javascript";

request
.get(url)
.end((err,data) => {
	const html = data.text;
	// console.log(html);
	getInfo(html);
});

function getInfo(html) {
	const $ = cheerio.load(html);
	// console.log($('a').text());
	let arr = [];
	$('.moco-course-wrap').each(function(index, elem) {
		// console.log($(elem).find('.l').text());
		// console.log(url + $(elem).find('a').attr('href'));
		arr.push({
			title: $(elem).find('.l').text(),
			href: url + $(elem).find('a').attr('href'),
		})
	});
	console.log(arr);
}
