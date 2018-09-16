module.exports = function () {
  let activeSchemes = this.config.get('schemes')

  this.leds.status('tracking', true)
  this.leds.set('tracking')
  this.status.update('track')
  this.config.set('status', 'track')

  this.sensor.track()

  this.sensor.on(res => {
    for(var s in activeSchemes) {
      let scheme = activeSchemes[s]
      this.schemes[scheme.name].bind(this)(res, scheme)
    }
  })
}
