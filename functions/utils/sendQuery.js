const axios = require('axios')
require('dotenv').config()

module.exports = async(query, variables) => {
    const {data: {data, errors} } = await axios({
        url: 'https://graphql.fauna.com/graphql', 
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_FAUNA_SECRET}`
        },
        data: {
            query,
            variables,
        }
    })
    
    if(errors){
        console.error(errors)
        throw new Error('error')
    }
    
    return data
}

