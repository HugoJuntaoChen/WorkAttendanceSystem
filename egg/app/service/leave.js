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
    async getLeave() {
        const {
            app
        } = this;
        let result = await app.mysql.select('leaveIssues');
        return result;
    }
    async changeLeaveState(leaveData) {
        const {
            app
        } = this;
        const row = leaveData.row;
        const options = {
            where: leaveData.options
        };
        let result = await app.mysql.update('leaveIssues',
            row, options
        );
        return result;
    }
}

module.exports = LeaveService;