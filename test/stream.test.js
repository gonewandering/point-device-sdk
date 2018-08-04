const Command = require('../lib/command')
const Status = require('../lib/status')
const Log = require('../lib/log')

let log = new Log()
let command = new Command()
let status = new Status()

command.send({
  mid: '721ddee5',
  command: 'track'
}).then(data => {
  console.log('Track Things...')
})

command.on({
  mid: '721ddee5',
  command: 'track',
  fn: (msg) => {
    status.update({
      mid: '721ddee5',
      status: 'tracking'
    }).then(() => {
      log.send({
        mid: '721ddee5',
        data: {
          key: 'temperature',
          value: 'hot'
        }
      })
    })
  }
})

status.on({
  mid: '721ddee5',
  status: '*',
  fn: (msg) => {
    console.log(`Status update: ${msg.data.status}`)
  }
})

log.on({
  mid: '721ddee5',
  fn: (msg) => {
    console.log('Log Received', msg)
  }
})

setTimeout(() => {
  console.log('dog')
}, 100000)
