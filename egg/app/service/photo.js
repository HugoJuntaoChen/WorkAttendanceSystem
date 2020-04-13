'use strict';
/* eslint-disable */
const Service = require('egg').Service;

class PhotoService extends Service {
    async addPhoto(obj) {
        const {
            app
        } = this;
        let username = obj.username;
        let photo = obj.photo;
        let result = await app.mysql.update('staff', {
            photo: photo
        }, {
            where: {
                username: username
            }
        });
        return result;
    }
    async getPhoto(query) {
        const {
            app
        } = this;
        let username = Object.keys(query)[0];
        let result = await app.mysql.select('staff', {
            where: {
                username: username
            },
            columns: ['photo']
        });
        return result;
    }
}

module.exports = PhotoService;