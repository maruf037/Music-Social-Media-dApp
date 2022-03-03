const express = require('express') //Importing express
const bodyParser = require('body-parser') //Importing body-parser. Body-parser is processing all our json requests.
const app = express() //Creating an express app
const path = require('path') //Importing path
const port = 9000 //Port number
const distFolder = path.join(__dirname, '../public', 'dist')//Path to the dist folder

app.use(distFolder, express.static(distFolder));
app.use(bodyParser.json());

//app.use is a middleware. It is used to process the request. Specificaly it is used here to log information about each request so that we can debug the server in case anyting wrong happens.
app.use((req, res, next) => {
    console.log(`${req.method} Request to ${req.originalUrl}`)
    next()
})

//get is a method of express. It is used here to send the bundle.js and index.html files when requested from the dist folder.
app.get('*/bundle.js', (req, res) => {
    res.sendFile(path.join(distFolder, 'bundle.js'))    
})
app.get('*', (req, res) => {
    res.sendFile(path.join(distFolder, 'index.html'))
})

//listen is a method of express. It is used here to start the server.
app.listen(port, '0.0.0.0', (req, res) => {
    console.log(`Server is listening on port localhost:${port}`)
})