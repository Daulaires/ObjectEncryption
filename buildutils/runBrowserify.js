const execSync = require('child_process').execSync;
const terser = require('terser');
const fs = require('fs/promises');

async function minifyAndObfuscate() {
    var Start = Date.now();

    // Delete existing bundle.js and run Browserify in one command
    execSync('npx browserify .\\dependencies\\FrontEnd\\js\\app.js -o .\\dependencies\\FrontEnd\\js\\utils\\bundle.js', { stdio: 'inherit' });

    // Obfuscate the bundle.js using Terser
    const inputCode = await fs.readFile('./dependencies/FrontEnd/js/utils/bundle.js', 'utf8');
    try {
        const result = await terser.minify(inputCode, {
            compress: {
                ie8: false,
                keep_fargs: false,
                passes: 2,
                sequences: true,
                unsafe_arrows: false,
                unsafe_comps: false,
                unsafe_Function: false,
                drop_console: true,
                drop_debugger: true,
                computed_props: false,
            },
            mangle:{
                toplevel: true,
                properties: {
                    regex: /^_/,
                },
            },
            ecma: 2015,
            format: {
                comments: false,
            },
            keep_classnames: false,
            keep_fnames: false,
            module: true,
            nameCache: null,
            safari10: false,
            sourceMap: false,
            toplevel: true,
        });

        // Save the obfuscated code back to bundle.js
        await fs.writeFile('./dependencies/FrontEnd/js/utils/bundle.js', result.code);

        var End = Date.now();

        // auto convert to seconds
        var Time = (End - Start) / 1000;

        console.log("Time taken to build and obfuscate: ", Time, " seconds");
    } catch (error) {
        console.error('Error obfuscating the code:', error);
    }
}

// Call the asynchronous function
minifyAndObfuscate();
