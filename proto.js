const dev = require('./index')
const delay = require('./hlp/delay')
var track = false

dev.command.on('on', () => {
  dev.status.send('on')
})

dev.command.on('track', async () => {
  track = true

  dev.status.send('active')

  while (track == true) {
    await delay(1000)
    await dev.log.send({
      value: Math.round(Math.random() * 1000) / 100,
      key: 'not sure'
    })
  }
})

dev.command.on('stop', async () => {
  track = false
  dev.status.send('paused')
})

dev.command.on('off', async () => {
  dev.status.send('off')
})

dev.status.get(status => {
  console.log(status)
})

dev.config.on('update', config => {
  console.log(config)
})

async function run() {
  console.log(`Starting Proto: ${dev.mid}`)
  await dev.command.send(dev.mid, 'on')
  await delay(10000)
  await dev.command.send(dev.mid, 'track')
  await delay(5000)
  await dev.command.send(dev.mid, 'stop')
  await delay(1000)
  await dev.command.send(dev.mid, 'off')
  await delay(3000)
}

run().then(() => {
  process.exit()
})
