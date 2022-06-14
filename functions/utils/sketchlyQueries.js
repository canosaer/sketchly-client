const GET_GAMES = `
    query{
        allGames {
            data{
                name
                nameLower
                accessedBy
                contributorNames
                turn
                phrases
                active
                password
                lastTurn
                _id
            }
        }
    }
`

const GET_PHRASES = `
    query{
        allPhrases {
            data{
                content
                available
                _id
            }
        }
    }
`

const GET_IMAGESET = `
    query( $game: String! ) {
        imageSet (game: $game) {
            data{
                images
                _id
            }
        }
    }
`

const CREATE_GAME = `
    mutation($name: String!, $nameLower: String! ) {   
            createGame(data: {name: $name, nameLower: $nameLower, turn: 1, active: false} ) {
                _id
                name
        }
    }
`

const CREATE_IMAGESET = `
    mutation($game: String!, $images: [String]! ) {   
            createImageSet(data: {game: $game, images: $images} ) {
                _id
                game
        }
    }
`

const UPDATE_GAME = `
  mutation( $id: ID!, $name: String!, $nameLower: String!, $accessedBy: [String], $turn: Int!, $active: Boolean!  ) {
        updateGame( id: $id, data: { name: $name, accessedBy: $accessedBy, turn: $turn, active: $active, nameLower: $nameLower }) {
            _id
            name
        }
    }
`

const UPDATE_IMAGESET = `
  mutation( $id: ID!, $game: String, $imageSet: [String]! ) {
        updateImageSet( id: $id, data: { game: $game, images: $images }) {
            _id
            game
        }
    }
`

const UPDATE_PHRASE = `
  mutation( $id: ID!, $content: String, $available: Boolean! ) {
        updatePhrase( id: $id, data: { content: $content, available: $available }) {
            _id
            content
        }
    }
`

module.exports = {
    GET_GAMES, 
    GET_PHRASES,
    GET_IMAGESET,
    CREATE_GAME,
    CREATE_IMAGESET,
    UPDATE_GAME,
    UPDATE_IMAGESET,
    UPDATE_PHRASE
}