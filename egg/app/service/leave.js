'use strict';
/* eslint-disable */
const Service = require('egg').Service;

class LeaveService extends Service {
    async addLeave(leaveData) {
        const {
            app
        } = this;
        let result = await app.mysql.insert('leaveIssues',
            leaveData
        );
        return result;
    }

}

module.exports = LeaveService;