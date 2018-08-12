const Stream = require('../stream')
const _ = require('underscore')

const mid = require('../mid')()

class Log extends Stream {
  constructor(opts) {
    opts = {
      name: 'point-device-data'
    }

    super(opts)

    this.cbs = []
  }

  async send(data, opts) {
    opts = opts || {}

    data.timestamp = (new Date()).toISOString()

    return await this.set({
      attributes: {
        mid: opts.mid || mid
      },
      data: data
    })
  }

  async newMSG(mid, msg) {
    if (mid == msg.attributes.mid) {
      this.cbs.forEach(async func => {
        return await func(msg)
      })
    }
  }

  on(opts, fn) {
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
        fn: this.newMSG.bind(this, opts.mid || mid)
      })
    }

    this.cbs.push(opts.fn.bind(this))
  }

  remove(func) {
    this.cbs.forEach((d, i) => {
      if (d == func) {
        delete this.cbs[eve][i]
      }
    })
  }
}

module.exports = Log
