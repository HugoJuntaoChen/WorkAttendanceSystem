'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class NoticeController extends Controller {
    async postNotice() {
        const {
            ctx,
            service
        } = this;
        let query = ctx.request.body;
        let result = await service.notice.postNotice(query)
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
    async getNotice() {
        const {
            ctx,
            service
        } = this;
        let result = await service.notice.getNotice();
        ctx.body = result;
    }
}

module.exports = NoticeController