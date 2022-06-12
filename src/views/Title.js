import React, { useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Title() {
    
    return(
        <>
            <main className="title-screen">
                <Header />
                <p className="title-screen__text">It's like the classic "Telephone" game, but with drawing. Play alone or with your friends!</p>
                <Link className="title-screen__button" to="/current-games"><FontAwesomeIcon className="title-screen__button-icon" icon={"play"} /><span className="title-screen__button-text">Play</span></Link>
            </main>
        </>
        
    )
}