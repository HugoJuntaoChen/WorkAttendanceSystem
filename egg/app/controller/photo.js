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
    async recognition1() {
        const {
            ctx,
            service
        } = this;
        ctx.body = 'hello';
    }
    async recognition() {
        const {
            ctx,
            service
        } = this;
        let staff = ctx.request.body.username;
        let photo = ctx.request.body.data;
        //员工路径
        const staffImg = await service.photo.getPhoto(staff);
        //fr加载员工图片
        const imageByStaff = fr.loadImage(staffImg);
        const detector = fr.FaceDetector()
        const targetSize = 150
        const faceImages = detector.detectFaces(imageByStaff, targetSize)
        faceImages.forEach((img, i) => fr.saveImage(img, ))
        const recognizer = fr.FaceRecognizer()

        trainDataByClass.forEach((faces, label) => {
            const name = classNames[label]
            recognizer.addFaces(faces, name)
        })
        const modelState = recognizer.serialize()
        fs.writeFileSync('model.json', JSON.stringify(modelState))
        const errors = classNames.map(_ => [])
        testDataByClass.forEach((faces, label) => {
            const name = classNames[label]
            console.log()
            console.log('testing %s', name)
            faces.forEach((face, i) => {
                const prediction = recognizer.predictBest(face)
                console.log('%s (%s)', prediction.className, prediction.distance)

                // count number of wrong classifications
                if (prediction.className !== name) {
                    errors[label] = errors[label] + 1
                }
            })
        })

        // print the result
        result = classNames.map((className, label) => {
            const numTestFaces = testDataByClass[label].length
            const numCorrect = numTestFaces - errors[label].length
            const accuracy = parseInt((numCorrect / numTestFaces) * 10000) / 100
            return `${className} ( ${accuracy}% ) : ${numCorrect} of ${numTestFaces} faces have been recognized correctly`
        })
        console.log('result:')
        console.log(result)
        ctx.body = result;
    }
}
module.exports = photoController;