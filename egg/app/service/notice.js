'use strict';
/* eslint-disable */
const Service = require('egg').Service;

class NoticeService extends Service {
    async postNotice(notice) {
        const {
            app
        } = this;
        let result = await app.mysql.insert('notice',
            notice
        );
        return result;
    }

    async getNotice() {
        let {
            app
        } = this;
        let result = await app.mysql.select('notice');
        return result;
    }
}

module.exports = NoticeService;