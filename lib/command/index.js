const Stream = require('../stream')
const MID = require('../mid')()
const _ = require('underscore')

class Command extends Stream {
  constructor() {
    super({
      queue: 'point-device-command'
    })
    
    this.cbs = []
  }

  async send(command, opts) {
    let mid = opts.mid || MID
    opts = opts || {}


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

    return
  }

  on(command, opts, fn) {
    let mid = opts.mid || MID

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
