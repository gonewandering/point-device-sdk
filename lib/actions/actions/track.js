module.exports = function () {
  let activeSchemes = this.config.get('schemes')

  this.leds.status('tracking', true)
  this.leds.set('tracking')
  this.status.update('tracking')

  this.sensor.track()

  this.sensors.on(res => {
    for(var s in activeSchemes) {
      let scheme = activeSchemes[s]
      this.schemes[scheme.name](res, scheme)
    }
  })
}
