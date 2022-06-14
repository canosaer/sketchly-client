const axios = require('axios')
require('dotenv').config()
const { UPDATE_GAME } = require('./utils/sketchlyQueries.js')
const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')

exports.handler = async (event) => {
    if(event.httpMethod !== 'PATCH') {
        return formattedResponse(405, {err: 'wrong method'})
    }

    const { _id:id, name, nameLower, turn, active, accessedBy } = JSON.parse(event.body)
    const variables =  { name, nameLower, turn, active, accessedBy, id }
    try {
        const { updateGame: updatedGame } = await sendQuery(UPDATE_GAME, variables);
        return formattedResponse(200, updatedGame)

    } catch (err) {
        console.error(err)
        return formattedResponse (500, {err: 'error'})
    }

}