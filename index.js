const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 3000

app.listen(port, ()=>console.log('server listen on port',port))

app.get('/',(req,res)=>{
    res.send('Bienvenido Al SERVIDOR')
})

//CONEXION A mONGO  db

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Te Has Conectado a MONGO-DB').catch((error)=>console.error(error)))