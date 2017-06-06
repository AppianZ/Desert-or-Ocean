/**
 * Created by appian on 2017/6/6.
 */
new Vue({
	el : '#container',
	data: {
		imgUrl: '',
		addImgStatus: false,
		showHtmlStatus: false,
		showTxt: '',
		choiceTxt: '',
		reg1: /<([a-z]+)>(.+?)<\/\1>/g,
		reg2: /<img\s+src=['"](.+?)['"]\/>/g,
		beginPos: 0,
		endPos: 0,
		content: '',
		title: '测试文本',
	},
	mounted() {
		document.onmouseup = (el) => {
			if (el.target.className !== 'unIgnoreMouse') return;
			this.choiceTxt = this.getSelectText();
			console.log(`被选中的文本: ${this.choiceTxt}`);
			this.beginPos = document.getElementById('show-html').selectionStart;
			this.endPos = document.getElementById('show-html').selectionEnd;
			console.log(`光标位置: begin:${this.beginPos} --- end:${this.endPos}`);
		};
	},
	methods: {
		switchAddStatus() {
			this.addImgStatus = !this.addImgStatus;
			this.imgUrl = '';
		},
		switchShowHtml() {
			this.showHtmlStatus = !this.showHtmlStatus;
		},
		addNormalTxt() {
			const str = `<p>${this.choiceTxt.replace(this.reg1, '$2')}</p>`;
		  this.title = this.pre + str + this.next;
		},
		addQuotation() {
			const str = `<div>${this.choiceTxt.replace(this.reg1, '$2')}</div>`;
		  this.title = this.pre + str + this.next;
		},
		submitImg() {
			const str = `<figure><img src='${this.imgUrl}'/></figure>`;
			this.title = this.pre + str + this.next;
			this.switchAddStatus();
		},
		clearHtml() {
			const str = this.choiceTxt.replace(this.reg1, '$2');
			this.title = this.pre + str + this.next;
		},
		getSelectText() {
			if (document.selection) {
				this.choiceTxt = document.selection.createRange().text;
			} else {
				this.choiceTxt = document.getSelection();
			}
			return this.choiceTxt.toString();
		},
	},
	computed: {
		pre() {
			return this.title.substr(0, this.beginPos);
		},
		next() {
			return this.title.substr(this.endPos, this.title.length);
		},
		content() {
			return `${this.title}<p></p>`;
		},
		htmlTitle() {
			return this.title.replace(this.reg1, '$2&#10;&#10;').replace(this.reg2, '【图片$1】');
		},
	},
});