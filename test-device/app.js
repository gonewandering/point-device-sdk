var Device = require('../index')

var device = new Device({
  sensor: require('./sensors/test'),
  schemes: require('./schemes')
})
