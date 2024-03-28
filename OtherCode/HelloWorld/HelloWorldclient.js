document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', generatePrimes);

  function generatePrimes() {
// Using the fetch API to make a GET request to the server
fetch('http://localhost:5500')
    .then(response => {
        // Checking if the response is successful (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parsing the response body as text
        return response.text();
    })
    .then(data => {
        // Setting the response text to the content of the primeResults div
        document.getElementById('primeResults').innerText = data;
    })
    .catch(error => {
        // Handling any errors that occur during the fetch request
        console.error('Fetch error:', error);
    });

  }
});
