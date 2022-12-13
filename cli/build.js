import exec from "child_process"
import fs from "fs"
import convertToJs from "./../models/Parser.js"
import util from "util";
import path from "path";
import { KError } from "../models/ErrorHandler.js";

export function build(run = false)
{
    let config;
    
    try {
        config = JSON.parse(fs.readFileSync("konfiguracja.zojs", 'utf8'));
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new KError('No configuration file found!\n Add \'konfiguracja.zojs\' to the root of your project.', 0);
        } else {
            throw err;
        }
    }
    
    // Run a conversion algorithm for every file in input directory
    fs.readdir(config.folderWejścia, (err, files) => {
    
        for (let i = 0; i < files.length; i++) {
    
            const filePath = `${config.folderWejścia}/${files[i]}`;
            const outPath = `${config.folderWyjścia}/${files[i].replace('.pol', '.js')}`;
    
            const fileFormat = filePath.split('.').pop();
            if (fileFormat != 'pol') continue;
    
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(outPath.replace('.pol', '.js'), convertToJs(content, config));
    
        };
    
    });

    if(run)
    {
        const filePath = path.join(config.folderWyjścia, config.plikGłówny.replace('.pol', '.js'));
        //util.promisify(exec)(`node ${filePath}`);
        console.log(filePath);
    }
}