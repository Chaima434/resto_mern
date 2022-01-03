

export function loginuser(content){
    return{
        type: "Login",
        payload :{
          loginBoolean : content   
        }
    }
}