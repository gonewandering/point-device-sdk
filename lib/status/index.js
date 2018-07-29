const Stream = require('../stream')
const mid = require('../mid')()

class Status {
  constructor() {
    this.stream = new Stream({
      name: 'point-device-status'
    })

    this.get = this.stream.get.bind(this.stream)
  }

  send(status) {
    return this.stream.send({
      status: status
    })
  }

  set(status) {
    this._current = status
    return this.send(status)
  }

  get() {
    return this._current
  }
}

module.exports = new Status()
