const express = require('express');
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Display registration form
app.get('/', (req, res) => {
    res.render('register');
});

// Process form data
app.post('/register', (req, res) => {

    const { name, email, age } = req.body;

    // Simple validation
    if (!name || !email || !age) {
        return res.send("<h2>All fields are required!</h2><a href='/'>Go Back</a>");
    }

    // Display submitted data
    res.render('success', {
        name,
        email,
        age
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});