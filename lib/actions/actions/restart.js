module.exports = async function () {
  this.leds.status('ready', false)
  this.leds.status('network', false)
  this.leds.status('on', false)

  await this.status.update('restart')
  await this.exec('sudo reboot')
}
