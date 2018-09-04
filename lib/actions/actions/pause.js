module.exports = function () {
  this.leds.status('tracking', false)
  this.leds.set('ready')

  this.status.update('ready')
  this.sensor.pause()
}
