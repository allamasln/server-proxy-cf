module.exports = (err, req, res, next) => {
	const error = {
		service: err.service || 'proxy',
		error: err.message,
	}

	if (err.request?.host?.startsWith('loving-germain')) error.service = 'api'

	const code = err.status || err.response?.status || 500

	res.status(code).json(error)
}
