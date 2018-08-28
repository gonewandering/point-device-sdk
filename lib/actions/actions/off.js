module.exports = async function () {
  await this.status.update('off')
  await this.exec('sudo shutdown -h now')
}
