module.exports = async function (data) {
  await this.config.set(data.data)
}
