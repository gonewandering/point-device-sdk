const Stream = require('../stream')
const mid = require('../mid')()

class Log {
  constructor() {
    this.stream = new Stream({
      name: 'point-data'
    })
  }

  send(data) {
    data.mid = mid
    return this.stream.send(data)
  }
}

module.exports = Log
