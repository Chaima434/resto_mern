export function fetchFoodPending(){
    return {
        type : 'FETCH_FOOD_PENDING',

    }
}

export function fetchFoodSuccess(items){
    return {
        type: "FETCH_FOOD_SUCCESS",
        items : items
    }
}


export function fetchFoodError(error){
    return {
        type: "FETCH_FOOD_ERROR",
        error : error
    }
}