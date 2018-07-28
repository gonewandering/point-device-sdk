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

  send(command) {
    return this.stream.send({
      command: command
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
