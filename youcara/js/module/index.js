mui.init({
	swipeBack: false
});
mui.plusReady(function() {
//	setTimeout(function() {
//		var array = plus.webview.all();
//		if (array) {
//			for (var i = 0, len = array.length; i < len; i++) {
//				console.log(JSON.stringify(array[i]));
//				// http: //127.0.0.1:8020/youka/index.html#
//				// console.log(array[i].getURL());
//			}
//		}
//	}, 5000)
});

var gallery = mui('#slider');
gallery.slider({
	interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});
//游卡头条
var c, _ = Function;
with(o = document.getElementById("ink_con")) {
		innerHTML += innerHTML;
		onmouseover = _("c=1");
		onmouseout = _("c=0");
	}
(F = _("if(#%32||!c)#++,#%=o.scrollHeight>>1;setTimeout(F,#%32?50:3000);".replace(/#/g, "o.scrollTop")))();

