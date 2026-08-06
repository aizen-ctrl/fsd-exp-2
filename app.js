const express = require('express');
const fs = require('fs');
const path = require('path');

// =====================================================================
// 1. AUTO-GENERATE FILES (Satisfies the assignment's folder structure)
// =====================================================================
const viewsDir = path.join(__dirname, 'views');

// Create 'views' folder if it doesn't exist
if (!fs.existsSync(viewsDir)) {
    fs.mkdirSync(viewsDir);
}

// Generate views/users.ejs (Part a)
fs.writeFileSync(path.join(viewsDir, 'users.ejs'), `
<!DOCTYPE html>
<html lang="en">
<head><title>User List</title></head>
<body style="font-family: monospace; padding: 20px;">
    <h3>User List</h3>
    <p>--------------------------------------------------</p>
    <% if (users.length === 0) { %>
        <p>No users found.</p>
    <% } else { %>
        <ul style="list-style-type: none; padding: 0;">
            <% users.forEach((user, index) => { %>
                <li><%= index + 1 %>. <%= user.name %> (<%= user.email %>) - <%= user.age %> years</li>
            <% }); %>
        </ul>
        <br>
        <p>Total users: <%= users.length %></p>
    <% } %>
</body>
</html>
`.trim());

// Generate views/register.ejs (Part b)
fs.writeFileSync(path.join(viewsDir, 'register.ejs'), `
<!DOCTYPE html>
<html lang="en">
<head><title>Register</title></head>
<body style="font-family: Arial, sans-serif; max-width: 400px; margin: 2rem auto; padding: 20px;">
    <h2>Registration Form</h2>
    <% if (error) { %> <p style="color: red; font-weight: bold;"><%= error %></p> <% } %>
    <form action="/register" method="POST" style="display: flex; flex-direction: column; gap: 15px;">
        <div>
            <label>Name:</label><br>
            <input type="text" name="name" style="width: 100%; padding: 5px;">
        </div>
        <div>
            <label>Email:</label><br>
            <input type="email" name="email" style="width: 100%; padding: 5px;">
        </div>
        <div>
            <label>Age:</label><br>
            <input type="number" name="age" style="width: 100%; padding: 5px;">
        </div>
        <button type="submit" style="padding: 10px; cursor: pointer;">Submit</button>
    </form>
</body>
</html>
`.trim());

// Generate views/success.ejs (Part b)
fs.writeFileSync(path.join(viewsDir, 'success.ejs'), `
<!DOCTYPE html>
<html lang="en">
<head><title>Success</title></head>
<body style="font-family: monospace; padding: 20px;">
    <h3>Registration Successful!</h3>
    <p>--------------------------------------------------</p>
    <p>Name: <%= name %></p>
    <p>Email: <%= email %></p>
    <p>Age: <%= age %></p>
    <br>
    <a href="/register" style="color: blue;">Go back to register form</a>
</body>
</html>
`.trim());


// =====================================================================
// 2. EXPRESS SERVER SETUP 
// =====================================================================
const app = express();
const PORT = 3000;

// Setup templating engine
app.set('view engine', 'ejs');
app.set('views', viewsDir);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// --- Part (a): Static Data & Rendering ---
const users = [
    { name: 'John Doe', email: 'john@example.com', age: 25 },
    { name: 'Jane Smith', email: 'jane@example.com', age: 30 }
];

app.get('/users', (req, res) => {
    res.render('users', { users: users });
});

// --- Part (b): Form Handling ---
app.get('/register', (req, res) => {
    res.render('register', { error: null }); 
});

app.post('/register', (req, res) => {
    const { name, email, age } = req.body;

    // Simple validation constraint
    if (!name || !email || !age) {
        return res.render('register', { error: 'Validation Error: All fields are required.' });
    }

    res.render('success', { name, email, age });
});

// Start Server
app.listen(PORT, () => {
    console.log('✅ Files generated successfully!');
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`👉 Test Part (A) at: http://localhost:${PORT}/users`);
    console.log(`👉 Test Part (B) at: http://localhost:${PORT}/register`);
});