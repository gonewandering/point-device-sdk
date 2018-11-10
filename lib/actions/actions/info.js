module.exports = async function (data) {
  try {
    await this.status.update('info', config)
    let config = await this.config.get()
  } catch(e) {
    throw new Error('Info request failed')
  }
}
