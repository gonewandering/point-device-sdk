class Sensor {
  constructor(interval) {
    this._bound = []
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
