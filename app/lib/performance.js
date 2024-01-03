// Return number of active intervals

export function watchInterval () {
  window.intervalCount = 0
  const _setInterval = window.setInterval
  const _clearInterval = window.clearInterval

  window.setInterval = (...args) => {
    window.intervalCount++
    return _setInterval(...args)
  }
  
  window.clearInterval = (...args) => {
    window.intervalCount--
    return _clearInterval(...args)
  }

  setInterval(() => {
    console.log('Interval count: ' + window.intervalCount)
  }, 500)
}

// Return number of active timeouts

export function watchTimeout() {
  window.timeoutCount = 0
  const _setTimeout = window.setTimeout
  const _clearTimeout = window.clearTimeout

  window.setTimeout = (callback, time) => {
    window.timeoutCount++
    
    return _setTimeout(() => {
      window.timeoutCount--
      callback()
    }, time)
  }

  window.clearTimeout = (...args) => {
    window.timeoutCount--
    return _clearTimeout(...args)
  }

  setInterval(() => {
    console.log('Timeout count: ' + window.timeoutCount)
  }, 500)
}

// Get the number of event listeners
// Can only run in browser console

/* 

(() => {
  const results = {
    click: 0,
    mousemove: 0,
    mouseover: 0,
    scroll: 0,
    resize: 0
  }
  const sources = Array.from(document.querySelectorAll('*'))
  sources.push(window)
  sources.forEach(source => {
    Object.entries(getEventListeners(source))
      .forEach(([eventName, listeners]) => {
        if (eventName in results) {
          results[eventName] += listeners.length 
        }
      })
  })
  console.log(results)
  console.log(Object.values(results).reduce((a, b) => a + b, 0))
})()

*/