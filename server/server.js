const express = require('express')
const bodyParser = require('body-parser')
const app = require('path')
const port = 9000
const distFolder = path.join(__dirname, '../public', 'dist')

app.use((req, res, next) => {
    console.log(`${req.method} Request to ${req.originalUrl}`)
    next()
})

app.get('*/bundle.js', (req, res) => {
    res.sendFile(path.join(distFolder, 'bundle.js'))    
})

app.get('*', (req, res) => {
    res.sendFile(path.join(distFolder, 'index.html'))
})

app.listen(port, '0.0.0.0', (req, res) => {
    console.log(`Server is listening on port localhost:${port}`)
})