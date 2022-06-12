import React, { useReducer, createContext } from 'react'
import data from './data'
import reducer from './reducer'

const Context = createContext(data)

const Store = ({children}) => {
    const [state, dispatch] = useReducer(reducer, data)

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export {Context, Store}