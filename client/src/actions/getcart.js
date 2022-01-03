export function getCartPending(){
    return{
        type : "GET_CART_PENDING"
    }
}

export function getCartSuccess(items){
    return{
        type : "GET_CART_SUCCESS",
        items : items
    }
}

export function getCartError(){
    return{
        type : "GET_CART_ERROR",
    }
}

