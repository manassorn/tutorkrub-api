

module.exports.responseOk = (res, data) => {
    data = data || {}
    res.json({
        data: data
    })
}
module.exports.responseError = (res, message) => {
    res.json({
        error: {
            message: message
        }
    })
}