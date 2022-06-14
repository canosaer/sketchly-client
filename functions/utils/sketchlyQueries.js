const GET_GAMES = `
    query{
        allGames {
            data{
                name
                turn
                active
                _id
            }
        }
    }
`

const CREATE_GAME = `
    mutation($name: String! ) {   
            createGame(data: {name: $name, nameLower: name @lowerCase, turn: 1, active: false} ) {
                _id
                name
        }
    }
`

module.exports = {
    GET_GAMES, 
    CREATE_GAME,
}