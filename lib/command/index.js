const Stream = require('../stream')
const MID = require('../mid')()
const _ = require('underscore')

class Command extends Stream {
  constructor(actions, device) {
    super({
      queue: 'point-device-command'
    })

    this.cbs = {}

    for (var n in actions) {
      this.on(n, actions[n].bind(device))
    }
  }

  async send(command, opts) {
    opts = opts || {}
    let mid = opts.mid || MID

    let data = _.extend({}, {
      command: command
    }, opts.data || {})

    if (!opts.mid || MID === opts.mid) {
      return this.update(mid, {
        data: data
      })
    }

    return await this.set({
      attributes: {
        mid: mid
      },
      data: {
        command: command
      }
    })
  }

  async update(mid, msg) {
    let command = msg.data.command

    if (msg.attributes.mid == mid) {
      if (this.cbs['*']) {
        this.cbs['*'].forEach(async func => {
          return await func(msg.data.command, msg.data)
        })
      }

      if (this.cbs[command]) {
        this.cbs[command].forEach(async func => {
          return await func(msg.data.command, msg.data)
        })
      }
    }
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

    let mid = opts.mid || MID

    if (!this.subscription) {
      this.get({
        fn: this.update.bind(this, mid)
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
