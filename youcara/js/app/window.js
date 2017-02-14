/**
 * 窗口管理
 */
(function(mui, owner) {
	/**
	 * 打开窗口
	 **/
	owner.open = function(url, params) {
		if (typeof(params) == "undefined") {
			params = {};
		}
		mui.plusReady(function() {
			 tools.debug('open:' + url);
			if (url !== 'index') {
				var urlArray = url.split("/");
				var loginStatus = user.check();
				if ($.inArray(urlArray[0], config.get('noLoginPages')) == -1 && !loginStatus) {
					tools.debug('权限错误');
					url = 'login/login';//判断是否登录。没有登录所有跳转全部跳转到登录界面
				}else{
					auth.getInfo();
				}
				var id = url;
				url = apptpl + url + '.html';
				mui.openWindow({
					url: url,
					id: id,
					styles: {
						top:"0",//子页面顶部位置
						bounce: 'vertical',
					},
					show: {
						autoShow:true,//页面loaded事件发生后自动显示，默认为true
                      	aniShow:"lide-in-right",//页面显示动画，默认为”slide-in-right“；
                      	duration:100//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					},
					waiting: {
						autoShow: true
					},
					extras: params
				});
			} else {
				var allPage = plus.webview.all();
				for (var i = 0; i < allPage.length; i++) {
					if (allPage[i].id !== plus.webview.getLaunchWebview().id) {
						plus.webview.close(allPage[i]);
					}
				}
			}
		});
	};
	
	/**
	 * 参数接收
	 */
	owner.receive = function(action, callback) {
		mui.plusReady(function() {
			window.addEventListener(action, function(event) {
				tools.debug('receive : ' + action);
				var info = event.detail ? event.detail : {
					data: null
				};
				callback(info.data);
			});
		});
	};
	/**
	 * 参数传递
	 */
	owner.send = function(winId, action, data) {
		mui.plusReady(function() {
			tools.debug('send : ' + winId);
			mui.fire(plus.webview.getWebviewById(winId), action, {
				data: data
			});
		});
	}
	
	/**
	 * 绑定数据
	 */
	owner.bindData = function(data, type) {
		type = type || 0;
		$.each(data, function(key, value){
			if(!type){
				$('#bind-' + key).val(value);
			}else{
				$('#bind-' + key).html(value);
			}
		});
	}		
}(mui, window.windows = {}));