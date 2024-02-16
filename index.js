// Replace 'your_json_link_here' with the actual link to your JSON data
const jsonLink = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

// Display all products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayAllProducts();
});

// Function to fetch and display all products
async function displayAllProducts() {
    try {
        const response = await fetch(jsonLink);
        const data = await response.json();

        // Get the container elements
        const productListContainer = document.getElementById('productList');

        // Clear previous content
        productListContainer.innerHTML = '';

        // Display each product
        data.categories.forEach(category => {
            category.category_products.forEach(product => {
                const productContainer = document.createElement('div');
                productContainer.className = 'product-container';

                // Create image element
                const imgElement = document.createElement('img');
                imgElement.src = product.image;
                productContainer.appendChild(imgElement);

                // Create product info container
                const productInfoContainer = document.createElement('div');
                productInfoContainer.className = 'product-info';

                // Create product name and vendor element
                const nameVendorElement = document.createElement('div');
                nameVendorElement.className = 'product-info-row';
                const nameElement = document.createElement('p');
                nameElement.textContent = product.title;
                const vendorElement = document.createElement('p');
                vendorElement.textContent = product.vendor;
                nameVendorElement.appendChild(nameElement);
                nameVendorElement.appendChild(document.createTextNode('\u00A0')); // Add a space
                nameVendorElement.appendChild(vendorElement); // Added a space between name and vendor
                productInfoContainer.appendChild(nameVendorElement);

                // Create product price, discount, and discount calculation element
                const priceDiscountElement = document.createElement('div');
                priceDiscountElement.className = 'product-info-row';
                const priceElement = document.createElement('p');
                priceElement.textContent = `Rs.${product.price} `;
                const discount = (product.compare_at_price - product.price) / product.compare_at_price * 100;
                const discountElement = document.createElement('p');
                discountElement.textContent = `${discount.toFixed()}% off`;
                discountElement.className = 'discount';
                const discountCalculationElement = document.createElement('p');
                discountCalculationElement.textContent = `Rs.${product.compare_at_price}`;
                discountCalculationElement.className = 'discount-price-strike';
                priceDiscountElement.appendChild(priceElement);
                priceDiscountElement.appendChild(document.createTextNode('\u00A0')); // Add a space
                priceDiscountElement.appendChild(discountCalculationElement);
                priceDiscountElement.appendChild(document.createTextNode('\u00A0')); // Add a space
                priceDiscountElement.appendChild(discountElement);
                productInfoContainer.appendChild(priceDiscountElement);

                // Create "Add to Cart" button
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.className = 'button-add';
                addToCartButton.addEventListener('click', () => addToCart(product));

                // Append product info container and button to the main container
                productContainer.appendChild(productInfoContainer);
                productContainer.appendChild(addToCartButton);

                // Append product container to the main container
                productListContainer.appendChild(productContainer);
            });
        });
    } catch (error) {
        console.error('Error fetching or displaying data:', error);
    }
}

// Function to handle adding a product to the cart
function addToCart(product) {
    // You can customize this function based on your needs
    console.log(`Product added to cart: ${product.title}`);
}

// Function to filter products based on user input
function filterProducts(searchTerm) {
    const productListContainer = document.getElementById('productList');
    const products = productListContainer.getElementsByClassName('product-container');

    // Convert searchTerm to lowercase for case-insensitive matching
    const searchTermLowercase = searchTerm.toLowerCase();

    // Iterate through each product and show/hide based on the searchTerm
    Array.from(products).forEach(product => {
        const productName = product.querySelector('.product-info p:first-child').textContent.toLowerCase();
        if (productName.includes(searchTermLowercase)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}