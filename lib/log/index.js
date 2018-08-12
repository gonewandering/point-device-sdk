const Stream = require('../stream')
const _ = require('underscore')
const moment = require('moment')

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
    // 2016-05-19 10:38:47.046465

    data.timestamp = moment().utc().format('YYYY-MM-DD hh:mm:ss.SSSS')

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
