/**
 * Created by appian on 16/9/22.
 */
var myChart = echarts.init(document.getElementById('container'));

$.get('test.json', function (webkitDep) {
	option = {
		legend: {
			data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
		},
		series: [{
			type: 'graph',
			layout: 'force',
			animation: false,
			label: {
				normal: {
					position: 'right',
					formatter: '{b}'
				}
			},
			draggable: true,
			data: webkitDep.nodes.map(function (node, idx) {
				node.id = idx;
				return node;
			}),
			categories: webkitDep.categories,
			force: {
				// initLayout: 'circular'
				// gravity: 0
				// repulsion: 20,
				edgeLength: 5,
				repulsion: 20
			},
			edges: webkitDep.links
		}]
	};
	
	myChart.setOption(option);
});