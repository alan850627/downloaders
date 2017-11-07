const helper = require('./helper');
const fs = require('fs');

var dir;
var i;
var sampleURL;
/* Helper Functions */
function parse(input) {
	var re1=/<img src=".+" height="242px" border="0" alt="Document Image" \/>/g
	var re2=/http:.+\/\d+/g
	/* Up the quality to 3000 */
	sampleURL = re2.exec(re1.exec(input))[0].replace(/\/\d+/, '/3000')
	/* begin download */
	i = 1;
	dir = process.argv[3] || './downloads';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	console.log();
	console.log("Download starting")
	console.log(`Download Location: ${dir}`)
	console.log();
	helper.download(buildURL(i), `${dir}/${helper.pad(i,3)}.jpg`, iterate);
}

function buildURL(page) {
	return sampleURL.replace(/\d+.jp2/, `${helper.pad(page,3)}.jp2`)
}

function iterate() {
	i += 1;
	let newURL = buildURL(i);
	helper.checkUrlExists(newURL, function(exists) {
		if (exists) {
			helper.download(newURL, `${dir}/${helper.pad(i,3)}.jpg`, iterate)
		}
	})
}

if (process.argv[2]) {
	helper.getPage(process.argv[2], parse);
} else {
	console.log("Give me an URL to download from!")
}