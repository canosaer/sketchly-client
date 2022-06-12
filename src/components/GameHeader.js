import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Timer from './Timer'
import { Context } from '../store/store'
import axios from 'axios'

export default function GameHeader(props) {

    const [state, dispatch] = useContext(Context)
    const [quitMenuOpen, setQuitMenuOpen ] = useState(false)

    const time = new Date()
    time.setSeconds(time.getSeconds() + 99)

    const dimmerStyles = quitMenuOpen ? 'dimmer dimmer_open' : 'dimmer'
    const quitStyles = quitMenuOpen ? 'quit quit_open' : 'quit'

    const url = 'http://localhost:1337'

    const lockScroll = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop)
        }
    }

    const unlockScroll = () => {
        window.onscroll = function() {}
    }

    const reactivateGame = () => {
        axios.patch(`${url}/games/${state.game.name}`, {action: 'REACTIVATE'})
            .catch((err)=>{
                console.log(err.message, err.code)
            })
    }

    useEffect(() => {

        if(quitMenuOpen){
            window.scrollTo(0,0)
            lockScroll()
        }
        else{
            unlockScroll()
        } 

    }, [quitMenuOpen])

    return(
        <header className="game-header">
            <button className="game-header__button game-header__button_reset" onClick={() => props.mode === 'draw' ? props.canvas.current.clear() : props.labelInput.current.value = ''} ><FontAwesomeIcon className="game-header__icon game-header__icon_reset" icon={"rotate-right"} /></button>
            <Timer expiryTimestamp={time} />
            <button className="game-header__button game-header__button_quit" onClick={() => setQuitMenuOpen(!quitMenuOpen)}><FontAwesomeIcon className="game-header__icon header__icon_quit" icon={"xmark"} /></button>
            <div className={quitStyles}>
                <div className="quit__content">
                    <h2 className="quit__heading">Are you sure you want to quit?</h2>
                    <button className="quit__button quit__button_cancel" onClick={() => setQuitMenuOpen(false)}>Cancel</button>
                    <Link to="/current-games" onClick={()=>reactivateGame()} className="quit__link"><button className="quit__button quit__button_confirm">Quit</button></Link>
                </div>
            </div>
            <div className={dimmerStyles}></div>
            <h2 className="game-header__prompt">{props.mode === 'draw' ? `Draw: ${props.prompt ? props.prompt : '...'}` : 'Label the drawing'}</h2>
        </header>
    )
}