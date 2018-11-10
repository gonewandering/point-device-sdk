module.exports = async function () {
  try {
    await this.status.update('off')
    await this.exec('sudo shutdown -h now')
  } catch(e) {
    throw new Error('Problem with Off')
  }
}
