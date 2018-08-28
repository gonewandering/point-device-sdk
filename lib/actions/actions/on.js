module.exports = async function () {
  let conn = await this.network.connected(5000)
  this.leds.status('on', true)
  this.config.init()

  conn && this.status('network', true)

  this.status('ready', true)
  this.set('ready')
  await this.status.update('on')
}
