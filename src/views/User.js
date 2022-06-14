import React, { useState, useContext } from 'react'
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

    const url = process.env.REACT_APP_BASE_URL

    const retrieveGames = async () => {
        try {
          const response = await axios.get('/api/allGames')
          const activeGame = response.data.filter(game => game.name === state.game.name)
          console.log(activeGame)
          const id = activeGame[0]._id
          enterGame(id)
        } catch (err) {
          console.log(err.message, err.code)
        }
    }


    const enterGame = async (id) => {
        let accessList = state.game.accessedBy ? state.game.accessedBy : []
        accessList.push(userID)

        const payload = {
            accessedBy: accessList,
            _id: id,
            name: state.game.name,
            nameLower: state.game.name.toLowerCase(),
            active: false,
            turn: state.game.turn
        }

        dispatch ({type: 'LOAD_GAME', payload: payload})

        console.log(payload)

        axios.patch('/api/updateGame', JSON.stringify(payload))
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
                <Link onClick={ userName ? retrieveGames : null } to={ userName ? state.game.turn % 2 === 0 ? '/label' : '/draw' : '/user' } className="user__submit">Ready!</Link>
            </main>
        </>
        
    )
}