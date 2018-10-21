const Device = require('point-device-sdk')
const delay = require('../../hlp/delay')

class Sensor {
  constructor(frequency) {
    this._bound = []
    this.frequency = frequency
    this.tracking = false
  }

  get() {
    return true
  }

  async track(loop) {
    if (loop && this.tracking === false) { return }
    this.tracking = true

    let data = await this.get()

    for (var n in this._bound) {
      await this._bound[n](data)
    }

    if (this.frequency) {
      await delay(this.frequency)
    }

    this.track(true)
  }

  on(func) {
    this._bound.push(func)
  }

  pause() {
    this._bound = []
    this.tracking = false
  }

  reset() {
    this._bound = []
  }
}

module.exports = Sensor
