document.addEventListener('DOMContentLoaded', () => {
    const priceContainer = document.getElementById('price-container');

    // Fetch data from the API
    fetch('https://sfl.world/api/v1/prices')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data); // Log the response to understand its structure

            // Check if data is an array or contains a nested array in 'prices'
            let items = Array.isArray(data) ? data : data.prices;

            if (Array.isArray(items) && items.length > 0) {
                items.forEach(item => {
                    // Create a div for each price item
                    const priceDiv = document.createElement('div');
                    priceDiv.className = 'price-item';

                    // Create and append the item name
                    const itemName = document.createElement('h2');
                    itemName.textContent = item.name || 'Unknown Item'; // Use default if 'name' is missing
                    priceDiv.appendChild(itemName);

                    // Create and append the item price
                    const itemPrice = document.createElement('p');
                    itemPrice.textContent = `Price: $${item.price || 'N/A'}`; // Use default if 'price' is missing
                    priceDiv.appendChild(itemPrice);

                    // Append the price item to the container
                    priceContainer.appendChild(priceDiv);
                });
            } else {
                priceContainer.textContent = 'No data available.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            priceContainer.textContent = 'Failed to load data.';
        });
});
