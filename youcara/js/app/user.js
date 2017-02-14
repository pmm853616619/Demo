/**
 * 用户相关
 */
(function(mui, owner) {
	/**
	 * 设置登录
	 */
	owner.login = function(data) {
		if (!data.uid) {
			plus.nativeUI.toast('授权失败');
			return false;
		}
		database.set('auth', {
			uid: data.uid,
			token: data.token
		});
		database.set('user', {
			info: data.info,
			time: parseInt(new Date().getTime() / 100)
		});
	};
	/**
	 * 获取信息 
	 */
	owner.getInfo = function(callback) {
		var data = database.get('user');
		var time = parseInt(new Date().getTime() / 100);
		// console.log(JSON.stringify(data));
		if (data.time + config.get('uptime')<time){
			owner.update(callback);
		} else {
			var info = data.info;
			if (typeof(callback) == "function") {
				callback(info);
			}
		}
	};
	/**
	 * 更新资料
	 */
	owner.update = function(callback) {
		http.post('api/Account/getUserInfo', {}, function(msg, info) {
			if (!info) {
				owner.getInfo(function(data){
					info = data;	
				});
			}
			database.set('user', {
				info: info,
				time: parseInt(new Date().getTime() / 100)
			});
			//更新页面数据
			windows.send('platform/user', 'update', info);
			windows.send('index', 'update', info);
			auth.update();
			if (typeof(callback) == "function") {
				callback(info);
			}
		});
	};
	/**
	 * 退出登录
	 */
	owner.out = function() {
		database.del('auth');
		database.del('user');
		auth.clear();
	};
	/**
	 * 检测登录
	 */
	owner.check = function() {
		var info = database.get('auth');
		if (!info) {
			return false;
		}
		if (info.uid == 'undefined' || info.token == 'undefined') {
			return false;
		}
		return true;
	}
}(mui, window.user = {}));