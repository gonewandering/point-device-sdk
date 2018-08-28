const Stream = require('../stream')
const _ = require('underscore')
const moment = require('moment')

const MID = require('../mid')()

class Log extends Stream {
  constructor() {
    super({
      queue: 'point-device-data'
    })

    this.cbs = []
  }

  async send(data, opts) {
    opts = opts || {}
    let mid = opts.mid || MID

    return await this.set({
      mid: mid,
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

    let mid = opts.mid || MID

    if (!this.subscription) {
      this.get({
        fn: this.newMSG.bind(this, mid)
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
