import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../store/store'
import axios from 'axios'
import { useLocalStorage } from '../utilities'

export default function GameHeader(props) {

    const [ state, dispatch ] = useContext(Context)
    const [ clicked, setClicked ] = useState(false)
    const [ userName, setUserName ] = useLocalStorage('userName', '')
    const [ saved, setSaved ] = useState(false)

    const dimmerStyles = clicked ? 'dimmer dimmer_open' : 'dimmer'
    const transitionStyles = clicked ? 'transition transition_open' : 'transition'

    const url = process.env.REACT_APP_BASE_URL

    const saveGame = () => {

        const image = JSON.stringify(props.image.current.toData())

        let images = state.game.images ? state.game.images : []

        let contributorNames = state.game.contributorNames ? state.game.contributorNames : []
        let phrases = state.game.phrases ? state.game.phrases : []
        contributorNames.push(userName)

        if(props.mode === 'label' || state.game.turn === 1){
            phrases.push(props.phrase)           
        }

        let date = Date.now()

        let gameData = {
            contributorNames: contributorNames,
            name: state.game.name,
            nameLower: state.game.name.nameLower,
            turn: state.game.turn + 1,
            lastTurn: date.toString(),
            active: true,
            phrases: phrases,
            _id: state.game._id,
        }

        axios.patch('/api/updateGame', JSON.stringify(gameData))
            .catch((err)=>{
                console.log(err.message, err.code)
            })

        if(props.mode === 'draw'){

            images.push(image)

            const imageData = {
                images: images,
                game: state.game.name,
            }

            if(state.game.turn === 1){
                axios.post('/api/createImageSet', JSON.stringify(imageData))
                    .catch((err)=>{
                        console.log(err.message, err.code)
                    })
            }
            else{
                axios.patch('/api/updateImageSet', JSON.stringify(imageData))
                    .catch((err)=>{
                        console.log(err.message, err.code)
                    })
            }
        }

        console.log('data sent')
        console.log(state)

        let contributors = state.game.contributorNames ? state.game.contributorNames : []
        contributors.push(userName)

        let gameObject = {
            contributorNames: contributors,
            name: state.game.name,
        }

        if(state.game.turn === 1){
            let images = []
            images.push(image)
            gameObject.phrases = []
            gameObject.phrases.push(props.phrase)
            dispatch ({type: 'LOAD_IMAGES', payload: images})
        }
        else{
            gameObject.phrases = state.game.phrases
            if(props.mode==="draw"){
                let images = state.images
                images.push(image)
                dispatch ({type: 'LOAD_IMAGES', payload: images})
            }
            else if(props.mode==="label") gameObject.phrases.push(props.phrase)
        }
        dispatch ({type: 'LOAD_GAME', payload: gameObject})
        dispatch ({type: 'UPDATE_ORIGIN', payload: 'submit'})
        setSaved(true)


    }

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

    useEffect(() => {
        if(clicked || state.submit){
            if(!clicked) setClicked(true)
            window.scrollTo(0,0)
            lockScroll()
        }
        else{
            unlockScroll()
        } 

    }, [clicked, state])

    return(
        <>
            <div className={transitionStyles}>
                <div className="transition__content">
                    <h2 className="transition__heading">{props.mode === 'draw' ? 'Drawing submitted!' : 'Label submitted!'}</h2>
                    <Link to="/game-history" onMouseOver={!saved ? () => saveGame() : null} className="transition__link">View Turns</Link>
                </div>
            </div>
            <button onClick={() => setClicked(true)} className="draw__submit">
                <div className={dimmerStyles}></div>
                <FontAwesomeIcon className="draw__submit-icon" icon={"check"} />
            </button>
        </>
        
    )
}