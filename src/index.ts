#!/usr/bin/env node

import fs from "fs"
import convertToJs from "./lib/convertToJs";

const config = JSON.parse(fs.readFileSync("konfiguracja.json", 'utf8'));

// Run a conversion algorithm for every file in input directory
fs.readdir(config.folderWejścia, (err, files) => {

    for (let i = 0; i < files.length; i++) {

        const filePath = `${config.folderWejścia}/${files[i]}`;
        const outPath = `${config.folderWyjścia}/${files[i].replace('.pol', '.js')}`;

        const fileFormat = filePath.split('.').pop();
        if (fileFormat != 'pol') continue;

        const content = fs.readFileSync(outPath, 'utf8');
        fs.writeFileSync(filePath.replace('.pol', '.js'), convertToJs(content));

    };

});