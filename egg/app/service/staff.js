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