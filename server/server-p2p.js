const express = require('express')
const app = express()
const path = require('path')

// Handle requests for static files
app.use(express.static(path.join(__dirname, '../docs')));

app.listen(1126, () => console.log('Example app listening on port 1126!'))
