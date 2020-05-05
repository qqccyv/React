import BASE_URL from "./util"


const queryString = function(params) {
  return '?' + Object.keys(params).map(key => `${ key }=${ encodeURIComponent(params[key]) }`).join('&');
}

export default class API {
  static async get(url, params) {
      const qs = params ? queryString(params) : '';
      return (await fetch(BASE_URL + url + qs)).json();
  }
}