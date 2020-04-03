'use strict';
/* eslint-disable */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router,
        controller,
    } = app;
    router.post('/user/login', controller.user.userLogin);
    // router.get('/checktoken', app.jwt, controller.user.checkToken);
    router.post('/noticepost', controller.notice.postNotice)
    router.get('/noticeget', controller.notice.getNotice)
};