
export function placeOrderPending(){
    return {
        type: "PLACE_ORDER_PENDING"
    }
}


export function placeOrderSuccess(){
    return {
        type: "PLACE_ORDER_SUCCESS",
        placed : true
    }
}


export function placeOrderError(error){
    return {
        type: "PLACE_ORDER_ERROR",
        error : error
    }
}