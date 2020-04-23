export const getCurrentCity = ()=>{
  const localCity = JSON.parse(localStorage.getItem('hkzf-city'))
  // console.log(localCity);

  if(!localCity){
    return new Promise((resolve,reject)=>{
      var myCity = new window.BMap.LocalCity();
      myCity.get(async ({ name }) => {
       try {
        const res = await (await fetch(`http://127.0.0.1:8080/area/info?name=${name}`)).json();
        localStorage.setItem('hkzf-city',JSON.stringify(res.body)) 
        // console.log('触发的请求');
        
        resolve(res.body)
       } catch (error) {
         reject(error)
       }
      })
    })
  }
  return Promise.resolve(localCity) 
}