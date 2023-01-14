const { InfluxDB, Point } = require('@influxdata/influxdb-client')


/** Environment variables **/
const url = process.env.MONITORING_INFLUX_URL
const token = process.env.MONITORING_INFLUX_TOKEN
const org = process.env.MONITORING_INFLUX_ORG
const bucket = process.env.MONITORING_INFLUX_BUCKET
const environment = process.env.ENV

const influxDB = new InfluxDB({ url, token })

module.exports.logResponseTime = (req, res, time) => {
  try {
    const writeApi = influxDB.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ 'application_name': 'api', 'environment': environment})

    const point1 = new Point('incoming_http_request')
      .tag('method', req.method)
      .tag('url', req.url)
      .tag('status_code', res.statusCode)
      .floatField('response_time', time)

    // writeApi.writePoint(point1)
    //
    // writeApi.close().then(() => {
    //   console.log('WRITE FINISHED')
    // })
  } catch (e) {
    console.log(e)
  }
}
