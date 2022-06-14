const axios = require('axios')
require('dotenv').config()
const { GET_GAMES } = require('./utils/sketchlyQueries.js')
const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')

exports.handler = async (event) => {
    try {
        const res = await sendQuery(GET_GAMES);
        const data = res.allGames.data
        return formattedResponse(200, data)

    } catch (err) {
        console.error(err)
        return formattedResponse (500, {err: 'error'})
    }

}