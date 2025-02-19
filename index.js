const express = require('express');
const { resolve } = require('path');
const connectToDb = require('./static/db');
const userRouter = require('./schema');
require('dotenv').config()

const app = express();
app.use(express.json())
const port = 3010;
const db_url = process.env.MONGO_URI;


app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.use('/api', userRouter)

app.listen(port, async() => {
  try{

    await connectToDb(db_url)
    console.log(`Example app listening at http://localhost:${port}`);
    console.log('Connected to database')
  }
  catch(err){
    console.log(err)
  }
});
