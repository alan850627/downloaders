const fs = require('fs');
const helper = require('./helper')

/* Helper Functions */

var arr=[];
var i;
var dir;
function iterate() {
	i += 1;
	if (i < arr.length) {
		helper.download(arr[i], `${dir}/${helper.pad(i,3)}.jpg`, iterate)
	}
}

function parse(input) {
	var re=/https:\/\/b1.culture.ru\/c\/\d+.jpg/g

	/* putting matches into an array */
	i = 0
	do {
		m = re.exec(input);
		if (m) {
			arr[i] = m[0];
			i += 1
		}
	} while (m);
	var pages = i

	/* begin download */
	i = 0;
	dir = process.argv[3] || './downloads';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	console.log();
	console.log(`Total Pages: ${pages}`)
	console.log(`Download Location: ${dir}`)
	console.log();
	helper.download(arr[i], `${dir}/${helper.pad(i,3)}.jpg`, iterate);
}

/* using regex to parse the html to get image links */
if (process.argv[2]) {
	helper.getPage(process.argv[2], parse);
} else {
	console.log("Give me an URL to download from!")
}
