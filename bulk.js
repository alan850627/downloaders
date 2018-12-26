const fs = require('fs');
const execSync = require('child_process').execSync;


var html = fs.readFileSync('./test.html', 'utf8')

var re=/\/catalog\/tchaikovsky\/ru\/item\/archiv\/.*?"/g
  /* putting matches into an array */
do {
  m = re.exec(html);
  if (m) {
    link = `https://www.culture.ru/${m[0].substring(0,m[0].length-1)}`
    name = (/[^\/]*$/).exec(link)[0]
    console.log(name)
    code = execSync(`node culture.ru.js ${link} ./downloads/${name}`);
  }
} while (m);