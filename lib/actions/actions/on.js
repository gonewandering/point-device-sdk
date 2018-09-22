module.exports = async function () {
  this.leds.status('on', true)
  await this.status.update('on')

  await this.config.init()

  let conn = await this.network.connected(5000)

  if (conn) {
    this.leds.status('network')
  }

  this.command.on('*', async (cmd, data) => {
    if (this.actions[cmd]) {
      await this.actions[cmd].bind(this)(data)
    }
  })

  await this.status.update('pause')
  this.leds.status('ready')

  console.log(`Device ${this.mid}: ON`)
}
