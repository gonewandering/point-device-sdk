const Stream = require('./lib/stream')
const Status = require('./lib/status')
const Command = require('./lib/command')
const Config = require('./lib/config')
const Log = require('./lib/log')
const mid = require('./lib/mid')()
const network = require('./lib/network')

exports.mid = mid
exports.status = new Status()
exports.command = new Command()
exports.log = new Log()
exports.config = new Config()

exports.Stream = Stream
