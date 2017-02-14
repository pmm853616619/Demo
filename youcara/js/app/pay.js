/**
 * 支付模块
 */
(function (mui, owner) {
	/**
	 * alipay
	 **/
	owner.alipay = function(dir, params, callback, errorCallback) {
		//获取支付通道
		var channel=null;
		plus.payment.getChannels(function(channels){
			for (var i in channels) {
				if(channels[i].id == 'alipay') {
					channel = channels[i];
                    checkServices(channel);
				}
           }
		},function(e){
			plus.nativeUI.alert("获取支付通道失败："+e.message);
		});
		//发起支付请求
		http.post(dir, params, function(msg, info) {
			plus.payment.request(channel, info, function(result){
            		if(typeof(callback) == "function"){ 
					callback();
				}
            },function(error){
            		tools.debug(error);
            		plus.nativeUI.toast("支付失败，请重新操作！");
            		if(typeof(errorCallback) == "function"){ 
					errorCallback();
				}
            		return false;
            });
		});
		//服务检测
		function checkServices(pc) {
        		if (!pc.serviceReady) {
        			var txt = null;
                switch (pc.id) {
                		case "alipay":
                    		txt = "检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
                    		break;
                    default:
                    		txt = "系统未安装“" + pc.description + "”服务，无法完成支付，是否立即安装？";
                    		break;
                }
                plus.nativeUI.confirm(txt, function(e) {
                    if (e.index == 0) {
                    		pc.installService();
                		}
            		}, pc.description);
        		}
        }
	};
}(mui, window.pay = {}));
