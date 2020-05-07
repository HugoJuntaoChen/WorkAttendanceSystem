'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class StaffController extends Controller {
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
    //修改个人信息
    async changeStaffInfo() {
        const {
            ctx,
            service
        } = this;
        let query = ctx.request.body;

        let result = await service.staff.changeStaffInfo(query)
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
    //员工编辑页  获取全部员工信息
    async getStaffInfo() {
        const {
            ctx,
            service
        } = this;
        let result = await service.staff.getStaffInfo();
        ctx.body = result;
    }
    //修改个人信息页 获取当前用户的邮箱、手机号
    async getSomeStaffInfo() {
        const {
            ctx,
            service
        } = this;
        let username = ctx.query;
        let result = await service.staff.getSomeStaffInfo(username);
        ctx.body = result;
    }

    async addStaff() {
        const {
            ctx,
            service
        } = this;
        let query = ctx.request.body;

        let result = await service.staff.addStaff(query)
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
    async addStaffClock() {
        const {
            ctx,
            service
        } = this;
        let query = ctx.request.body;
        let result = await service.staff.addStaffClock(query)
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
    async deleteStaff() {
        const {
            ctx,
            service
        } = this;
        let query = ctx.request.body;

        let result = await service.staff.deleteStaff(query)
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
    async deleteStaffClock() {
        const {
            ctx,
            service
        } = this;
        let query = ctx.request.body;
        let result = await service.staff.deleteStaffClock(query)
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
    async deleteStaffLeave() {
        const {
            ctx,
            service
        } = this;
        let query = ctx.request.body;
        let result = await service.staff.deleteStaffLeave(query)
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
}

module.exports = StaffController