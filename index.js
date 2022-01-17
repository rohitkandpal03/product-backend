const express = require('express');
const cors  = require('cors');
const Product = require('./routes/Product/Product');
const User = require('./routes/Users/User');

const app = express() ;
app.use(express.json());
app.use(cors());

app.use( '/user', User );
app.use( '/product', Product);


app.listen(4000, () => { console.log("listening on port 4000") });