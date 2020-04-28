import BASE_URL from "./util"


export default class API {
  static async get(url){
    return await (await fetch(BASE_URL+url)).json()
  }
}