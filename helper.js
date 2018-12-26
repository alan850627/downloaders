const request = require('request');
const fs = require('fs');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

exports.getPage = function(url, callback) {
  request(url, function (error, response, body) {
    callback(body)
  })
}

exports.pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.download = function(url, dir, callback) {
  console.log(url)
  request(url, function (error, response, body) {
    callback()
  }).pipe(fs.createWriteStream(dir))
}

exports.checkUrlExists = function(host,callback) {
  request(host, function (error, r, body) {
    if (body) {
      callback(true)
    }
    callback(false)
  })
}