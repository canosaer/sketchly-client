import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { Context } from '../store/store'
import axios from 'axios';
import { useLocalStorage } from '../utilities'

export default function User() {
    const [ state, dispatch ] = useContext(Context)
    const [ userName, setUserName ] = useLocalStorage('userName', '')
    const [ touched, setTouched ] = useState(false)
    const [ userID, setUserID ] = useLocalStorage('userID', '')

    const url = 'http://localhost:1337'


    const enterGame = async () => {

        const payload = {
            userID: userID,
            action: 'UPDATE_ACCESS'
        }

        axios.patch(`${url}/games/${state.game.name}`, payload)
            .catch((err)=>{
                console.log(err.message, err.code)
            })
    }

    // useEffect(() => {
    //     console.log(state)
    // }, [state])

    return(
        <>
            <main className="user">
                <Header />
                <h2 className="user__heading">User Name</h2>
                <input className="user__input" type="text" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <p onFocus={()=>!touched ? setTouched(true) : null} className={ !userName && touched ? "user__error" : "user__error transparent"}>Required</p>
                <Link onClick={ userName ? enterGame : null } to={ userName ? state.game.turn % 2 === 0 ? '/label' : '/draw' : '/user' } className="user__submit">Ready!</Link>
            </main>
        </>
        
    )
}