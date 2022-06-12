import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { useWindowDimensions } from '../utilities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../store/store'
import Header from '../components/Header'
import axios from 'axios'


export default function GameHistory() {

    const [ state, dispatch ] = useContext(Context)
    const [ game, setGame ] = useState({})
    const [ images, setImages ] = useState([])
    const [ turns, setTurns ]  = useState([])

    const url = 'http://localhost:1337'

    const ref = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),]

    const loadGame = async () => {
        if(state.origin === 'submit'){
            setGame(state.game)
            setImages(state.images)
        }
        else{
            try {
                const gameData = await axios.get(`${url}/games/${state.game.name}`)
                setGame(gameData.data)

                const imageData = await axios.get(`${url}/images/${state.game.name}`)
                setImages(imageData.data)
            } catch (err) {
                console.log(err.message, err.code)
            }
        }
    }

    const loadImage = (canvas, image) => {
        if(canvas){
            // console.log(image)
            setTimeout(() => {
                canvas.current.fromData(JSON.parse(image))
            }, "100")
        }
    }

    useEffect(() => {
        if(game.phrases && !turns[0]){
            let gameTurns = [{phrase: game.phrases[0]}, {image: images[0], user: game.contributorNames[0]}]
            
            for(let i=1;i<6;i++){
                if(game.phrases[i]) gameTurns.push({phrase: game.phrases[i], user: game.contributorNames[gameTurns.length-1] })
                if(images[i]) gameTurns.push({image: images[i], user: game.contributorNames[gameTurns.length-1]})
            }
            setTurns(gameTurns)
        }
    }, [game])

    useEffect(() => {
        loadGame()
    }, [state])

    return(
        <>
            <main id="history-top" className="history">
                <Header />
                <h2 className="history__heading">{state.game.name}</h2>

                {turns[0] ? 
                    turns.map((turn, i) => {
                        const key = `turn--${i}`
                
                        if(i%2 === 0){
                            return(
                                <h2 key={key} className="history__word">{turn.phrase}{turn.user ? <aside className="history__user history__user_word">{turn.user}:</aside> : null}</h2>
                            )
                        }
                        else{
                            return(
                                <div className='history__canvas-container' key={key}>
                                    <SignatureCanvas
                                        ref={ref[Math.floor(i/2)]}
                                        canvasProps={{
                                            width: 414,
                                            height: 414, 
                                            className: 'history__canvas'
                                        }}
                                        backgroundColor='rgb(255,255,255)'
                                    />
                                    {loadImage(ref[Math.floor(i/2)], turn.image)}
                                    <aside className="history__user history__user_image">{turn.user}:</aside>
                                </div>
                            )
                        }
                    })
                    :
                    <FontAwesomeIcon className="history__loading" icon={"circle-notch"} />
            
                }

                {/* // {turns.map((turn, i) => {
                //     const key = `turn--${i}`
             
                //     if(i%2 === 0){
                //         return(
                //             <h2 key={key} className="history__word">{turn}</h2>
                //         )
                //     }
                //     else{
                //         return(
                //             <div key={key}>
                //                 <SignatureCanvas
                //                     ref={ref}
                //                     canvasProps={{
                //                         width: 414,
                //                         height: 414, 
                //                         className: 'history__canvas'
                //                     }}
                //                     backgroundColor='rgb(255,255,255)'
                //                 />
                //                 {loadImage(ref, turn)}
                //             </div>
                //         )
                //     }
                    
                // })} */}

                <div className="history__link-row">
                    <Link to="/current-games" className="history__link history__link_current">Current Games</Link>
                    <Link to="/archive" className="history__link history__link_archive">Completed Games</Link>
                </div>

            </main>
        </>
        
    )
}