const PubSub = require(`@google-cloud/pubsub`)
const pubsub = new PubSub()
const moment = require('moment')

const _ = require('underscore')
const MID = require('../mid')()

class Stream {
  constructor(opts) {
    opts = opts || {}
    this.mid = opts.mid || MID
    
    this.name = opts.queue || null
    this.attributes = opts.attributes || {}

    this.subID = `${this.name}-${this.mid}`

    this.topic = pubsub.topic(this.name)
    this.subscription = null
  }

  async createSub() {
    await this.topic.createSubscription(this.subID)
    this.subscription = pubsub.subscription(this.subID)
  }

  handler(fn, msg) {
    try {
      msg.data = JSON.parse(msg.data.toString('utf8'))
      fn(msg)
      msg.ack()
    } catch(e) {
      msg.ack()
    }
  }

  stop() {
    return this.subscription.removeListener('message', handler)
  }

  async get(opts) {
    await this.createSub.bind(this)()
    let handler = this.handler.bind(this, opts.fn)

    this.subscription.on('message', handler)

    return {
      stop: this.stop
    }
  }

  set(opts) {
    let mid = opts.mid || this.mid || MID

    let data = _.extend({
      timestamp: moment().utc().format('YYYY-MM-DD HH:mm:ss.SSSS')
    }, opts.data || {})

    let dataStr = JSON.stringify(data)
    let dataBuffer = Buffer.from(dataStr)
    let attributes = _.extend({mid: mid}, opts.attributes || {})

    return this.topic
      .publisher()
      .publish(dataBuffer, attributes)
      .catch(e => {
        throw new Error('Problem sending message')
      })
  }
}

module.exports = Stream
