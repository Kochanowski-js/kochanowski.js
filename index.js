#!/usr/bin/env node

// import { build } from "./cli/build.js";
import { dev } from "./cli/dev.js";
import { notImplemented } from "./utils/NotImplemented.js";
// import { run } from "./cli/run.js";

const commands = {
    // "build": build,
    // "run": run,
    "dev": dev,
    "update": notImplemented,
    "init": notImplemented
}

let isInvalid = true;

for (const commandIndex in commands) {
    const command = commands[commandIndex];
    if(process.argv.includes(commandIndex))
    {
        isInvalid = false;
        command();
        break;
    }
}

if(isInvalid)
{
    let message = "USAGE:\n    kochanowski [";
    for (const commandIndex in commands) {
        message += commandIndex + ", ";
    }
    message = message.substring(0, message.length-2) + "]";
    console.log(message);
}