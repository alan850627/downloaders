const fetch = require('node-fetch');
const fs = require('fs');
const helper = require('./helper');

const argv = require('yargs')
    .usage('Usage: $0 -d [doc-id] -s [start-page] -o [out-folder]')
    .demandOption(['d'])
    .argv;

const BASE_DOWNLOAD_URL_BEGIN = 'https://www.sikorski.de/zine/php/services/view.php?doc='
const BASE_DOWNLOAD_URL_END = '&format=pdf&subfolder=&page='

async function main (docId, start, dir) {
  let i = start
  let pageRes = await fetch(`${BASE_DOWNLOAD_URL_BEGIN}${docId}${BASE_DOWNLOAD_URL_END}${i}`)
  let pageBuff = await pageRes.buffer()

  while (pageRes.ok && !pageBuff.toString().includes('Error:')) {
    const fileName = `${helper.pad(i,3)}.pdf`
    fs.writeFileSync(`${dir}/${fileName}`, pageBuff)
    console.log(`${fileName} saved`)
    i += 1
    pageRes = await fetch(`${BASE_DOWNLOAD_URL_BEGIN}${docId}${BASE_DOWNLOAD_URL_END}${i}`)
    pageBuff = await pageRes.buffer()
  }
}


const dir = argv.o || './downloads'
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
const startPage = argv.s || 1

main(argv.d, startPage, dir).catch(err => {
  console.log(err)
})



