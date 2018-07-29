const Stream = require('../stream')
const mid = require('../mid')()

class Command {
  constructor() {
    this.cbs = {}

    this.stream = new Stream({
      name: 'point-device-command'
    })

    this.stream.get(this.update.bind(this))
    this.get = this.stream.get.bind(this.stream)
  }

  send(cmid, command) {
    // Don't send message to external queue if it's meant for local device
    if (mid == cmid) {
      return {
        data: {
          mid: cmid,
          command: command
        }
      }
    }

    // If it's for another device, send.
    return this.stream.send({
      command: command,
      mid: cmid
    })
  }

  update(msg) {
    let command = msg.data.command

    if (this.cbs[command]) {
      this.cbs[command].forEach(func => {
        return func(msg.data)
      })
    }
  }

  on(eve, func) {
    this.cbs[eve] = this.cbs[eve] || []
    this.cbs[eve].push(func)
  }

  remove(eve, func) {
    this.cbs[eve].forEach((d, i) => {
      if (d == func) {
        delete this.cbs[eve][i]
      }
    })
  }
}

module.exports = new Command()
