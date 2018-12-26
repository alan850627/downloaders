const helper = require('./helper');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
const rimraf = require('rimraf');

var dir;
var outFileName;
var baseURL;
var chunkFile;
var chunks = [];
/* Helper Functions */
function getPlaylist(input) {
	/* Also get the track name */
	let re0=/"page-title">.+?Frontera Project/
	let re1=/.+?\|/
	outFileName = re0.exec(input)[0].replace(/"page-title">/, '').replace('| Frontera Project', '').trim() + '.mp3';

	let re2=/playlist_source.+?playlist.m3u8"/
	let re3=/https:.+mp3/
	/* Up the quality to 3000 */
	baseURL = re3.exec(re2.exec(input))[0].replace(/\\/g, '')
	helper.download(`${baseURL}/playlist.m3u8`, `${dir}/.tmp/playlist.m3u8`, getChunkList);
}

function getChunkList() {
	fs.readFile(`${dir}/.tmp/playlist.m3u8`, 'utf8', function(err, data) {
		if (err) throw err;
		let re4=/chunklist_.+m3u8/
		chunkFile=re4.exec(data)[0];
		helper.download(`${baseURL}/${chunkFile}`, `${dir}/.tmp/${chunkFile}`, getChunks);
	});
}

function getChunks() {
	fs.readFile(`${dir}/.tmp/${chunkFile}`, 'utf8', function(err, data) {
		if (err) throw err;
		let re5=/media_.+/g
		while ((regexResult = re5.exec(data)) !== null) {
			chunks.push(regexResult[0]);
		}
		downloadChunks();
	});
}

function downloadChunks() {
	if (chunk = chunks.pop()) {
		helper.download(`${baseURL}/${chunk}`, `${dir}/.tmp/${chunk}`, downloadChunks)
	} else {
		join();
	}
}

function join() {
	try {
		console.log('Joining with ffmpeg');
		new ffmpeg(`${dir}/.tmp/${chunkFile}`, function (err, video) {
			if (!err) {
				video.addCommand('-acodec', 'copy')
				video.save(`${dir}/"${outFileName}"`, function (error, file) {
					if (!error) console.log('audio file: ' + file);
					else console.log(error);
					clean();
				});
			} else {
				console.log('Error: ' + err);
			}
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}
}

function clean() {
	rimraf.sync(`${dir}/.tmp/`)
}

if (process.argv[2]) {
	dir = process.argv[3] || './downloads';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	if (!fs.existsSync(`${dir}/.tmp`)){
		fs.mkdirSync(`${dir}/.tmp`);
	}

	helper.getPage(process.argv[2], getPlaylist);

} else {
	console.log("Give me an URL to download from!")
}