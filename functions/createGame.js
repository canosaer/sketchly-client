const axios = require('axios')
require('dotenv').config()
const { CREATE_GAME } = require('./utils/sketchlyQueries.js')
const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')

exports.handler = async (event) => {
    const { name } = JSON.parse(event.body)
    const variables =  { name }
    try {
        const { createGame: createdGame } = await sendQuery(CREATE_GAME, variables);
        return formattedResponse(200, createdGame)

    } catch (err) {
        console.error(err)
        return formattedResponse (500, {err: 'error'})
    }

}