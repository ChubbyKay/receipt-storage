const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(" It's can work! ")
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})