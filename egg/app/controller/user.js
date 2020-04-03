'use strict';
/* eslint-disable */
const Controller = require('egg').Controller;

class UserController extends Controller {
    async userLogin() {
        const {
            ctx,
            service,
            app
        } = this;
        let user = ctx.request.body;
        const token = app.jwt.sign({
            username: user.username,
            password: user.password,
        }, app.config.jwt.secret, {
            expiresIn: '1800s',
        })
        let result = await service.user.check(user);
        ctx.body = result
        ctx.body.token = token;
    }
    async checkToken() {
        const {
            ctx,
            service
        } = this;
        console.log(this.ctx.state.user);
        ctx.body = {
            code: 0,
            msg: 'success'
        }
    }
}

module.exports = UserController;