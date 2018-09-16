module.exports = function () {
  this.leds.status('tracking', false)
  this.leds.set('ready')

  this.config.set('status', 'pause')

  this.status.update('pause')
  this.sensor.pause()
}
