const express = require('express')
const path = require('path')

const app = express()
const port = process.env.PORT || 5000

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`Server started on port ${port}`))
