const AFTER = `__cache_`

export default class Cache {
  static getItem (k) {
    return sessionStorage.getItem(k + AFTER) === 'undefined' ? undefined : JSON.parse(sessionStorage.getItem(k + AFTER))
  }

  static setItem (k, v) {
    const d = typeof v === 'string' ? v : JSON.stringify(v)
    sessionStorage.setItem(k + AFTER, d)
  }

  static removeItem (k) {
    sessionStorage.removeItem(k + AFTER)
  }

  static clear () {
    Object.keys(sessionStorage).filter(i => i.startsWith(AFTER)).forEach(j => sessionStorage.removeItem(j))
  }
}
