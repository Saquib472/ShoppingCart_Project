export const apiMiddleware = ({dispatch}) => (next) => (action) => {
    const BASE_URL = "https://fakestoreapi.com"
    if(action.type === 'api/makeCall'){
        next(action)
        const {url, onStart, onSuccess, onError} = action.payload
        const handleProducts = async () => {
            try{
                dispatch({ type: onStart })
                const res = await fetch(`${BASE_URL}/${url}`)
                const data = await res.json()
                dispatch({
                    type : onSuccess,
                    payload : data
                })
            }catch(err){
                dispatch({ type : onError })
            }
        }
        handleProducts()
    } else {
      next(action)
    }
}