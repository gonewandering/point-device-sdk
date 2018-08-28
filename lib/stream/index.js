const PubSub = require(`@google-cloud/pubsub`)
const pubsub = new PubSub()

const _ = require('underscore')
const mid = require('../mid')()

class Stream {
  constructor(opts) {
    opts = opts || {}
    this.name = opts.queue || null
    this.attributes = opts.attributes || {}

    this.subID = `${this.name}-${mid}`

    this.topic = pubsub.topic(this.name)
    this.subscription = null
  }

  async createSub() {
    await this.topic.createSubscription(this.subID)
        .catch(() => { console.log('Fail', this.name, this.subID) })
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

  set(mid, opts) {
    let dataStr = JSON.stringify(opts.data)
    let dataBuffer = Buffer.from(dataStr)
    let attributes = _.extend({mid: mid}, opts.attributes || {})

    return this.topic
      .publisher()
      .publish(dataBuffer, attributes)
  }
}

module.exports = Stream
