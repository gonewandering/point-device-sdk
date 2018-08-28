const Actions = require('./lib/actions')
const Status = require('./lib/status')
const Command = require('./lib/command')
const Config = require('./lib/config')
const Log = require('./lib/log')
const Sensor = require('./lib/sensor')
const Stream = require('./lib/stream')

const leds = require('./lib/leds')
const mid = require('./lib/mid')()
const network = require('./lib/network')

const exec = require('./hlp/exec')
const delay = requirE('./hlp/delay')

class Device {
  constructor(opts) {
    !opts.schemes && throw 'No schemes declared'
    !opts.sensor && throw 'No sensors declared'

    this.mid = mid
    this.network = network
    this.leds = leds
    this.schemes = opts.schemes || {}

    this.sensor = new opts.sensor()
    this.config = new Config()
    this.command = new Command()
    this.status = new Status()
    this.log = new Log()

    this.actions = new Actions(this)
    this.init.bind(this)()
  }

  init() {
    let self = this
    this.actions.on()

    this.command.on('*', (cmd, data) => {
      self.actions[cmd] && self.actions[cmd].bind(self)(data)
    })
  }
}

Device.Sensor = Sensor
Device.Stream = Stream
Device.exec = exec
Device.delay = delay

module.exports = Device
