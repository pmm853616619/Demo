/**
 * 表单提交
 */
(function(mui, owner) {
	/**
	 * 绑定表单
	 * @param $el
	 * @param config
	 */
	owner.bind = function($el, config,callback) {
		mui.plusReady(function() {
			$($el).on('tap', '[data-submit]', function() {
				plus.nativeUI.showWaiting();//显示原生等待框
				var data = owner.getFormData($el);
				http.post($($el).attr('action'), data, function(msg, info) {
					if (typeof(callback) == "function") {
						callback(info.message, info.result);
					}
					plus.nativeUI.closeWaiting();
					plus.nativeUI.toast(msg);
					console.log('sdfsdadf');
					var success = $($el).data('success');
					if (success) {
						window[success](msg, info);
					}
				}, function(msg, status) {
					plus.nativeUI.closeWaiting();
					var error = $($el).data('error');
					if (error) {
						window[error](msg, status);
					}
				});
			});
		});
	};
	/**
	 * 获取表单数组
	 * @param el
	 * @returns
	 */
	owner.getFormData = function(el) {
	   var o = {};    
	   var a = $(el).serializeArray();    
	   $.each(a, function() {
	       if (o[this.name]) {
	           if (!o[this.name].push) {
	               o[this.name] = [o[this.name]];
	           }
	           o[this.name].push(this.value || '');
	       } else {    
	           o[this.name] = this.value || '';
	       }
	   });
	   tools.debug(o);
	   return o;
	};

}(mui, window.form = {}));