import axios from 'axios'


const Urls = "http://localhost:4000/api"

const apiRequest = axios.create({
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
        console.error('Failed to parse userData:', err);
    }
}

console.log("TokenValue",tokenValue);

export const tokenRequest = axios.create({
    baseURL: Urls,
    headers:{token:tokenValue}
})

export default apiRequest;