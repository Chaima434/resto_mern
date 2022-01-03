
const initialState = { loggedIN : false ,cartUpdated : false, restaurants : [], pending : false, error  : null, foodList : [],cart: [],restaurantID:''};

const reducer =(state=initialState,action)=>{
   // console.log(action.type);
    
    switch(action.type){
        case "Login": 
            return {
                ...state,
                loggedIN : action.payload.loginBoolean
            };
        case "FETCH_RESTAURANTS_PENDING":
            return {
                ...state,
                pending : true
            }    
        
        case "FETCH_RESTAURANTS_SUCCESS":
                    return {
                        ...state,
                        restaurants : action.restaurants,
                        pending : false
                    }    
        case "FETCH_RESTAURANT_ERROR":
                return {
                    ...state,
                    error : action.error,
                    pending : false
                }    
        case "FETCH_FOOD_PENDING":
                return {
                    ...state,
                    pending : true
                }    

        case "FETCH_FOOD_SUCCESS":
                    return {
                        ...state,
                        foodList : action.items,
                        pending : false
                    }    
        case "FETCH_FOOD_ERROR":
                return {
                    ...state,
                    error : action.error,
                    pending : false
                }  
        case "ADD_TO_CART":
               
                if(state.cart.length > 0){
                    let index=0;
                    const cartFound = state.cart.filter( (item,index1) =>{ 
                        index = index1;
                        return item._id === action.item._id }) 
                    
                    //console.log('inside reducer',index);
                    if(cartFound.length > 0){
                        return{
                            ...state,
                            
                cartUpdated : true,
                            cart : [...state.cart.slice(0,index),{...action.item,quantity:state.cart[index].quantity+1},...state.cart.slice(index+1)],
                            

                    }}else{
                        return{
                            ...state,
                            
                cartUpdated : true,
                            restaurantID : action.resid,
                            cart :  [...state.cart,{...action.item,quantity:1}],
                            
                        }       
                    }    
                     
                       
                }else{    
                    return{
                        ...state,
                        
                cartUpdated : true,
                        cart :  [...state.cart,{...action.item,quantity:1}],
                        restaurantID : action.resid
                    }   
                } 
        case "REMOVE_FROM_CART":
                let indexCart = state.cart.findIndex(item=> item._id === action.item._id)
                return {
                    ...state,
                cartUpdated : true,
                    cart : [...state.cart.slice(0,indexCart),...state.cart.slice(indexCart+1)]    
                }
        case "ADD_FOOD_QUANTITY":
                let cartIndex = state.cart.findIndex(item=> item._id === action.item._id)
            return{
                ...state,
                cartUpdated : true,
                cart : [...state.cart.slice(0,cartIndex),{...action.item,quantity:state.cart[cartIndex].quantity+1},...state.cart.slice(cartIndex+1)]
            }
        case "REMOVE_FOOD_QUANTITY":
                let cartIndex2 =  state.cart.findIndex(item=> item._id === action.item._id)
                return{
                    ...state,
                    cartUpdated:true,
                    cart : [...state.cart.slice(0,cartIndex2),{...action.item,quantity:state.cart[cartIndex2].quantity-1},...state.cart.slice(cartIndex2+1)]
                } 
        case "LOGOUT":
                return {
                    loggedIN : false ,orders:[], pending : false, error  : null,cart: [],restaurantID : ''
                }   
        case "PLACE_ORDER_PENDING":
                return {
                    ...state,
                    pending : true
                }    

        case "PLACE_ORDER_SUCCESS":
                    return {
                        ...state,
                        cart : [],
                        pending : false
                    }    
        case "PLACE_ORDER_ERROR":
                return {
                    ...state,
                    error : action.error,
                    pending : false
                }
        case "FETCH_ORDER_PENDING":
                return {
                    ...state,
                    pending : true
                }    

        case "FETCH_ORDER_SUCCESS":
                    return {
                        ...state,
                        pending : false,
                        orders : action.orders
                    }    
        case "FETCH_ORDER_ERROR":
                return {
                    ...state,
                    error : action.error,
                    pending : false
                } 
        case "CART_EMPTY":
            return {
                ...state,
                cart : [],
                restaurantID: ''  
            } 
        case "SET_CART_PENDING":
                return {
                    ...state,
                    pending : true
                }    

        case "SET_CART_SUCCESS":
                    return {
                        ...state,
                        pending : false
                    }    
        case "SET_CART_ERROR":
                return {
                    ...state,
                    error : action.error,
                    pending : false
                }
        case "GET_CART_PENDING":
                    return {
                        ...state,
                        pending : true
                    }    
    
        case "GET_CART_SUCCESS":
                    if(action.items === undefined) {
                        return {
                            ...state,
                            pending : false,
                            cart : []
                        }
                    }else{
                        return {
                            ...state,
                            pending : false,
                            cart : action.items
                        }
                    }
                            
        case "GET_CART_ERROR":
                    return {
                        ...state,
                        error : action.error,
                        pending : false
                    } 
        case "CART_UPDATED":
                   return {
                       ...state,
                       cartUpdated : false
                   }                                                                                                                                                                                 
        default:
            return state;    
    }
}

export default reducer;