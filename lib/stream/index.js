const PubSub = require(`@google-cloud/pubsub`)
const mid = require('../mid')()

const pubsub = new PubSub()

class Stream {
  constructor(options) {
    if (!options.name) {
      throw 'No Name Provided'
      return
    }

    this.name = options.name
    this.sub = this.name + '-device-' + mid
  }

  async get(msgHnd) {
    console.log(this.name, this.sub, 'test')
    await pubsub
      .topic(this.name)
      .createSubscription(this.sub)
      .catch(() => { console.log('Fail', this.name, this.sub) })

    let sub = pubsub.subscription(this.sub)

    let handler = msg => {
      if (msg.attributes.mid != mid) { return }

      try {
        msg.data = JSON.parse(msg.data.toString('utf8'))
        msgHnd(msg)
        msg.ack()
      } catch(e) {
        console.log('Bad JSON')
        msg.ack()
      }
    }

    sub.on('message', handler)

    return {
      stop: () => {
        return sub
          .removeListener('message', handler)
      }
    }
  }

  send(data) {
    let topic = pubsub.topic(this.name)

    let attr = {
      mid: mid
    }

    let dataStr = JSON.stringify(data)
    let dataBuffer = Buffer.from(dataStr)

    return topic
      .publisher()
      .publish(dataBuffer, attr)
  }
}

module.exports = Stream
