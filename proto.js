const dev = require('./index')
const delay = require('./hlp/delay')
var track = false

dev.command.on('on', () => {
  dev.status.update('on')
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
  console.log('Status updated', status)
})

dev.log.on(msg => {
  console.log(msg.data)
})

async function run() {
  console.log(`Starting Proto: ${dev.mid}`)
  await dev.command.send('on')
  await delay(1000)
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
