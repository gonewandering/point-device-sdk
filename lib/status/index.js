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
}

module.exports = new Status()
