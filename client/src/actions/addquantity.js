export function addFoodQuantity(item){
    return {
        type : "ADD_FOOD_QUANTITY",
        item : item
    }
}
export function removeFoodQuantity(item){
    return {
        type : "REMOVE_FOOD_QUANTITY",
        item : item
    }
}