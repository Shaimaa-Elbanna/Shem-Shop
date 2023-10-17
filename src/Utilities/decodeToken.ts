import jwt_decoded from 'jwt-decode';
import TokenData from "../Interfaces/token"




  export async function decodedToken (tokenKey:string ,setToken: (data:TokenData)=> void){

    try {
      const token = localStorage.getItem(tokenKey);
      if (token) {
        const tokenData = await jwt_decoded<TokenData>(token);
        return tokenData;
      }
      return null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  
     
      
    }