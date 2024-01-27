const execSync = require('child_process').execSync;

var Start = Date.now();

// Delete existing bundle.js and run Browserify in one command
execSync('npx browserify .\\dependencies\\FrontEnd\\js\\app.js -o .\\dependencies\\FrontEnd\\js\\utils\\bundle.js && node .\\buildutils\\minify.js', { stdio: 'inherit' });

var End = Date.now();

// auto convert to seconds
var Time = (End - Start) / 1000;

console.log("Time taken to build: ", Time, " seconds");