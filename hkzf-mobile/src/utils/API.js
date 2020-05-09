import BASE_URL from "./util"
import Auth from "./Auth";

// 定义需要和不需要设置token的路由集合
const includes = [
  '/user',
  '/buy'
]

const excludes = [
  '/user/login',
  '/user/registered'
]

const queryString = function(params) {
  return '?' + Object.keys(params).map(key => `${ key }=${ encodeURIComponent(params[key]) }`).join('&');
}

export default class API {
  // 判断是否需要携带token
  static isAuth(url){
    // console.log('/user/login'.startsWith('/user/login'));
    
    return includes.some(item => url.startsWith(item)) && !excludes.some(item => url.startsWith(item))
  }
  static async get(url, params,isAuth = API.isAuth(url)) {
      const qs = params ? queryString(params) : '';
      return (await fetch(BASE_URL + url + qs,{
        headers: {
          ...(isAuth && Auth.isToken ? {Authorization: Auth.getToken()}: {})
        }
      })).json();
  }

  static async post(url,params,query,isAuth = API.isAuth(url)) {
    const qs = query ? queryString(query) : '';
    return (await fetch(BASE_URL+url+qs,{
      body: JSON.stringify(params || {}), // must match 'Content-Type' header
      headers: {
        'content-type': 'application/json',
        ...(isAuth && Auth.isToken ? {Authorization: Auth.getToken()}: {})
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
    })).json()
  }
}