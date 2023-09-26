const axios = require('axios')
const { pick } = require('lodash')
const { Router } = require('express')

const router = Router()

const {
	validateProfile,
	validateClient,
	validateResult,
	validateAPIResponse,
} = require('./middleware/validators')

axios.defaults.headers.common['X-Proxy-Request'] = 'true'

const baseURL = 'https://loving-germain.82-223-101-75.plesk.page/api'

const profileController = async (req, res, next) => {
	const response = await axios.get(`${baseURL}/tb_perfil/${req.params.token}`)
	validateAPIResponse(response, req, res, next)
}

const clientController = async (req, res, next) => {
	const response = await axios.post(
		`${baseURL}/store-client`,
		pick(req.query, ['client_id', 'email'])
	)
	validateAPIResponse(response, req, res, next)
}

const resultController = async (req, res, next) => {
	const response = await axios.post(
		`${baseURL}/store-result`,
		pick(req.query, ['client_id', 'survey_id', 'data_all'])
	)
	validateAPIResponse(response, req, res, next)
}

router.get('/tb_perfil/:token', validateProfile, profileController)
router.post('/store-client', validateClient, clientController)
router.post('/store-result', validateResult, resultController)

module.exports = router
