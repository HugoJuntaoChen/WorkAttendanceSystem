'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class NoticeController extends Controller {
    async postNotice() {
        let query = this.ctx.request.body;
        let result = await this.service.notice.postNotice(query)
        if (result.affectedRows === 1) {
            this.ctx.body = result;
        }
    }
    async getNotice() {
        let result = await this.service.notice.getNotice();
        this.ctx.body = result;
    }
}

module.exports = NoticeController