const Status = require('./lib/status')
const Command = require('./lib/command')
const Config = require('./lib/config')
const Log = require('./lib/log')

const mid = require('./lib/mid')()
const network = require('./lib/network')
const Stream = require('./lib/stream')

class Device {
  constructor() {
    this.mid = mid
    this.network = network
    this.Stream = Stream

    this.config = new Config()
    this.command = new Command()
    this.status = new Status()
    this.log = new Log()
  }
}
