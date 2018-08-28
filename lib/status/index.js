const Stream = require('../stream')
const _ = require('underscore')
const MID = require('../mid')()


class Status extends Stream {
  constructor() {
    super({
      queue: 'point-device-status'
    })

    this.cbs = []
  }

  async update(status, opts) {
    opts = opts || {}
    let mid = opts.mid || MID

    opts.status = status

    this._current = status

    return await this.set({
      attributes: {
        mid: mid
      },
      data: opts
    })
  }

  async newMSG(mid, msg) {
    let status = msg.data.status

    if (msg.attributes.mid == mid) {
      if (this.cbs['*']) {
        this.cbs['*'].forEach(async func => {
          return await func(msg.data.status)
        })
      }

      if (this.cbs[status]) {
        this.cbs[status].forEach(async func => {
          return await func(msg.data.status)
        })
      }
    }

    return
  }

  on(status, opts, fn) {
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

    this.cbs[status] = this.cbs[status] || []
    this.cbs[status].push(opts.fn.bind(this))
  }

  remove(eve, func) {
    this.cbs[eve].forEach((d, i) => {
      if (d == func) {
        delete this.cbs[eve][i]
      }
    })
  }
}

module.exports = Status
