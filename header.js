#!/usr/bin/env node
'use strict'
const fs = require('fs');

function done(msg) {
    console.log(msg);
    process.exit();
}

if(process.argv.length < 3) done('你倒是给文件呀!');
const targetFile = process.argv[2];
const fuhao = process.argv[3] ? process.argv[3] : '\'';

let headers;
try {
    headers = fs.readFileSync(targetFile).toString().split('\n');
} catch(e) {
    done(`读取文件错误:${e.message}`);
}

function transfer(headers) {
    const ret = [];
    for(let header of headers) {
        const index = header.indexOf(':');
        ret.push(`${fuhao}${header.slice(0, index)}${fuhao}:${fuhao}${header.slice(index + 1).trim()}${fuhao}`)
    }
    return ret.join(',\n');
}

try {
    console.log(transfer(headers));
} catch(e) {
    done(`文件处理错误:${e.message}`);
}