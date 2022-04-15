const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const routes = require('./src/routes/routes')

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.listen(port, () => console.log(`Server run : http://localhost:${port}`));