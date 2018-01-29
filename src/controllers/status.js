'use strict'
// Import Packages
const path = require('path')
const cache = require(path.join(__dirname, '../cache'))
// const winston = require('winston')

async function getRequests () {
  const requests = await cache.get('requests')
  return requests
}

async function getPastMinute () {
  const ts = parseInt(Date.now().toString().slice(0, 10)) - 60
  const requests = await cache.get('requests:count:' + ts.toString())
  return requests
}

async function getPastHour () {
  const ts = parseInt(Date.now().toString().slice(0, 10)) - 60 * 60
  const requests = await cache.get('requests:count:' + ts.toString())
  return requests
}

async function getPastDay () {
  const ts = parseInt(Date.now().toString().slice(0, 10)) - 60 * 60 * 24
  const requests = await cache.get('requests:count:' + ts.toString())
  return requests
}

module.exports = async (ctx, next) => {
  const pkg = require(path.join('../../', 'package'))
  const now = await getRequests()
  const pastMinute = await getPastMinute()
  const pastHour = await getPastHour()
  const pastDay = await getPastDay()
  ctx.body = {
    name: pkg.name,
    version: pkg.version,
    // message: 'Love us? donate at https://a632079.me/donate',
    // website: 'https://a632079.me',
    requests: {
      all: parseInt(now),
      pastMinute: parseInt(now) - parseInt(pastMinute),
      pastHour: parseInt(now) - parseInt(pastHour),
      pastDay: parseInt(now) - parseInt(pastDay)
    },
    // feedback: {
    //   a632079: 'a632079@qq.com'
    // },
    copyright: pkg.name' © ' + new Date().getFullYear() + ' All Rights Reserved. Powered by Teng-koa ( https://github.com/a632079/teng-koa ).',
    now: new Date(Date.now()).toString(),
    ts: Date.now()
  }
}
