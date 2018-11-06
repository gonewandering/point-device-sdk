module.exports = async function () {
  this.status.update('track')
  this.config.set('status', 'track')

  let delay = this.config.get('frequency') || 0
  this.sensor.frequency = delay
  this.sensor.track()
  await this.delay(delay)

  this.sensor.on(res => {
    let activeSchemes = this.config.get('schemes')

    for(var s in activeSchemes) {
      let scheme = activeSchemes[s]
      this.schemes[scheme.name].bind(this)(res, scheme)
    }
  })
}
