var https = require('https');
var fs = require('fs');

/* using regex to parse the html to get image links */
if (process.argv[2]) {
	getPage(process.argv[2]);
} else {
	console.log("Give me an URL to download from!")
}

/* Helper Functions */
function download (arr, i, dir) {
	console.log(arr[i])
	var request = https.get(arr[i], function(response, err) {
		var file = fs.createWriteStream(`${dir}/${pad(i, 3)}.jpg`);
		response.pipe(file);

		i += 1;
		if (i < arr.length) {
			download (arr, i, dir)
		}
	})
}

function getPage(url) {
	var content;
	https.get(url, function(res, err) {
		res.on('data', (d) => {
		    content += d.toString('utf-8')
		});
		
		res.on('end', function () {
			parse(content)
		});
		
	})
}

function parse(input) {
	var re=/https:\/\/b1.culture.ru\/c\/\d+.jpg/g
	var arr=[]

	/* putting matches into an array */
	var i = 0
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
	var dir = process.argv[3] || './downloaded';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	console.log();
	console.log(`Total Pages: ${pages}`)
	console.log(`Download Location: ${dir}`)
	console.log();
	download(arr, i, dir);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
