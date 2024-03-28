const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Setting response headers
        res.writeHead(200, {'Content-Type': 'text/plain'});
        // Sending "Hello, world!" as the response
        res.end('Hello, world!\n');
    } else {
        res.writeHead(405, {'Content-Type': 'text/plain'});
        res.end('Method Not Allowed\n');
    }
});

const PORT = 5500;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
