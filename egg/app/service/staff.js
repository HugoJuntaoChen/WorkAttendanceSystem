'use strict';
/* eslint-disable */
const Service = require('egg').Service;

class StaffService extends Service {

    async getStaffInfo() {
        const {
            app
        } = this;
        let result = await app.mysql.select('staff', {
            columns: ['username', 'photo', 'phone', 'email', 'state', 'createDate']
        });
        return result;
    }
    async getSomeStaffInfo(username) {
        const {
            app
        } = this;
        let result = await app.mysql.select('staff', {
            where: username,
            columns: ['phone', 'email']
        });
        return result;
    }
    async changeStaffInfo(query) {
        const {
            app
        } = this;
        let username = query.username;
        let row = query.row;
        let result = await app.mysql.update('staff', row, {
            where: {
                username: username
            }
        })
        return result
    }
    async check(staff) {
        const {
            app
        } = this;
        let result = await app.mysql.get('staff',
            staff
        );
        return result;
    }

}

module.exports = StaffService;