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
            }
        }
    }
`

const GET_IMAGESET = `
    query( $game: String! ) {
        imageSet (game: $game) {
            data{
                images
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
  mutation( $name: String!, $accessedBy: [String], $turn: Int, $contributorNames: [String], $phrases: [String], $active: Boolean, lastTurn: Int  ) {
        updateGame( name: $name, data: { accessedBy: $accessedBy, turn: $turn, contributorNames: $contributorNames, phrases: $phrases, active: $active, lastTurn: $lastTurn }) {
            _id
            name
        }
    }
`

const UPDATE_IMAGESET = `
  mutation( $game: String!, $imageSet: [String]! ) {
        updateImageSet( game: $game, data: { images: $images }) {
            _id
            game
        }
    }
`

const UPDATE_PHRASE = `
  mutation( $content: String!, $available: Boolean! ) {
        updatePhrase( content: $content, data: { available: $available }) {
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