const TOKEN_KEY = 'HKZF_TOKEN'
export default class Auth {
  static getToken = ()=> localStorage.getItem(TOKEN_KEY) &&  localStorage.getItem(TOKEN_KEY).trim()
  static setToken = (value)=> {
   value &&  value.trim().length !== 0 && localStorage.setItem(TOKEN_KEY,value)
  }
  static removeToken = ()=>{
    localStorage.removeItem(TOKEN_KEY)
  }
  static get isToken (){ return !!this.getToken()}
}