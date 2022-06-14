const axios = require('axios')
require('dotenv').config()
const { UPDATE_PHRASE } = require('./utils/sketchlyQueries.js')
const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')

exports.handler = async (event) => {
    if(event.httpMethod !== 'PATCH' || 'PUT') {
        return formattedResponse(405, {err: 'wrong method'})
    }

    const { content, available } = JSON.parse(event.body)
    const variables =  { content, available }
    try {
        const { updatePhrase: updatedPhrase } = await sendQuery(UPDATE_PHRASE, variables);
        return formattedResponse(200, updatedPhrase)

    } catch (err) {
        console.error(err)
        return formattedResponse (500, {err: 'error'})
    }

}