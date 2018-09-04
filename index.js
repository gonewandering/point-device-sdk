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
const delay = require('./hlp/delay')

/**
Device Class

Allows for the creation of a "sofware" device running point. Assumes the rasp pi + sensor hat base hardware for development
**/

class Device {
  constructor(opts) {
    opts = opts || {}

    this.mid = mid
    this.network = network
    this.leds = leds
    this.exec = exec
    this.delay = delay

    this.schemes = opts.schemes || {}
    this.sensor = opts.sensor && new opts.sensor()

    this.config = new Config()
    this.command = new Command()
    this.status = new Status()
    this.log = new Log()

    this.actions = new Actions(this)
  }
}

Device.mid = mid
Device.Sensor = Sensor
Device.Stream = Stream
Device.command = new Command()
Device.status = new Status()
Device.exec = exec
Device.delay = delay

module.exports = Device
