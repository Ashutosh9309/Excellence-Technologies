const express = require('express');
const app = express();
const MongoDB = require('./config/db')
const PORT = process.env.PORT || 9700


//Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/',require('./controller/indexRoute'))
MongoDB()
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${PORT}`)
})