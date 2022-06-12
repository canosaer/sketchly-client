import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import SignatureCanvas from 'react-signature-canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowDimensions } from '../utilities'
import { Context } from '../store/store'
import GameHeader from '../components/GameHeader'
import SubmitButton from '../components/SubmitButton'


export default function Label(props) {

    const [ state, dispatch ] = useContext(Context)
    const [ label, setLabel ] = useState('')

    const canvas = useRef()
    const labelInput = useRef()

    useEffect(() => {
        canvas.current.fromData(JSON.parse(state.images[state.images.length-1]))
    }, [state])

    return(
        <>
            <main className="label">
                <GameHeader mode="label" canvas={canvas} labelInput={labelInput}/>
                <SignatureCanvas 
                    ref={canvas}
                    canvasProps={{
                        // width: useWindowDimensions().width, 
                        width: 414,
                        height: 414, 
                        className: 'label__canvas'
                    }}
                    backgroundColor='rgb(255,255,255)'
                />
                <input className="label__input" type="text" 
                    ref={labelInput}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
                <SubmitButton mode="label" phrase={label} image={canvas} />
            </main>
        </>
        
    )
}