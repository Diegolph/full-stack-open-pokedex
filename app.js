const express = require('express')
const app = express()

// get the port from env variable
const PORT = process.env.PORT || 5000

app.get('/health', (req, res) => res.send('ok'))
app.get('/version', (req, res) => {
  res.send(process.env.RENDER_GIT_COMMIT || process.env.APP_VERSION || 'development')
})

app.use(express.static('dist'))

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started on port ${PORT}`)
})
