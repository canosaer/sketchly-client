import React, { useContext } from 'react';
import { useTimer } from 'react-timer-hook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Context } from '../store/store'

export default function Timer({ expiryTimestamp }) {

    const [state, dispatch] = useContext(Context)

    const onExpireFunction = () => {
        dispatch ({type: 'TRIGGER_SUBMIT', payload: true})
    }

    const {
        seconds,
        minutes,
        start,
    } = useTimer({ expiryTimestamp, onExpire: () => onExpireFunction()});
      
      
    return (
        <figure className="timer">
            <FontAwesomeIcon className="timer__stopwatch" icon={"stopwatch"} />
            <div className="timer__circle">
                <p className="timer__seconds">{seconds + (minutes*60)}</p>
            </div>
        </figure>
            
    )
}
