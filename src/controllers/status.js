'use strict'
const path = require('path')
const cache = require(path.join(__dirname, '../cache'))
const winston = require('winston')
async function getRequests () {
  let requests
  await cache.get('requests')
    .then(request => {
      requests = request
    })
    .catch(err => {
      winston.error(err)
    })
  return requests
}

async function getPastMinute () {
  const ts = parseInt(Date.now().toString().slice(0, 10)) - 60
  let requests
  await cache.get('requests:count:' + ts.toString())
    .then(request => {
      requests = request
    })
    .catch(err => {
      winston.error(err)
    })
  return requests
}
module.exports = {
  status: async (ctx, next) => {
    const now = await getRequests()
    const pastMinute = await getPastMinute()
    ctx.body = {
      requests: {
        all: parseInt(now),
        pastMinute: parseInt(now) - parseInt(pastMinute)
      },
      now: new Date(Date.now()).toString(),
      ts: Date.now()
    }
  }
}
