/**
 * 配置文件
 */
(function (mui, owner) {
    owner.get = function (name) {
        var config = {
            link : '81de98f70f97e7b3f0f87cfb96cd2522',
            barColor: '#EF5350',
            barTextColor: 'UIStatusBarStyleBlackOpaque',
            noLoginPages: ['login'],
            region: '成都市',
            server: 'http://app.server.youcara.com/',
            uptime : 3600
        };
        return config[name];
    }
}(mui, window.config = {}));