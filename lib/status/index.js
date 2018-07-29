const Stream = require('../stream')
const mid = require('../mid')()

class Status {
  constructor() {
    this.stream = new Stream({
      name: 'point-device-status'
    })
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

  get(func) {
    this.stream.get((msg) => {
      func(msg.data.status)
    })
  }
}

module.exports = new Status()
