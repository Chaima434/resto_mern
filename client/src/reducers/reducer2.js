const initialState = {sum:0};
const reducer2 =(state=initialState,action)=>{
   // console.log(action.type);
    
    switch(action.type){
        case "ADD_SUM": 
            return {
                ...state,
                sum : state.sum+1
            };
                                                                                                                                    
        default:
            return state;    
    }
}

export default reducer2;