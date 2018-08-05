const dev = require('./index')
const delay = require('./hlp/delay')
var track = false

console.log(dev.config)

dev.command.on('on', (data) => {
  dev.status.update('on')
})

dev.command.on('config', async (cmd, msg) => {
  await dev.config.set(msg.config)
  dev.status.update('config updated')
})

dev.command.on('track', async () => {
  track = true

  dev.status.update('active')

  while (track == true) {
    await delay(1000)

    await dev.log.send({
      value: Math.round(Math.random() * 1000) / 100,
      event: 'rando'
    })
  }
})

dev.command.on('stop', async () => {
  track = false
  dev.status.update('paused')
})

dev.command.on('off', async () => {
  dev.status.update('off')
})

dev.status.on('*', status => {
  console.log('Status updated: ', status)
})

dev.log.on(msg => {
  console.log(msg.data)
})

async function run() {
  console.log(`Starting Proto: ${dev.mid}`)
  await dev.command.send('on')
  await delay(1000)
  await dev.command.send('config', {
    data: {
      config: {
        location: 'rochester'
      }
    }
  })
  await delay(1000)
  console.log(`Config set to: `, dev.config._config)
  await delay(500)
  await dev.command.send('track')
  await delay(5000)
  await dev.command.send('stop')
  await delay(1000)
  await dev.command.send('off')
  await delay(3000)
}

run().then(() => {
  process.exit()
})
