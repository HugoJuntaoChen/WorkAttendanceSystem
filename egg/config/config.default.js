/* eslint valid-jsdoc: "off" */

'use strict';
/* eslint-disable */
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1585816544802_4445';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: ["http://localhost:8080"]
    };
    config.cors = {
        origin: "*",
        allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
    };
    config.mysql = {
        client: {
            // host
            host: "localhost",
            // 端口号
            port: "3306",
            // 用户名
            user: "root",
            // 密码
            password: "123456",
            // 数据库名å
            database: "test"
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false
    };
    return {
        ...config,
        ...userConfig,
    };
};