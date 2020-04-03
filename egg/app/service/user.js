'use strict';
/* eslint-disable */
const Service = require('egg').Service;

class UserService extends Service {
    async check(user) {
        const {
            app
        } = this;
        let result = await app.mysql.get('user',
            user
        );
        return result;
    }
}

module.exports = UserService;