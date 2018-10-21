const Actions = require('./lib/actions')
const Status = require('./lib/status')
const Command = require('./lib/command')
const Config = require('./lib/config')
const Log = require('./lib/log')
const Sensor = require('./lib/sensor')
const Stream = require('./lib/stream')

const mid = require('./lib/mid')()
const network = require('./lib/network')
const files = require('./lib/files')

const exec = require('./hlp/exec')
const delay = require('./hlp/delay')

class Device {
  constructor(opts) {
    opts = opts || {}

    this.mid = mid
    this.network = network
    this.exec = exec
    this.delay = delay
    this.files = files

    this.schemes = opts.schemes
    this.sensors = opts.sensors

    this.configPath = opts.configPath

    this.config = new Config(this.configPath)

    this.command = new Command()
    this.status = new Status()
    this.log = new Log()

    this.actions = new Actions(this)

    this.config.set('availableSchemes', Object.keys(this.schemes))
  }

  async init() {
    await this.actions.on()

    let sensor = this.config.get('sensor')

    if (sensor) {
      this.sensor = new this.sensors[sensor]()
    }

    let status = this.config.get('status')
    status && this.actions[status]()
  }
}

Device.files = files
Device.mid = mid
Device.Sensor = Sensor
Device.Stream = Stream
Device.command = new Command()
Device.status = new Status()
Device.exec = exec
Device.delay = delay

module.exports = Device
