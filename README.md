# Downloaders

## Requirements
npm and Node.js

## Setup
```Bash
git clone https://github.com/alan850627/downloaders.git
cd downloaders/
npm install
```

To use the join command in the frontera library downloader, you must have FFMPEG available in your PATH.

See below for download usage.

## frontera
Downloads audio from the Frontera library.

Usage:
```Bash
node frontera.js <link> <dir>
```

Arguments:
* link: The document link. For example, http://frontera.library.ucla.edu/recordings/la-negra-48

* dir: Directory to save your downloaded images. Defaults to `./downloads` if none provided.

Note: the downloader creates a .tmp folder in the download directory, then delets it once all processing is done.

## nyphil
Downloads nyphil archive scores.

Usage:
```Bash
node nyphil.js <link> <dir>
```

Arguments:
* link: The document link. For example, http://archives.nyphil.org/index.php/artifact/5f25010c-dadd-4f9f-ac78-a9075cf5b6a0-0.1

* dir: Directory to save your downloaded images. Defaults to `./downloads` if none provided.

## culture.ru
Downloads culture.ru scores.

Usage:
```Bash
node culture.ru.js <link> <dir>
```

Arguments:
* link: The document link. For example, https://www.culture.ru/project/tchaikovsky/objects/2049/romeo-i-dzhuletta-uvertyura-po-tragedii-u-shekspira-romeo-i-dzhuletta-1-ya-redaktsiya

* dir: Directory to save your downloaded images. Defaults to `./downloads` if none provided.
