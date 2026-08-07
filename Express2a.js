const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const users = [
    { name: "John", email: "john@example.com", age: 25 },
    { name: "Alice", email: "alice@example.com", age: 22 },
    { name: "David", email: "david@example.com", age: 28 }
];

app.get('/', (req, res) => {
    res.render('users', { users });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});