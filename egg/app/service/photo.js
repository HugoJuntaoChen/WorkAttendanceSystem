'use strict';
/* eslint-disable */
const Service = require('egg').Service;

class PhotoService extends Service {
    async addPhoto(obj) {
        const {
            app
        } = this;
        let result = await app.mysql.insert('photo',
            obj
        );
        return result;
    }
    async getPhoto(query) {
        const {
            app
        } = this;
        let result = await app.mysql.select('photo', {
            where: query,
            columns: ['address']
        });
        return result;
    }
}

module.exports = PhotoService;