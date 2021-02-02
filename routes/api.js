

module.exports.responseOk = (res, data) => {
    data = data || {}
    res.json({
        data: data
    })
}
module.exports.responseError = (res, code = 200, message) => {
    res.status(code).json({
        error: {
            message: message
        }
    })
}