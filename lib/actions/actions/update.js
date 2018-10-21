module.exports = async function () {
  await this.status.update('updating')
  await this.exec(`cd ${ __dirname }`)
  await this.exec('git pull origin master')
  await this.exec('npm install')
  await this.actions.restart()
}
