module.exports = async function (data) {
  let config = await this.config.get()

  await this.status.update('info', config)
}
