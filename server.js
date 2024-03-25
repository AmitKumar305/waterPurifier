require('dotenv').config();
const express = require('express');
const cors = require('cors');
const busboyBodyParser = require('busboy-body-parser');
// const connectDB = require('./db/index');
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

const contactUs = require('./controller/contactUs');
const support = require('./controller/support');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Server is running');
});

app.post('/api/contactUs', contactUs);
app.post('/api/support', support);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
