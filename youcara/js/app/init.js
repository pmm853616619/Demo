var ApiRootHost = 'http://app.server.youcara.com/';
var ImageHost = '';
var apptpl = '/page/';

mui.plusReady(function() {
    /**
     * 初始化应用
     */
    plus.webview.currentWebview().setStyle({scrollIndicator: 'none'});
    plus.navigator.setStatusBarStyle(config.get('barTextColor'));
    mui.init({
        swipeBack: false,
        statusBarBackground: config.get('barColor')
    });

    /**
     * 退出程序
     */
    var first = null;
    mui.back = function() {
        var current = plus.webview.currentWebview();
        if(current.id == plus.webview.getLaunchWebview().id){
            if (!first) {
                first = new Date().getTime();
                mui.toast('再按一次退出应用');
                setTimeout(function() {
                    first = null;
                }, 1000);
            } else {
                if (new Date().getTime() - first < 1000) {
                    plus.runtime.quit();
                }
            }
        }else{
            current.close();
        }
    };

    /**
     * 打开新窗口
     */
    $('body').on('tap', '[data-url]', function (e) {
        e.stopPropagation();
        var url = $(this).data('url');
        var data = $(this).data('params');
        if (data) {
            data = eval('(' + data + ')');
        }
        windows.open(url, data);
        return false;
    });

    /**
     * 关闭当前页面
     */
    $('body').on('tap', '[data-back]', function () {
        mui.currentWebview.close();
        return false;
    });

    /**
     * 绑定组件
     */
    $("[data-dux]").each(function () {
        var data = $(this).data(), name = data['dux'], names = name.split('-', 2);
        window[names[0]][names[1]](this, data);
    });

});