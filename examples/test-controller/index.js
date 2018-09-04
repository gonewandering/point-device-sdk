var Device = require('../../index')
var device = new Device()

async function init() {
  console.log('on', Device.mid)
  await device.delay(1000)
  device.command.send('track')
  console.log('tracking')
  await device.delay(10000)
  device.command.send('pause')
  console.log('pause')
}

init()
