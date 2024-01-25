const execSync = require('child_process').execSync;

// Delete existing bundle.js and run Browserify in one command
execSync('del .\\dependencies\\FrontEnd\\js\\utils\\bundle.js && npx browserify .\\dependencies\\FrontEnd\\js\\app.js -o .\\dependencies\\FrontEnd\\js\\utils\\bundle.js', { stdio: 'inherit' });
