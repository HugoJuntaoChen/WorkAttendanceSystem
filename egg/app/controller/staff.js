'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class StaffController extends Controller {
    async postStaffInfo() {
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
    async getStaffInfo() {
        const {
            ctx,
            service
        } = this;
        let result = await service.staff.getStaffInfo();
        ctx.body = result;
    }
    async staffLogin() {
        const {
            ctx,
            service,
            app
        } = this;
        let staff = ctx.request.body;
        const token = app.jwt.sign({
            username: staff.username,
            password: staff.password,
        }, app.config.jwt.secret, {
            expiresIn: '1800s',
        })
        let result = await service.staff.check(staff);
        ctx.body = result
        ctx.body.token = token;
    }
}

module.exports = StaffController