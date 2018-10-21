const { Storage } = require(`@google-cloud/storage`)
const MID = require('../mid')()

const storage = new Storage()
const bucket = storage.bucket('taro-device-uploads')

class Files {
  upload(path, remotePath) {
    let options = {
      destination: remotePath,
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          mid: MID
        }
      }
    }

    return bucket.upload(path, options)
  }
}

module.exports = new Files()
