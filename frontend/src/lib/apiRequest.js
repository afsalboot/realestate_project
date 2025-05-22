import axios from 'axios'


const Urls = "http://localhost:4000/api"



export const apiRequest = axios.create({
    baseURL: Urls,
});



const localstorage = localStorage.getItem('userData')

let tokenValue = null;

if(localstorage ) {
    try{
        const userData  = JSON.parse(localstorage)

        console.log("apiRequest userData",userData)

        if(userData.token){
            tokenValue = userData.token;
        }
    }catch(err){
        console.error('Failed to parse userData:', err.message);
    }
}

console.log('Sending token:', tokenValue);



 export const tokenRequest = axios.create({
    baseURL: Urls,
    headers: {
    Authorization: `Bearer ${tokenValue}`
  }
})

