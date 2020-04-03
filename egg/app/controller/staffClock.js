'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class StaffClockController extends Controller {
    async insertClockStart() {
        const {
            ctx,
            service
        } = this;
        const info = ctx.request.body;
        const result = await service.staffClock.insert(info);
        ctx.body = result
    }
    async getClock() {
        const {
            ctx,
            service
        } = this;
        const info = ctx.query;
        const result = await service.staffClock.get(info);
        ctx.body = result
    }
    async getAllClock() {
        const {
            ctx,
            service
        } = this;
        const result = await service.staffClock.getAll();
        ctx.body = result
    }
    async getSomeClock() {
        const {
            ctx,
            service
        } = this;
        const info = ctx.query;
        const result = await service.staffClock.getSome(info);
        ctx.body = result
    }
    async updateClockEnd() {
        const {
            ctx,
            service
        } = this;
        const info = ctx.request.body.info;
        const options = ctx.request.body.options;
        const result = await service.staffClock.update(info, options)
        ctx.body = result;
    }
}

module.exports = StaffClockController;