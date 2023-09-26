require('express-async-errors')
const express = require('express')

const app = express()

app.use(require('helmet')())
app.use(require('cors')())
app.use(require('compression')())
app.use(express.json())

app.use('/proxy', require('./routes'))

app.use(require('./middleware/errors'))

app.get('/health', (req, res) => {
	res.status(200).json({ status: 'OK', message: 'Proxy server is healthy' })
})

app.all('*', (req, res) => {
	res.status(404).json({ service: 'proxy', error: 'Resource not found' })
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Proxy server is running on port ${port}`))
