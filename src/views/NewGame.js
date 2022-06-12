import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDebounce } from '../utilities'
import { Context } from '../store/store'
import axios from 'axios'


export default function NewGame() {
    const [ state, dispatch ] = useContext(Context)
    const [ name, setName ] = useState('')
    const [ passwordOn, setPasswordOn ] = useState(false)
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('none')

    const debouncedGameName = useDebounce(name, 500)

    const url = 'http://localhost:1337'

    const updateState = async () => {
        try {
            const gameData = await axios.get(`${url}/games/${name}`)
            dispatch ({type: 'LOAD_GAME', payload: gameData.data})
        } catch (err) {
            console.log(err.message, err.code)
        }
    }

    const createGame = async () => {

        validateName(name)
        
        if(error === 'none'){
            let game = {
                name: name,
            }
            if (password) game.password = password
    
            axios.post(`${url}/games`, game)
                .then(()=>{
                    updateState()
                })
                .catch(()=>{
                    console.log(`failed to create ${name}`)
                })
        }
    }

    const validateName = async (nameInput) => {
        if(nameInput){
            setError('none')
            try {
                const response = await axios.get(`${url}/games/${nameInput}`)
                if(response.data){
                    setError('Game name already taken.')
                }
                else setError('none')
            } catch (err) {
              console.log(err.message, err.code)
            }
        }
        else setError('Required.')
    }

    useEffect(() => {
        if(debouncedGameName){
            validateName(debouncedGameName)
        }
    }, [debouncedGameName])
    

    return(
        <>
            <main className="new-game">
                <Header />
                <h2 className="new-game__heading new-game__heading_name">Game Name</h2>
                <input className="new-game__input" type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className={error !== 'none' ? "new-game__error" : "new-game__error transparent"}>{error}</p>
                <h2 className="new-game__heading new-game__heading_password">Password</h2>
                <label className="new-game__switch">
                    <input className="new-game__checkbox" type="checkbox" onClick={() => {setPasswordOn(!passwordOn)}}/>
                    <span className="new-game__slider"></span>
                </label>
                <label className={passwordOn ? "new-game__password" : "new-game__password invisible"}>
                    <input className="new-game__input new-game__input_password" type="text" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <Link onClick={createGame} to={ name && error === 'none' ? "/user" : "/new"} className="new-game__submit"><FontAwesomeIcon className="new-game__icon" icon={"play"} /><span className="new-game__submit-text">Begin</span></Link>
                
            </main>
        </>
        
    )
}