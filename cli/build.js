import exec from "child_process"
import fs from "fs"
import convertToJs from "./../models/Parser.js"
import util from "util";
import path from "path";

export function build(run = false)
{
    const config = JSON.parse(fs.readFileSync("konfiguracja.zojs", 'utf8'));
    
    // Run a conversion algorithm for every file in input directory
    fs.readdir(config.folderWejścia, (err, files) => {
    
        for (let i = 0; i < files.length; i++) {
    
            const filePath = `${config.folderWejścia}/${files[i]}`;
            const outPath = `${config.folderWyjścia}/${files[i].replace('.pol', '.js')}`;
    
            const fileFormat = filePath.split('.').pop();
            if (fileFormat != 'pol') continue;
    
            const content = fs.readFileSync(filePath, 'utf8');
            fs.writeFileSync(outPath.replace('.pol', '.js'), convertToJs(content));
    
        };
    
    });

    if(run)
    {
        const filePath = path.join(config.folderWyjścia, config.plikGłówny.replace('.pol', '.js'));
        //util.promisify(exec)(`node ${filePath}`);
        console.log(filePath);
    }
}