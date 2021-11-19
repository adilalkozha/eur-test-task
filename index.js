const express = require('express')
const sequelize = require('./dbConnection')
const app = express()

app.get('/',(req,res) => {
    res.json({status:'Api start'})
})

const PORT = 8000

app.listen(PORT,() => {
    console.log('Server is running on the port:',PORT)
})