import fs from "fs"
import convertToChinese from "./converter.js";

const config = JSON.parse(fs.readFileSync("konfiguracja.json"))

fs.readdir(config.folderWejścia, (err, files) => {
    files.forEach(file => {
        const content = fs.readFileSync(`${config.folderWejścia}/${file}`, 'utf8');
        fs.writeFileSync(`${config.folderWyjścia}/${file.replace('.pol', '.js')}`, convertToChinese(content));
    });
});