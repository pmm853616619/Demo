/**
 * 常用工具
 */
(function (mui, owner) {
    owner.debug = function(msg) {
    		msg = JSON.stringify(msg);
        console.log(msg);
    }

	// 时间
	owner.Udate = function(value , type){
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
	}
}(mui, window.tools = {}));