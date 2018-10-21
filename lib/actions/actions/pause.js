module.exports = function () {
  this.config.set('status', 'pause')

  this.status.update('pause')
  this.sensor.pause()
}
