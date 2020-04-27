// import JsonP from 'jsonp'
export default class Axios {
  static jsonp(options) {
    let script = document.createElement('script');
    let funName = 'myJsonp' + Math.random().toString().replace('.', '')
    // console.log(funName);
    let params = '';
    for (var attr in options.data) {
      params += '&' + attr + '=' + options.data[attr]
    }
    window[funName] = options.success
    script.src = options.url + '?callback=' + funName + params
    document.body.appendChild(script);
    script.onload = function () {
      document.body.removeChild(script)
    }
  }
}