'use strict';
/* eslint-disable */
const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");
let target = ''; //图片存储位置
class photoController extends Controller {
    async uploadImg() {
        const {
            ctx,
            service
        } = this;
        let parts = ctx.multipart({
            autoFields: true
        });

        let stream;
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                ctx.throw('无图片');
                return;
            }
            // 文件名为：时间戳+随机字符串+.文件后缀
            let filename =
                new Date().getTime() +
                Math.random()
                .toString(36)
                .substr(2) +
                path.extname(stream.filename).toLocaleLowerCase();
            // 上传图片的目录
            target = "app/public/staffImg/upload" + filename;
            let writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
        }
        ctx.body = target;
    }
    async save() {
        const {
            ctx,
            service
        } = this;
        const query = ctx.request.body;
        let result = await service.photo.addPhoto(query);
        if (result.affectedRows === 1) {
            ctx.body = result;
        }
    }
    async getPhoto() {
        const {
            ctx,
            service
        } = this;
        const query = ctx.query;
        const result = await service.photo.getPhoto(query);
        ctx.body = result;
    }
}
module.exports = photoController;