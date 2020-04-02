'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class UserController extends Controller {
    async checkLogin() {
        console.log(123);

        let user = this.ctx.request.body;

        let result = await this.service.user.check(user);
        this.ctx.body = result
    }

}

module.exports = UserController;