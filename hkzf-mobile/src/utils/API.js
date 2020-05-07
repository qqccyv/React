import BASE_URL from "./util"


const queryString = function(params) {
  return '?' + Object.keys(params).map(key => `${ key }=${ encodeURIComponent(params[key]) }`).join('&');
}

export default class API {
  static async get(url, params) {
      const qs = params ? queryString(params) : '';
      return (await fetch(BASE_URL + url + qs)).json();
  }

  static async post(url,params,query) {
    const qs = query ? queryString(query) : '';
    return (await fetch(BASE_URL+url+qs,{
      body: JSON.stringify(params), // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })).json()
  }
}