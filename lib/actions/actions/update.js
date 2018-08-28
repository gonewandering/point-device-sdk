module.exports = async function () {
  leds.set('update1')

  await dev.status.update('updating')
  await exec(`cd ${ __dirname }`)
  await exec('git pull origin master')
  await leds.set('update2')
  await exec('npm install')
  await leds.set('update3')
  await dev.status.update('update-complete')

  await actions.restart()
}
