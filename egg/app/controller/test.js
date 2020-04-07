'use strict';
/* eslint-disable */
const Controller = require("egg").Controller;
const fs = require("fs");
const path = require("path");
const pump = require("mz-modules/pump");

class testController extends Controller {
    async uploadImg() {
        const {
            ctx,
            service
        } = this;
        let parts = ctx.multipart({
            autoFields: true
        });
        console.log(parts);

        let stream;
        let result;
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                break;
            }
            // 文件名为：时间戳+随机字符串+.文件后缀
            let filename =
                new Date().getTime() +
                Math.random()
                .toString(36)
                .substr(2) +
                path.extname(stream.filename).toLocaleLowerCase();
            // 上传图片的目录
            let target = "app/public/" + filename;
            // let target = "../../../vue/src/assets/" + filename
            console.log(123, target, typeof target);
            let obj = {
                username: 'cjt',
                address: target
            }
            result = await service.photo.addPhoto(obj);
            if (result.affectedRows === 1) {
                let writeStream = fs.createWriteStream(target);
                await pump(stream, writeStream);
            }
        }
        ctx.body = result;
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
module.exports = testController;