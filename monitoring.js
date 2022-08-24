const winston = require('winston'),
  WinstonCloudWatch = require('winston-cloudwatch');
const monitoring = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    })
  ]
});
// if (process.env.NODE_ENV === 'production') {
  const cloudwatchConfig = {
    logGroupName: 'tutorkrub-backend-dev',
    logStreamName: 'tutorkrub-backend-dev',
    awsOptions: {
      credentials: {
        accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
        secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
      },
      region: 'ap-southeast-1',
    },
    messageFormatter: ({ level, message, additionalInfo }) =>    `[${level}] : ${message} \nAdditional Info: ${JSON.stringify(additionalInfo)}}`
  }
  monitoring.add(new WinstonCloudWatch(cloudwatchConfig))
// }
module.exports = monitoring;