export default {
  set: (key, value, time) => {
    const date = new Date()
    date.setTime(date.getTime() + Number(time) * 24 * 60 * 60 * 1000)
    document.cookie = key + '=' + value + ';expires=' + date.toUTCString();
  },
  get: (key) => {
    const cookies = document.cookie;
    const cookieArr = cookies.split(';');
    const cookieObj = new Object();
    cookieArr.forEach((item) => {
      let newArr = item.split("=");
      cookieObj[newArr[0].trim()] = newArr[1]
    })
    for (let name in cookieObj) {
      if (name == key) {
        return cookieObj[name]
      }
    }
  },
  remove:(key)=>{
    const date = new Date()
    date.setTime(date.getTime()+ -1 *24*60*60*1000);
    document.cookie = key+'='+' ;expires=' +date.toUTCString();
  }
}
