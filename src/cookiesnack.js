'use strict'
/**
 * [cooky]
 * !!! NOTICE BEFORE REVIEW THIS CODE !!!
 *
 * |Parsed Object| in arguments (arg) at this code's comments is meaning the Map Object that had parsed already by parse (cookieStr)
 * 이 코드의 주석에서 파라미터(args)에 있는 Parsed Object라는 타입은 이미 parse(cookieStr)을 거친 Map 객체를 의미함
 * @type {Object}
 */

const cookiesnack = {
  /**
   * [parseCookie description]
   * Parse the cookie string to key:val object
   * This function returns Promise. please use this function like -> parse(str).then((result) => {})
   * 주어진 쿠키를 key:value 매칭의 객체 배열로 반환합니다
   * 프로미스가 지원되지 않는 환경을 제외하고 항상 프로미스 객체를 반환하니 콜백을 사용하지 않을 시에 parse(str).then((result) => {}) 방식으로 사용해야 함.
   *
   * @param  {String}   cookieStr [original cookie string]
   * @param  {Function} cb        [calls callback when you need. (optional)]
   * @return {Object}             [returns parsed key:value object.]
   */
  parseCookie(cookieStr, cb) {
    if(typeof cookieStr !== 'string') throw new TypeError('The argument must be a string.')

    const cookie = cookieStr.split(';')
    let len = cookie.length - 1
    let l = -1
    const result = new Map()

    while(++l <= len) {
      const keyVal = cookie[l].split(/=/)
      result.set(keyVal[0], keyVal[1])
    }

    // if callback exists
    if(typeof cb !== 'undefined') {
      if(typeof cb === 'function') cb(result)
      else throw new TypeError('Callback must be a function')
    }

    // no callback, Promise supported
    if(typeof Promise === 'function') {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

    // no callback, Promise not supported
    return result
  },

  /**
   * [obj2str description]
   * Convert Parsed Cookie-Object into plain String.
   * 쿠키 객체를 일반 스트링으로 되돌립니다.
   *
   * @param  {Object}   cookie [Parsed Cookie-Object]
   * @param  {Function} cb     [callback
   * @return {String}          [Stringified cookie]
   */
  obj2str(cookie, cb) {
    if(typeof cookie !== 'object') throw new TypeError('The argument must be an object.')

    const cookieStr = []
    for(const [key, value] of cookie) {
      cookieStr.push(`${key}=${value}`)
    }
    const result = cookieStr.join(';')

    // if callback exists
    if(typeof cb !== 'undefined') {
      if(typeof cb === 'function') cb(result)
      else throw new TypeError('Callback must be a function')
    }

    // no callback
    if(typeof Promise === 'function') {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

    // no callback, Promise not supported
    return result
  },

  /**
   * [containsKey description]
   * Will return true if the key is in cookie object
   * Parsed Object does not need this function. just write cookie.has(key)
   * 주어진 키가 쿠키 안에 있는지 없는지 논리형으로 반환합니다.
   * Parsed Object는 이미 객체이므로 cookie.has(key)로 키의 존재함을 확인할 수 있으므로 이 함수가 필요 없습니다.
   *
   * @param  {String}   cookieStr [Cookie string]
   * @param  {String}   key       [The key to find the value that you want to find.]
   * @param  {Function} cb        [callback]
   * @return {Bool}             [Presents key in object or not]
   *
   */
  containsKey(cookieStr, key, cb) {
    if(typeof cookieStr !== 'string' || typeof key !== 'string') throw new TypeError('The argument must be a string.')

    const pattern = new RegExp(`${key}=(.*);?$`)
    const result = cookieStr.match(pattern) ? true : false

    // if callback exists
    if(typeof cb !== 'undefined') {
      if(typeof cb === 'function') cb(result)
      else throw new TypeError('Callback must be a function')
    }

    // no callback
    if(typeof Promise === 'function') {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

    // no callback, Promise not supported
    return result
  },

  /**
   * [findKeysByValue description]
   * This function will be returned the key if given value is in cookie string.
   * 주아진 값이 쿠키안에 존재하면 그 값을 가지는 키들의 배열을 반환합니다 (한 개만 존재해도 배열로 반환함)
   *
   * @param  {(String|Object)}   cookie [Find keys by this param]
   * @param  {String}   value  [The value to find the keys that you want to find.]
   * @param  {Function} cb     [Callback]
   * @return {Array}           [Found keys]
   */
  findKeysByValue(cookie, value, cb) {
    if(!(typeof cookie === 'string' || typeof cookie === 'object')) throw new TypeError('The argument must be a string or object.')
    else if(typeof value !== 'string') throw new TypeError('The argument must be a string.')

    const pattern = new RegExp(`(.*)=${value}`)
    const type = typeof cookie
    const result = []
    if(type === 'object') {
      for(const [key, val] of cookie) {
        if(value === val) result.push(key)
      }
    }
    else if (type === 'string'){
      const arr = cookie.split(';')
      const len = arr.length -1
      for(let l = 0; l <= len; ++l)  {
        const m = arr[l].match(pattern)
        if(m !== null) result.push(m[1])
      }
    }

    // if callback exists
    if(typeof cb !== 'undefined') {
      if(typeof cb === 'function') cb(result)
      else throw new TypeError('Callback must be a function')
    }

    // no callback
    if(typeof Promise === 'function') {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

    // no callback, Promise not supported
    return result
  },

  /**
   * [findValueByKey description]
   * Will return the array of vlues if given key is in cookie string.
   * For Object, you can just find the value by simply typing cookie.key
   * 주아진 키가 쿠키 안에 존재하면 그 키가 참조하는 값을 반환합니다.
   * 객체의 경우는 cookie.get(key) 로 간단히 값을 찾을 수 있겠죠?
   *
   * @param  {String}   cookieStr [cookie string]
   * @param  {String}   key       [The key to find the value that you want to find.]
   * @param  {Function} cb        [Callback]
   * @return {String}             [Found value]
   */
  findValueByKey(cookieStr, key, cb) {
    if(typeof cookieStr !== 'string' || typeof key !== 'string') throw new TypeError('The argument must be a string.')

    const pattern = new RegExp(`${key}=(.*)`)
    const cookieArr = cookieStr.split(';')
    const len = cookieArr.length -1
    const result = []

    for(let l = 0; l <= len;++l)  {
      const m = cookieArr[l].match(pattern)
      if(m !== null) result.push(m[1])
    }

    // if callback exists
    if(typeof cb !== 'undefined') {
      if(typeof cb === 'function') cb(result)
      else throw new TypeError('Callback must be a function')
    }

    // no callback
    if(typeof Promise === 'function') {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

    // no callback, Promise not supported
    return result
  },

  /**
   * [editKey description]
   * Changes the key value in the cookie. The value of the original key will disappear.
   * 키의 이름을 변경합니다. 기존의 키가 가지는 값은 사라집니다.
   * @param  {(String|Object)}   cookie [Cookie object or string]
   * @param  {String}   Okey   [The key that you want to modify]
   * @param  {String}   Nkey   [The key that you want to use]
   * @param  {Function} cb     [Callback]
   * @return {(String|Object)}          [Modified String or object]
   */
  editKey(cookie, Okey, Nkey, cb) {
    if(!(typeof cookie === 'string' || typeof cookie === 'object')) throw new TypeError('The argument must be a string or object.')
    else if(typeof Okey !== 'string' || typeof Nkey !== 'string') throw new TypeError('The argument must be a string.')

    let result = null
    if(typeof cookie === 'string') {
      const pattern = new RegExp(`${Okey}=(.*)`)
      const cookieArr = cookie.split(';')
      const len = cookieArr.length -1
      for(let l = 0; l <= len; ++l) {
        const m = cookieArr[l].match(pattern)
        if(m !== null) {
          result = cookie.replace(new RegExp(`${Okey}=`), `${Nkey}=`)
        }
      }
    }
    else if(typeof cookie === 'object') {
      if(cookie.get(Okey)) {
        result = cookie
        result.set(Nkey, result.get(Okey))
        result.delete(Okey)
      }
    }

    // if callback exists
    if(typeof cb !== 'undefined') {
      if(typeof cb === 'function') cb(result)
      else throw new TypeError('Callback must be a function')
    }

    // no callback
    if(typeof Promise === 'function') {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

    // no callback, Promise not supported
    return result
  },

  /**
   * [editValue description]
   * edits the value referenced by key to a new value
   * Parsed Object does not need this function. just write -> cookie.key = value
   * 쿠키 안에서 해당 키가 참조하는 값을 새로운 값으로 바꿔줍니다.
   * 이미 객체로 파싱한 쿠키는 이 함수를 사용하지 않고 cookie.set(key, value) 으로 간단히 바꿀 수 있습니다.
   *
   * @param  {String}   cookie [Cookie string]
   * @param  {String}   key    [The key that the value you want to modify refers to]
   * @param  {String}   Nval   [The value that you want to modify]
   * @param  {Function} cb     [Callback]
   * @return {String}          [Modified value]
   */
  editValue(cookieStr, key, Nval, cb) {
    if(typeof cookieStr !== 'string' ||
      typeof key !== 'string' ||
      typeof Nval !== 'string'
    ) throw new TypeError('The argument must be a string.')
    const pattern = new RegExp(`${key}=(.*)`)
    const cookieArr = cookieStr.split(';')
    const len = cookieArr.length -1
    let result = null

    for(let l = 0; l<= len; ++l) {
      const m = cookieArr[l].match(pattern)
      if(m !== null) {
        cookieArr[l] = `${key}=${Nval}`
        result = cookieArr.join(';')
      }
    }

    // if callback exists
    if(typeof cb !== 'undefined') {
      if(typeof cb === 'function') cb(result)
      else throw new TypeError('Callback must be a function')
    }

    // no callback
    if(typeof Promise === 'function') {
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    }

    // no callback, Promise not supported
    return result
  }
}

module.exports = cookiesnack
