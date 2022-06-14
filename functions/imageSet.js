const axios = require('axios')
require('dotenv').config()
const { GET_IMAGESET } = require('./utils/sketchlyQueries.js')
const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')

exports.handler = async (event) => {
    if(event.httpMethod !== 'GET') {
        return formattedResponse(405, {err: 'wrong method'})
    }
    
    try {
        const res = await sendQuery(GET_IMAGESET);
        const data = res.imageSet.data
        return formattedResponse(200, data)

    } catch (err) {
        console.error(err)
        return formattedResponse (500, {err: 'error'})
    }

}