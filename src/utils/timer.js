export function setLoginOut() {
  window.localStorage.count = 0

  document.onmousemove = (event) => {
    const x1 = event.clientX
    const y1 = event.clientY
    if (window.localStorage.x !== x1 || window.localStorage.y !== y1) {
      window.localStorage.count = 0
    }
    window.localStorage.x = x1
    window.localStorage.y = y1
  }

  // 监听键盘
  document.onkeydown = () => {
    window.localStorage.count = 0
  }

  // 监听Scroll
  document.onscroll = () => {
    window.localStorage.count = 0
  }

  setTimer()

  function setTimer() {
    console.log('xxxxxxxxxxx')
    window.localStorage.count = 0
    if (!window.myTimer) {
      window.myTimer = window.setInterval(cookieTimeout, 1000)
    }
  }

  function clearTimer() {
    clearInterval(window.myTimer)
    window.myTimer = null
  }

  function cookieTimeout() {
    // 判断用户5分钟无操作就自动登出
    const outTime = 5
    window.localStorage.count++
    if (window.localStorage.count === outTime * 4) {
      alert('系统已经五20秒无操作，请重新登录')
      setTimeout(logout, 1000)
    }
  }

  function logout() {
    // console.log('bbb', window.localStorage.count)
    if (window.localStorage.count >= 5 * 60) {
      /** 登出 */

    }
  }

  function toJson(obj) {
    return JSON.stringify(obj)
  }
  function parseJson(json) {
    return JSON.parse(str)
  }
}
