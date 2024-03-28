const http = require('http');
const url = require('url');

// Function to generate prime numbers using the Sieve of Eratosthenes algorithm
function prime_eratosthenes(n) {
    console.log('Generating prime numbers up to', n);
    const start_time = Date.now();
    const prime_list = [];
    const non_prime_list = [];

    for (let i = 2; i <= n; i++) {
        if (!non_prime_list.includes(i)) {
            prime_list.push(i);
            for (let j = i * i; j <= n; j += i) {
                non_prime_list.push(j);
            }
        }
    }
    
    const end_time = Date.now();
    const time_taken = (end_time - start_time) / 1000;
    console.log('Prime generation completed in', time_taken, 'seconds');
    return { primeList: prime_list, timeTaken: time_taken };
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    // Handle API request for generating prime numbers
    if (reqUrl.pathname === 'generatePrimes' && req.method === 'GET') {

        console.log('I am here', reqUrl.pathname, reqUrl.method);

        const inputNumber = parseInt(reqUrl.query.inputNumber);

        if (isNaN(inputNumber) || inputNumber <= 1) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Please enter a valid number greater than 1.' }));
            return;
        }

        console.log('Received request to generate prime numbers up to', inputNumber);
        // Generate prime numbers
        const { primeList, timeTaken } = prime_eratosthenes(inputNumber);
        console.log('Sending response with prime numbers:', primeList);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            highestPrime: primeList[primeList.length - 1],
            timeTaken: timeTaken,
            primeList: primeList
        }));
    }
    // Handle other requests
    else {
        console.log('Received unsupported request:', reqUrl.pathname);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
