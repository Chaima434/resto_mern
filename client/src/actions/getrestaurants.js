export function getrestaurants(content){
    return{
        type: "GET_RESTAURANTS"
        
    }
}

export function fetchRestPending(){
    return {
        type: "FETCH_RESTAURANTS_PENDING"
    }
}


export function fetchRestSuccess(restaurants){
    return {
        type: "FETCH_RESTAURANTS_SUCCESS",
        restaurants : restaurants
    }
}


export function fetchRestError(error){
    return {
        type: "FETCH_RESTAURANTS_ERROR",
        error : error
    }
}