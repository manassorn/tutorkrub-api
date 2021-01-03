const S3 = require('aws-sdk/clients/s3')

const accessKeyId = 'AKIAQCI45EUQHELA7OXH'
const secretAccessKey = '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'
const bucketName = 'hiscoretutor'


module.exports.upload = (fileName, fileData) => {
    return new Promise((resolve, reject) => {
        const s3 = new S3({
            accessKeyId,
            secretAccessKey
        });
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: fileData,
        };
        s3.upload(params, (err, data) => {
            if (err) {
                console.log('s3 error:', err);
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}