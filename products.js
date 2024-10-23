'use strict';

// Define a JavaScript object with arrays of products, their company names, and prices: 
const products = [
    { company: 'Italian Eatery', product: 'Shrimp Scampi Pasta', price: 23.50 },
    { company: 'Smack Shack', product: 'Lobster Roll', price: 32.95 },
    { company: 'Zen Box', product: 'Tonkotsu Ramen', price: 20.15 },
    { company: 'Firelake Grille', product: 'Filet Mignon', price: 59.00 },
    { company: 'The Oceanaire', product: 'Alaska Halibut', price: 45.25 }
];

// Allow exporting of the object to other functions:
module.exports.products = products;


// Display the object in a table in the terminal console to confirm it works:
// https://developer.mozilla.org/en-US/docs/Web/API/Console/table
console.table(products); 

 