const axios = require('axios')
require('dotenv').config()
const { CREATE_IMAGESET } = require('./utils/sketchlyQueries.js')
const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')

exports.handler = async (event) => {
    if(event.httpMethod !== 'POST') {
        return formattedResponse(405, {err: 'wrong method'})
    }

    const { game, images } = JSON.parse(event.body)
    const variables =  { game, images }
    try {
        const { createImageSet: createdImageSet } = await sendQuery(CREATE_IMAGESET, variables);
        return formattedResponse(200, {response: 'success'})

    } catch (err) {
        console.error(err)
        return formattedResponse (500, {err: 'error'})
    }

}