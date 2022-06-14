const axios = require('axios')
require('dotenv').config()
const { UPDATE_IMAGESET } = require('./utils/sketchlyQueries.js')
const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')

exports.handler = async (event) => {
    if(event.httpMethod !== 'PATCH' || 'PUT') {
        return formattedResponse(405, {err: 'wrong method'})
    }

    const { _id:id, game, images } = JSON.parse(event.body)
    const variables =  { game, images, id }
    try {
        const { updateImageSet: updatedImageSet } = await sendQuery(UPDATE_IMAGESET, variables);
        return formattedResponse(200, {response: 'success'})

    } catch (err) {
        console.error(err)
        return formattedResponse (500, {err: 'error'})
    }

}