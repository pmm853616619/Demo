//时间过滤
Vue.filter('date', function(value , type) {
	if(!value) {
		return '';
	}
	var now = new Date(value * 1000);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	type = type ? type : 1;
	if(type == 1) {
		return year + "-" + month + "-" + date + "   " + hour + ":" + minute;
	}
	if(type == 2) {
		return year + "-" + month + "-" + date;
	}
	if(type == 3) {
		return year + "年" + month + "月" + date + '日';
	}
	if(type == 4) {
		return month + "月" + date + '日';
	}
});
Vue.filter('hide', function(value) {
	s = String(value);
	var sum = s.length - 4;
	if(sum <= 0) {
		return s;
	}
	var l = s.substr(0, 2), r = s.substr(s.length-2);
	var hide = '';
	for (var i=0; i < sum; i++) {
		hide += '*';
	}
	return  l+hide+r;
});

//通用方法
Vue.mixin({
	methods: {
		submit: function(event) {
			var el = this;
			plus.nativeUI.showWaiting();
			http.post($('form').attr('action'), this.$data, function(msg, info) {
				plus.nativeUI.closeWaiting();
				plus.nativeUI.toast(msg);
				if (el.success) {
					el.success(msg, info);
				};
			}, function(msg, status) {
				plus.nativeUI.closeWaiting();
				if (el.error) {
					el.error(msg, status);
				};
			});
		},
		listPage: function(url, params) {
			param = $.extend({page: vm.page} , params);
			http.post(url, param, function(msg, data) {
				if (data.data) {
					$.each(data.data, function(i, v) {
						vm.items.push(v);
					});
				}
				vm.loading = 0;
				vm.page = data.cur_page + 1;
				if (data.count_page > data.cur_page) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}

			}, function(){
				vm.loading = 0;
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
			});
		},
		tabListPage: function(self, ul, url,params) {
			params['type'] = ul.getAttribute("data-type");
			param = $.extend({page: vm.page} , params);
			var listId = ul.getAttribute("data-id");
			if (!vm[listId]) {
				vm[listId] = [];
			}
			http.post(url, param, function(msg, data) {
				if (data.data) {
					$.each(data.data, function(i, v) {
						vm[listId].push(v);
					});
				}
				vm.loading = 0;
				vm.page = data.cur_page + 1;
				if (data.count_page > data.cur_page) {
					self.endPullUpToRefresh(false);
				} else {
					self.endPullUpToRefresh(true);
				}

			}, function(){
				plus.nativeUI.closeWaiting();
				vm.loading = 0;
				self.endPullUpToRefresh(false);
			});
		},		
		
		sltDate: function(name) {
			plus.nativeUI.pickDate(function(e) {
				var d = e.date;
				vm[name] = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
			});
		},
		sltLocation: function(name) {
			var cityPicker = new mui.PopPicker({
				layer: 3
			});
			cityPicker.setData(cityData);
			cityPicker.show(function(items) {
				vm[name] = items[0].text + ' ' + items[1].text + ' ' + items[2].text;
			});
		},
	}
});