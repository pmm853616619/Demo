/**
 * 旅游认证
 */
(function(mui, owner) {
	/**
	 * 获取信息 
	 */
	owner.getInfo = function(callback) {
		var data = database.get('autoUser');
		if(!data) {
			owner.update(callback);
		}
		var time = parseInt(new Date().getTime() / 100);
		if (data.time + config.get('uptime') < time) {
			owner.update(callback);
		} else {
			var info = data.info;
			if (typeof(callback) == "function") {
				callback(info);
			}
		}
	};
	/**
	 * 更新各项认证资料
	 */
	owner.update = function(callback) {
		http.post('api/Auth/getAuth', {}, function(msg, info) {
			database.set('autoUser', {
				info: info,
				time: parseInt(new Date().getTime() / 100)
			});
			if (typeof(callback) == "function") {
				callback(info);
			}
		});
	};
	/**
	 * 清除信息
	 */
	owner.clear = function() {
		database.del('autoUser');
	};
}(mui, window.auth = {}));