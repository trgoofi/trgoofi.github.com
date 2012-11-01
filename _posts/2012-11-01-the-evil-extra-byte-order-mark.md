---
layout: post
title: The Evil Extra BOM
tags: [encoding, web]
---

**BOM** (Byte Order Mark `U+FEFF`) as a signature indicating the byte order and encoding form.
Each encoding has its own binary representation.

| Bytes at the Beginning | Represented Encoding of Stream or Text File |
|------------------------|---------------------------------------------|
| `EF BB BF`    | UTF-8 |
| `FE FF`       | UTF-16 big endian |
| `FF FE`       | UTF-16 little endian |
| `00 00 FE FF` | UTF-32 big endian |
| `FF FE 00 00` | UTF-32 little endian |

You cannot see these bytes unless open in binary mode. Here represented in hexadecimal form.

## What Happen with the Extra BOM

BOM help identified the encoding of a file which is good.
But also, it can blow things up without any clue. Like I said before, you could not see it.

    EF BB BF EF BB BF 3C 21 44 4F 43 54 59 50 45 20 68 74 6D 6C 3E     <!DOCTYPE html>   // with extra
    EF BB BF          3C 21 44 4F 43 54 59 50 45 20 68 74 6D 6C 3E     <!DOCTYPE html>

Each line above is the first line in two different HTML files.
The first line in the second group(`EF BB BF`) will be treated as [ZWNBSP].
That's why you couldn't find any difference between them within text editor.
The one with an extra BOM could be a disaster.
Supposed you design a web page and wanted browsers render in Standards Mode.
With this evil extra BOM, browsers will render in Quirks Mode. And this is how web page get messes.
Expressly in an old browser with a doctype that does not include system identifier URL (transitional, strict, loose).
HTML5 doctype that's the case to me.

The one you suppose to be (well I suppose).
![Good BOM] (/assets/pic/bom-good.jpg)

The one you don't, which with the extra BOM.
![Mess BOM] (/assets/pic/bom-mess.jpg)

## Conclusions

1. BOM is used to identify a file's encoding.
2. Extra character at the beginning of HTML file could effect the browser's rending Mode.
3. Rending Mode is for browser backward compatibility.

## References

1. [BOM FAQ] (http://www.unicode.org/faq/utf_bom.html#BOM)
2. [Quirks Mode] (http://en.wikipedia.org/wiki/Quirks_mode)


[ZWNBSP]: (http://en.wikipedia.org/wiki/Zero-width_non-breaking_space "Zero Width Non Breaking Space")
