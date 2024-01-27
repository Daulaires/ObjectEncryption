const querystring = require('querystring');
const https = require('https');
const fs = require('fs');
const bundlePath = './dependencies/FrontEnd/js/utils/bundle.js';
const bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('Minifying bundle.js...');

const query = querystring.stringify({
 input : bundle,
});

const req = https.request(
 {
    method   : 'POST',
    hostname : 'www.toptal.com',
    path     : '/developers/javascript-minifier/api/raw',
 },
 function(resp) {
    if ( resp.statusCode !== 200 ) {
      console.log('StatusCode=' + resp.statusCode);
      return;
    }

    const data = [];
    resp.on('data', chunk => data.push(chunk));
    resp.on('end', () => {
      const minifiedBundle = Buffer.concat(data).toString();
      fs.writeFileSync(bundlePath, minifiedBundle, 'utf8');
    });
 }
);
req.on('error', function(err) {
 throw err;
});
req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
req.setHeader('Content-Length', query.length);
req.end(query, 'utf8');

console.log('Minifying bundle.js... Done!');
