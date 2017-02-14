/**
 * 数据库操作
 */
(function (mui, owner) {
    /**
     * 获取数据
     **/
    owner.get = function (key) {
        var jsonStr = window.localStorage.getItem(key.toString());
        return jsonStr ? JSON.parse(jsonStr).data : null;
    };
    /**
     * 保存数据
     */
    owner.set = function (key, val) {
        var value = JSON.stringify({
            data: val
        });
        return window.localStorage.setItem(key.toString(), value);
    };
    /**
     * 删除数据
     */
    owner.del = function (key) {
        return window.localStorage.removeItem(key);
    }

}(mui, window.database = {}));