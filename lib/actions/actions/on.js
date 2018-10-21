module.exports = async function () {
  await this.status.update('on')

  await this.config.init()

  let conn = await this.network.connected(5000)

  if (conn) {}

  this.command.on('*', async (cmd, data) => {
    if (this.actions[cmd]) {
      await this.actions[cmd].bind(this)(data)
    }
  })

  await this.status.update('pause')

  console.log(`Device ${this.mid}: ON`)
}
