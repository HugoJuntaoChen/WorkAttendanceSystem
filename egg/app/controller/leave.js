'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class LeaveController extends Controller {
    async addLeave() {
        const {
            ctx,
            service,
            app
        } = this;
        const leaveData = ctx.request.body;

        const result = await service.leave.addLeave(leaveData);
        ctx.body = result
    }
    async getLeave() {
        const {
            ctx,
            service
        } = this;
        let result = await service.leave.getLeave();
        ctx.body = result;
    }
    async changeLeaveState() {
        const {
            ctx,
            service,
            app
        } = this;
        const leaveData = ctx.request.body;
        const result = await service.leave.changeLeaveState(leaveData);
        ctx.body = result
    }
}

module.exports = LeaveController;