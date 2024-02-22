import Globals from '../utils/Globals';
import axios from 'axios';
import { Alert } from 'react-native';

// Call post Api
export function postApiCall(param){
    const AuthStr = 'Basic'.concat('App1app#123'); 
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': 'App1 app#123',
    //   'ApiVersion':Globals.ApiVersion
    // }
    var url=param.url;
    var json=param.json;
    console.log("____________________________")
    console.log(url)
    console.log(Globals.API_URL.concat(url))
    console.log(json)
  //  alert(Globals.API_URL.concat(url))
     // return  axios.post(Globals.API_URL.concat(url),json,{ headers: { Authorization: AuthStr,ApiVersion:Globals.ApiVersion } }).then((response) => {
        return  axios.post(Globals.API_URL.concat(url),json).then((response) => {
        
     //   console.log(Globals.API_URL.concat(url))
         return  response.data;
          }).catch(error => {
            if(error.toJSON().message === 'Network Error'){
              alert('no internet connection');
              dispatch({type: RELOAD});
          }
            return error;
        }
        );
}
// Call Get Api
export function getApiCall(param){
  //  const AuthStr = 'Basic'.concat('App1app#123'); 
    var url=param.url;
    console.log(Globals.API_URL.concat(url))
      return  axios.get(Globals.API_URL.concat(url)).then((response) => {
       // alert( response.data[0].GroupName)
       console.log("$$$$$$$44",response.data)

         return  response.data;
          }).catch(error => {
            
            if(error=="AxiosError: Network Error"){
              Alert.alert("Network Connection Failed");
            }
            return error;

        });  
    
}

export function deleteApiCall(param){
  const AuthStr = 'Basic'.concat('App1app#123'); 
  var url=param.url;
  console.log("____________________________")
  console.log(url)
  console.log(Globals.API_URL.concat(url))
  // return  axios.delete(Globals.API_URL.concat(url),{ headers: { Authorization: AuthStr,ApiVersion:Globals.ApiVersion } }).then((response) => {
      return  axios.delete(Globals.API_URL.concat(url)).then((response) => {
       return  response.data;
        }).catch(error => {
          if(error.toJSON().message === 'Network Error'){
            alert('no internet connection');
        }
          return error;
      }
      );
}



export function putApiCall(param){
  const AuthStr = 'Basic'.concat('App1app#123'); 
  var url = param.url;
  var json = param.json;
  console.log("____________________________")
  console.log(url)
  console.log(Globals.API_URL.concat(url))
  console.log(json)

  return axios.put(Globals.API_URL.concat(url), json, {
    headers: {
      Authorization: AuthStr,
      ApiVersion: Globals.ApiVersion
    }
  })
  .then((response) => {
    console.log(Globals.API_URL.concat(url))
    return response.data;
  })
  .catch(error => {
    if(error.toJSON().message === 'Network Error'){
      alert('no internet connection');
      dispatch({type: RELOAD});
    }
    return error;
  });
}

