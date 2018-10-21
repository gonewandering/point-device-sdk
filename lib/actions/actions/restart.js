module.exports = async function () {
  await this.status.update('restart')
  await this.exec('sudo reboot')
}
