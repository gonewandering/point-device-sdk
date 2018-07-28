const status = require('./lib/status')
const command = require('./lib/command')
const config = require('./lib/config')
const Log = require('./lib/log')
const mid = require('./lib/mid')()

class Device {
  constructor() {
    this.id = mid
    this.status = status
    this.command = command
    this.config = config
    this.log = new Log()
  }
}

module.exports = Device
