module.exports = async function () {
  let conn = await this.network.connected(5000)
  this.leds.status('on', true)
  this.config.init()

  conn && this.leds.status('network')

  await this.status.update('on')
  this.leds.status('ready')
}
