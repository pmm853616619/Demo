/**
 * 页面
 */
(function(mui, owner) {
	/**
	 * 加载列表
	 */
	owner.list = function(url, load, params) {
		params = params ? params : {};
		//下拉加载
		mui.init({
				pullRefresh: {
					container: '#pullrefresh',
					down: {
						callback: function() {
							vm.listPage(url, params);
						}
					},
					up: {
						contentrefresh: '正在加载...',
						callback: function() {
							vm.listPage(url, params);
						},
						auto:true,
					},
					
				}
			});
		if (load) {
			if (mui.os.plus) {
				mui.plusReady(function() {
					setTimeout(function() {
						mui('#pullrefresh').pullRefresh().pullupLoading();
					}, 100);
				});
			} else {
				mui.ready(function() {
					mui('#pullrefresh').pullRefresh().pullupLoading();
				});
			}
		}

	};
	
	/**
	 * TAB 加载列表
	 */
	owner.tablist = function(url, load, params){
			
		params = params ? params : {};
		(function($) {
			//阻尼系数
			var deceleration = mui.os.ios?0.003:0.0009;
			$('.mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: true, //是否显示滚动条
				deceleration:deceleration
			});
			$.ready(function() {
				//循环初始化所有下拉刷新，上拉加载。
				$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					$(pullRefreshEl).pullToRefresh({
						up: {
							callback: function() {
								var self = this;
								var ul = self.element.querySelector('.mui-table-view');
								setTimeout(function() {
									vm.tabListPage(self, ul, url, params);
									self.endPullUpToRefresh();
								}, 1000);
							},
							auto:true
						}
					});
					
//					if (load) {
//						if (mui.os.plus) {
//							mui.plusReady(function() {
//								setTimeout(function() {
//									this.pullRefresh().pullupLoading();
//								}, 1000);
//			
//							});
//						} else {
//							mui.ready(function() {
//								this.pullRefresh().pullupLoading();
//							});
//						}
//					}
					
					
				});

			});
		})(mui,jQuery);
	}

	/**
	 * TAB 加载列表
	 */
	owner.tabNewlist = function(up,down){
			
		// params = params ? params : {};
		(function($) {
			//阻尼系数
			var deceleration = mui.os.ios?0.003:0.0009;
			$('.mui-scroll-wrapper').scroll({
				bounce: false,
				indicators: true, //是否显示滚动条
				deceleration:deceleration
			});
			$.ready(function() {
				//循环初始化所有下拉刷新，上拉加载。
				$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
					$(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								var ul = self.element.querySelector('.mui-table-view');
								if (typeof(down) == "function") {
									down(self, ul);
								}
							}
						},
						up: {
							callback: function() {
								var self = this;
								var ul = self.element.querySelector('.mui-table-view');
								if (typeof(up) == "function") {
									up(self, ul);
								}
							},
							auto:true
						}
					});
				});

			});
		})(mui,jQuery);
	}

	/**
	 * TAB
	 */
	owner.tabPage = function(){
		(function($) {
			//阻尼系数
			var deceleration = mui.os.ios?0.003:0.0009;
			$('.mui-scroll-wrapper').scroll({
				//bounce: false,
				indicators: true, //是否显示滚动条
				// deceleration:deceleration
			});

//			var html2 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第二个选项卡子项-1</li><li class="mui-table-view-cell">第二个选项卡子项-2</li><li class="mui-table-view-cell">第二个选项卡子项-3</li><li class="mui-table-view-cell">第二个选项卡子项-4</li><li class="mui-table-view-cell">第二个选项卡子项-5</li></ul>';
//				var html3 = '<ul class="mui-table-view"><li class="mui-table-view-cell">第三个选项卡子项-1</li><li class="mui-table-view-cell">第三个选项卡子项-2</li><li class="mui-table-view-cell">第三个选项卡子项-3</li><li class="mui-table-view-cell">第三个选项卡子项-4</li><li class="mui-table-view-cell">第三个选项卡子项-5</li></ul>';
//				var item2 = document.getElementById('item2mobile');
//				var item3 = document.getElementById('item3mobile');
//				document.getElementById('slider').addEventListener('slide', function(e) {
//					if (e.detail.slideNumber === 1) {
//						if (item2.querySelector('.mui-loading')) {
//							setTimeout(function() {
//								item2.querySelector('.mui-scroll').innerHTML = html2;
//							}, 500);
//						}
//					}
//				});



		})(mui,jQuery);
	}
	
	/**
	 * 更新列表
	 */
	owner.upList = function(url) {
		vm.page = 1;
		vm.items = [];
		vm.listPage(url);
	};
}(mui, window.page = {}));