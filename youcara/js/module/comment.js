/**
 * 评论插件
 */
$('#service,#auto,#price').raty({
	starOff    : '../../images/star-off.png',
	starOn     : '../../images/star-on.png',
	click: function(score, evt) {
	    $("#"+this.id +'_vue').val(score);
	}
});
var vm = new Vue({
		el: '#page',
		config:{debug:true},
		data: {
			items: [],
		},
		methods:{
			commentSubmit:function(){
				var formData = form.getFormData("#form");
				http.post('api/User/setComment', formData, function(msg, d){
					console.log(JSON.stringify(d));
					plus.nativeUI.toast(msg);
					var main = plus.webview.getWebviewById("platform/order/carry-out");
						var jus = '';
						mui.fire(main,"initCart",{
							jus:true
		                });
					mui.currentWebview.close();
				});
			},
		}
});
// getTravelTaskPriceInfo
mui.plusReady(function() {
	var value = plus.webview.currentWebview();
	vm.items = {"order_id":value.info_id,"driver_id":value.driver_id};
});