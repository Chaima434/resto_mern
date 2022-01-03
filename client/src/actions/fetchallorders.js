
export function fetchOrderPending(){
    return {
        type: "FETCH_ORDER_PENDING"
    }
}


export function fetchOrderSuccess(orders){
    return {
        type: "FETCH_ORDER_SUCCESS",
        placed : true,
        orders : orders
    }
}


export function fetchOrderError(error){
    return {
        type: "FETCH_ORDER_ERROR",
        error : error
    }
}