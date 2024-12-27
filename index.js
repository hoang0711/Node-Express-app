'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3099;

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));


let htmlTop = `
<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Bang Hoang</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='main.js'></script>
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="manifest" href="site.webmanifest">
</head>

<body>
    <header>
        <h1>
            Bang <img src="android-chrome-192x192.png" alt="BH icon"> Hoang
        </h1>
    </header>

    <nav>
        <a href="index.html">Home</a>
        <a href="contact.html">Contact</a>
        <a href="gallery.html">Gallery</a>
        <a href="order.html">Order</a>
    </nav>

    <main>
`;


let htmlBottom = `
</main>

    <footer>
        <p>&copy; 2024 Bang Hoang</p>
    </footer>
</body>

</html>
`;

const basket = require('./products.js').products;

function CompareSupply(entree) {
    for (const item of basket) {
        if (item.product === entree) {
            return item;
        }
    }
}

app.post('/purchase', (req, res) => {
    const person = req.body.fullname2;
    const location = req.body.physicaladdress;
    const chosenItem = CompareSupply(req.body.entree);
    const amount = req.body.quantity;
    const itemCost = chosenItem.price;
    const itemInfo = chosenItem.price.toLocaleString('en-US',{style: 'currency',currency: 'USD', minimumFractionDigits: 2});
    const total = amount * itemCost;
    const totalInfo = total.toLocaleString('en-US',{style: 'currency',currency: 'USD', minimumFractionDigits: 2});
    const deliverNote = req.body.note;


    res.send(`${htmlTop}

    <section>
        <h2>Order Confirmation</h2>
            <article>
                <h3>Thank you for ordering with us, <strong>${person}</strong>!</h3>

                    <p>This is a confirmation to let you know that you have purchased <strong>${amount}</strong> 
                    <strong>${chosenItem.product}</strong>s from <strong>${chosenItem.company}.</strong>
                    One single item will cost <strong>${itemInfo}</strong> and the total price for this order is 
                    <strong>${totalInfo}</strong></p>

                    <p>This order is currently in process and will be delivered to <strong>${location}</strong> shortly 
                    with these instructions: <strong>${deliverNote}</strong></p>
            </article>
    </section>
    
    ${htmlBottom}`)
});

app.post("/information", (req, res) => {
    const person = req.body.fullname;
    const address = req.body.emailaddress;
    const comment = req.body.messages;
    const find = req.body.method;


    res.send(`
    ${htmlTop}
    <section>
        <h2>Response</h2>
            <article>
                <h3>Hello, ${person}!</h3>
                    
                    <p>We want to let you know that we have received your message along with your contact information.
                    It looks like you found our website through <strong>${find}</strong>, and the message you 
                    left for us was: <p>${comment}</p>

                    It is wonderful to hear about your feedback, and we will follow up shortly with you at 
                    <strong>${address}</strong>. Please do not hesitate to reach out to us if you have any more 
                    questions or concerns in the future.
            </article>
    </section>

    ${htmlBottom}`)
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});