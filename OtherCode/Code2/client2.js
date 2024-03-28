document.addEventListener('DOMContentLoaded', function() {
  const generateButton = document.getElementById('generateButton');
  generateButton.addEventListener('click', generatePrimes);

  function generatePrimes() {
      const inputNumber = document.getElementById('inputNumber').value;
      console.log('I am here - Step 1')
      fetch(`/generatePrimes?inputNumber=${inputNumber}`)
    //   console.log('Made it into fetch')

          .then(response => response.json())
          .then(data => {
              const primeResultsDiv = document.getElementById('primeResults');
              console.log('made it inside data')


              if (data.error) {
                  primeResultsDiv.innerHTML = `<p>${data.error}</p>`;

              } else {
                  primeResultsDiv.innerHTML = `
                      <p>The highest prime number up to ${inputNumber} inclusive is: ${data.highestPrime}</p>
                      <p>Time taken to generate prime numbers up to ${inputNumber} inclusive: ${data.timeTaken} seconds</p>
                      <p>Here is a list of all Prime Numbers up to ${inputNumber} inclusive:</p>
                      <p>${data.primeList.join(', ')}</p>
                  `;
              }
              console.log('made it to post "else"')

          })
          .catch(error => {
              console.error('Error:', error);
              const primeResultsDiv = document.getElementById('primeResults');
              primeResultsDiv.innerHTML = '<p>An error occurred. Please try again later.</p>';
          });
  }
});
