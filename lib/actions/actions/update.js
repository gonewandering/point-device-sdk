module.exports = async function () {
  this.leds.set('update1')

  await this.status.update('updating')
  await this.exec(`cd ${ __dirname }`)
  await this.exec('git pull origin master')
  await this.leds.set('update2')
  await this.exec('npm install')
  await this.leds.set('update3')
  await this.status.update('update-complete')

  await this.actions.restart()
}
