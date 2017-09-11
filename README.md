# Downloaders

## Requirements
Basic Bash. On windows, you can use Cygwin and get `base` and `wget`. Scrips should just work on mac and linux.

## nyphil
Downloads nyphil archive scores. 

Usage:
```Bash
./nyphil <document-id> <#-pages-to-download> <resolution>
```

Arguments:
* document-id: The ID of the document. You can get this number by going to an archive webpage, view source, and look for:
```HTML
<dl class="docId">
	<dt>ID:</dt>
	<dd>
		3054                    </dd>
</dl>
```
  Where that 3054 is the DOCID.
  
* #-pages-to-download: Self explanatory. The program will start from page 1 and download every page until this number.

* resolution: There are three resolutions: 1200, 2000, or 3000, with 3000 being the highest resolution. If a number is not provided, the program will default to 3000.