mui.plusReady(function () {
    /**
     * 默认城市
     */
    if(!database.get('region')) {
        database.set('region', config.get('region'));
    }

});