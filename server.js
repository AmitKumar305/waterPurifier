require('dotenv').config();
const express = require('express');
const cors = require('cors');
const busboyBodyParser = require('busboy-body-parser');
const connectDB = require('./db/index');
const app = express();
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-HTTP-Method-Override', 'Accept'],
	credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboyBodyParser());

connectDB();

const AuthenticateAdmin = require('./middleware/authenticateAdmin');
const adminLogin = require('./controller/adminLogin');
const addProduct = require('./controller/addProduct');
const editProduct = require('./controller/editProduct');
const listProducts = require('./controller/listProducts');
const deleteProduct = require('./controller/deleteProduct');
const contactUs = require('./controller/contactUs');
const support = require('./controller/support');

const port = process.env.PORT || 3000;

app.post('/api/adminLogin', adminLogin);
app.post('/api/addProduct', AuthenticateAdmin, addProduct);
app.post('/api/editProduct', AuthenticateAdmin, editProduct);
app.post('/api/deleteProduct', AuthenticateAdmin, deleteProduct);
app.get('/api/listProducts', listProducts);

app.get('/', (req, res) => {
	res.send('<h1>Server is running</h1>');
});
app.post('/api/contactUs', contactUs);
app.post('/api/support', support);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
