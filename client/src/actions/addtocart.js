export function addToCart(item,id){
    return {
        type : "ADD_TO_CART",
        item : item,
        resid : id
    }
}

export function removeFromCart(item){
    return {
        type : "REMOVE_FROM_CART",
        item : item,
        
    }
}

export function cartEmpty(){
    return {
        type : "CART_EMPTY"
    }
}