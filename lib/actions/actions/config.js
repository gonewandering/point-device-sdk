module.exports = async function (data) {
  await this.status.update('updating')
  await this.config.set(data.data)
  await this.status.update('ready')
}
