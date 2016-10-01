/**
 * Created by appian on 16/10/1.
 */

Vue.component('button-counter', {
	template: '<button @click="increment">{{ counter }}</button>',
	data: function () {
		return {
			counter: 0
		}
	},
	methods: {
		increment: function () {
			this.counter += 1;
			this.$emit('increments');
		}
	},
});

Vue.component('my-input', {
	template: '\
    <div class="form-group">\
      <label v-bind:for="randomId">{{ label }}:</label>\
      <input v-bind:id="randomId" v-bind:value="value" v-on:input="onInput">\
    </div>\
  ',
	props: ['value', 'label'],
	data: function () {
		return {
			randomId: 'input-' + Math.random()
		}
	},
	methods: {
		onInput: function (event) {
			this.$emit('input', event.target.value)
		}
	},
});

new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue.js!',
		picked: '',
		total: 0,
	},
	methods: {
		reverseMessage: function() {
			this.message = this.message.split('').reverse().join('');
			console.log(123);
		},
		incrementTotal: function () {
			this.total += 1
		}
	}});