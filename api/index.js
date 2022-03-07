const express = require('express')
const app = express()

const quiz = require('./controllers/quiz')
app.use(quiz)

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

module.exports = app