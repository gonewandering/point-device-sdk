const Stream = require('../stream')
const mid = require('../mid')()
const _ = require('underscore')

class Command extends Stream {
  constructor(opts) {
    opts = {
      name: 'point-device-command'
    }

    super(opts)

    this.cbs = []
  }

  async send(command, opts) {
    opts = opts || {}

    if (!opts.mid || mid == opts.mid) {
      return this.update(opts.mid || mid, {
        attributes: {
          mid: opts.mid || mid
        },
        data: {
          command: command
        }
      })
    }

    return await this.set({
      attributes: {
        mid: opts.mid || mid
      },
      data: {
        command: command
      }
    })
  }

  async update(mid, msg) {
    let command = msg.data.command

    if (msg.attributes.mid == mid) {
      if (this.cbs[command]) {
        this.cbs[command].forEach(async func => {
          return await func(msg)
        })
      }
    }

    return
  }

  on(command, opts, fn) {
    if (_.isFunction(opts)) {
      opts = {
        fn: opts
      }
    }

    if (fn) {
      opts.fn = fn
    }

    if (!this.subscription) {
      this.get({
        fn: this.update.bind(this, opts.mid || mid)
      })
    }

    this.cbs[command] = this.cbs[command] || []
    this.cbs[command].push(opts.fn.bind(this))
  }

  remove(eve, func) {
    this.cbs[eve].forEach((d, i) => {
      if (d == func) {
        delete this.cbs[eve][i]
      }
    })
  }
}

module.exports = Command
