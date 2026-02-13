import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext()

export function Provider({store, children}){
    const [state, setstate] = useState(store.getState())
    useEffect(()=>{
        store.subscribe(()=>{
            setstate(store.getState())
        })
    },[]) 

    return (
        <StoreContext.Provider value={{state, dispatch: store.dispatch}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useSelector = (selector) => {
    const store = useContext(StoreContext)
    return selector(store.state)
}

export const useDispatch = () => {
    const store = useContext(StoreContext)
    return store.dispatch
}