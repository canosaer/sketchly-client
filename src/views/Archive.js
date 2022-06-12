import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import Moment from 'react-moment';
import 'moment-timezone';
import {  useLocalStorage } from '../utilities'
import { Context } from '../store/store'

export default function Archive() {
    const [ state, dispatch ] = useContext(Context)
    const [ games, setGames ] = useState([])
    const [ init, setInit ] = useState(false)
    const [ userID, setUserID ] = useLocalStorage('userID', '')
    
    const url = 'http://localhost:1337'

    const loadGame = (index) => {

        dispatch ({type: 'LOAD_GAME', payload: games[index]})
    }

    const retrieveGames = async () => {
        try {
          const response = await axios.get(`${url}/games`)
          setGames(response.data.filter(game => game.turn > 11))
        } catch (err) {
          console.log(err.message, err.code)
        }
    }

    useEffect(() => {
        if(!init){
            retrieveGames()
            setInit(true)
        }
    }, [init, games])


    return(
        <>
            <main className="archive">
                <Header />
                <h1 className="archive__heading">Completed Games</h1>
                <div className="archive__game-display">

                    {games.map((game, i) => {
                        const key = game._id

                        return(
                            <Link key={key} onClick={() => loadGame(i)} to="/game-history" className="game">
                                <h2 className="game__name">{game.name}</h2>
                                <p className="game__updated">Last Turn: <Moment format="MMM Do" fromNow="true">{game.lastTurn}</Moment></p>
                                {game.accessedBy.includes(userID) ? <p className="game__alert">You contributed</p> : null}
                                <p className="game__contributors">Contributors:

                                    {game.contributorNames.map((name, i) => {
                                        const key = `name--${i}`

                                        return(
                                            <span key={key}> {name}{i === game.contributorNames.length-1 ? null : ',' }</span>
                                        )
                                    })}
                                </p>
                            </Link>
                            )
                    })}

                </div>
            </main>
        </>
        
    )
}