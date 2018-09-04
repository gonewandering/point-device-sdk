module.exports = async function () {
  this.leds.status('on', true)
  await this.status.update('on')
  this.config.init()

  let conn = await this.network.connected(5000)

  if (conn) {
    this.leds.status('network')
  }

  this.command.on('*', (cmd, data) => {
    console.log(cmd)
    this.actions[cmd] && this.actions[cmd].bind(self)(data)
  })

  await this.status.update('ready')
  this.leds.status('ready')

  console.log(`Device ${this.mid}: ON`)
}
