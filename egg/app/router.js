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
    //用户员登陆
    router.post('/user/login', controller.user.userLogin);
    router.post('/staff/login', controller.staff.staffLogin);
    //员工当天打卡情况
    router.get('/staff/getclock', controller.staffClock.getClock);
    //管理员得到所有人的打卡信息
    router.get('/staff/getallclock', controller.staffClock.getAllClock);
    //员工自己打卡信息
    router.get('/staff/getsomeclock', controller.staffClock.getSomeClock);

    //员工上下班打卡
    router.post('/staff/clockstart', controller.staffClock.insertClockStart)
    router.post('/staff/clockoff', controller.staffClock.updateClockEnd)

    //发表通告
    router.post('/noticepost', controller.notice.postNotice)
    router.get('/noticeget', controller.notice.getNotice)

    //请假
    router.post('/staff/addleaveissues', controller.leave.addLeave)
    router.get('/admin/getleave', controller.leave.getLeave)
    router.post('/admin/changeleavestate', controller.leave.changeLeaveState)

    //管理员-员工编辑页 
    router.get('/staff/getstaffinfo', controller.staff.getStaffInfo)

    //员工-修改个人信息
    router.get('/staff/getsomestaffinfo', controller.staff.getSomeStaffInfo)
    router.post('/staff/changestaffinfo', controller.staff.changeStaffInfo)


    //图片新增到服务器
    router.post('/photo/uploadimg', controller.photo.uploadImg);
    //图片保存到数据库
    router.post('/photo/save', controller.photo.save);
    //图片获取
    router.get('/photo/get', controller.photo.getPhoto);


    //测试
    router.post('/api/upload/img', controller.test.uploadImg);
    router.get('/api/getphoto', controller.test.getPhoto);
    router.post('/api/saveimg', controller.test.save)
};