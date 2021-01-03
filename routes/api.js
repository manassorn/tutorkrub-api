

module.exports.responseOk = (res) => {
    res.json({
        data: {}
    })
}
module.exports.responseError = (res, message) => {
    res.json({
        error: {
            message: message
        }
    })
}