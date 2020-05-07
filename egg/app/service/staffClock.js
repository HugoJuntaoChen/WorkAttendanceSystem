'use strict';
/* eslint-disable */
const Service = require('egg').Service;

class staffClockService extends Service {
    async insert(info) {
        const {
            app
        } = this;

        const result = await app.mysql.insert('clockinfo',
            info
        );
        return result;
    }
    async get(info) {
        const {
            app
        } = this;

        const result = await app.mysql.get('clockinfo',
            info
        );
        return result;
    }
    async getAll(username) {
        const {
            app
        } = this;
        const result = await app.mysql.select('clockinfo');
        return result;
    }
    async getSome(info) {
        const {
            app
        } = this;
        const result = await app.mysql.select('clockinfo', {
            where: info,
        });
        return result;
    }
    async update(info, options) {
        const {
            app
        } = this
        const result = await app.mysql.update('clockinfo', info, options);
        return result;
    }
}

module.exports = staffClockService;