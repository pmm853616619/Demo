/**
 * 网络访问
 */
(function(mui, owner) {
	/**
	 * post数据
	 */
	owner.post = function(dir, data, success, error) {
		owner.go('post', dir, data, success, error);
	};
	/**
	 * get数据
	 */
	owner.get = function(dir, data, success, error) {
		owner.go('get', dir, data, success, error);
	};
	/**
	 * 基本数据
	 */
	owner.data = function(data) {
		var auth = database.get('auth');
		auth = auth ? auth : {};
		var defaultData = {
			auth_link: config.get('link'),
			auth_uid: auth.uid ? auth.uid : null,
			auth_token: auth.token ? auth.token : null
		};
		return $.extend(defaultData, data);
	};
	/**
	 * HTTP访问
	 */
	owner.go = function(type, dir, data, success, error) {
		var data = owner.data(data);
		mui.plusReady(function() {
			tools.debug(dir);
			tools.debug(data);
			mui.ajax(config.get('server') + dir, {
				dataType: 'json',
				type: type,
				timeout: 10000,
				data: data,
				success: function(info) {
					if(info.code!=200){
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast(info.message);
						return false;
					}
					tools.debug(info);
					setTimeout( function(){
						plus.nativeUI.closeWaiting();
					},500);
					if (typeof(success) == "function") {
						success(info.message, info.result);
					}
				},
				error: function(xhr, type, errorThrown) {
					setTimeout( function(){
						plus.nativeUI.closeWaiting();
						tools.debug(xhr.responseText);
					},500);
					var info = JSON.parse(xhr.responseText);
					owner.error(info, xhr.status, error);
				}
			});
		});
	};

	/**
	 * 上传文件
	 */
	owner.upload = function(dir, files, data, success, error) {
		var data = owner.data(data);
		mui.plusReady(function() {
			var task = plus.uploader.createUpload(config.get('server') + dir, {
				method: "POST",
				blocksize: -1,
				priority: 100
			}, function(t, status) {
				tools.debug(t);
				var info = JSON.parse(t.responseText);
				tools.debug(info);
				if (status == 200) {
					plus.nativeUI.toast(info.message);
					if (typeof(success) == "function") {
						success(info.message, info.result);
					}
				} else {
					owner.error(info, status, error);
					return false;
				}
			});
			$.each(data, function(k, value) {
				task.addData(k, value);
			});
			$.each(files, function(k, path) {
				task.addFile(path, {
					key: k
				});
			});
			task.addEventListener("statechanged", function(t, status) {
				switch (t.state) {
					case 1:
						// 开始
						plus.nativeUI.showWaiting();
						//tools.debug('开始上传');
						break;
					case 2:
						// 已连接到服务器
						//tools.debug('已连接到服务器');
						break;
					case 3:
						//上传进度
						var a = t.uploadedSize / t.totalSize * 100;
						//tools.debug("已上传" + parseInt(a) + "%");
						break;
					case 4:
						//上传结束
						//tools.debug(t);
						plus.nativeUI.closeWaiting();
						break;
				}

			});
			task.start();
		});
	};
	/**
	 * 上传照片 
	 */
	owner.images = function(dir, success, error) {
		tools.debug('upload-images');
		mui.plusReady(function() {
			plus.nativeUI.actionSheet({
				cancel: "取消",
				buttons: [{
					title: "拍照"
				}, {
					title: "从相册选取"
				}]
			}, function(e) {
				if (e.index == 1) {
					var cmr = plus.camera.getCamera();
					var res = '400*800';
					var fmt = 'jpg';
					cmr.captureImage(function(path) {
							owner.upload(dir, {
								'file': path
							}, {}, success, error);
						},
						function(error) {}, {
							resolution: res,
							format: fmt
						}
					);
				}
				if (e.index == 2) {
					plus.gallery.pick(function(path) {
						owner.upload(dir, {
							'file': path
						}, {}, success, error);
					}, function(e) {}, {
						filter: "image"
					});
				}
			});
		});
	};
	/**
	 * 错误处理 
	 */
	owner.error = function(info, status, error) {
		var msg = info.message ? info.message : '服务器繁忙,请稍后再试!';
		plus.nativeUI.toast(msg);
		if (status == 401) {
			windows.open('login/login');
		}
		if (typeof(error) == "function") {
			error(msg, status);
		}
	};
}(mui, window.http = {}));