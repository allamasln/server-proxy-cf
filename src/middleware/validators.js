const { query, param, validationResult } = require('express-validator')

exports.validateProfile = [
	param('token').matches(/^CF-\d{29}$/),
	validateInputs,
]

exports.validateClient = [
	query('client_id').isNumeric(),
	query('email').isEmail(),
	validateInputs,
]

exports.validateResult = [
	query('client_id').isNumeric(),
	query('survey_id').isNumeric(),
	query('data_all')
		.isString()
		.isLength({ min: 108, max: 108 })
		.matches(/^[1-9]+$/),
	validateInputs,
]

//If it's an error from api (even with a status code 200), create an error response for the error handling middleware
exports.validateAPIResponse = (response, req, res, next) => {
	if (+response.data.code >= 400) {
		const errorResponse = {
			service: 'api',
			message: response.data.message,
			status: response.data.code,
		}

		return next(errorResponse)
	}

	res.json(response.data)
}

function validateInputs(req, res, next) {
	const { errors } = validationResult(req)

	if (errors.length) {
		const fields = errors.map((error) => error.path).join(', ')

		const errorInputs = {
			service: 'api',
			message: 'invalid inputs: ' + fields,
			status: 400,
		}

		return next(errorInputs)
	}

	next()
}
