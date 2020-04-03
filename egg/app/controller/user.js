'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class UserController extends Controller {
    async userLogin() {
        let user = this.ctx.request.body;
        const token = this.app.jwt.sign({
            username: user.username,
            password: user.password,
        }, this.app.config.jwt.secret, {
            expiresIn: '1800s',
        })
        let result = await this.service.user.check(user);
        this.ctx.body = result
        this.ctx.body.token = token;
    }
    async checkToken() {
        console.log(this.ctx.state.user);
        this.ctx.body = {
            code: 0,
            msg: 'success'
        }
    }
}

module.exports = UserController;