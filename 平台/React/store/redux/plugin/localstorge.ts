export default function createWeAPPStorage() {
  return {
    getItem: (key) => {
      return new Promise((resolve) => {
        // resolve(getStorageSync(key))
      })
    },
    setItem: (key, item) => {
      return new Promise<void>((resolve) => {
        // setStorageSync(key, item)
        resolve()
      })
    },
    removeItem: (key) => {
      return new Promise<void>((resolve) => {
        // removeStorageSync(key)
        resolve()
      })
    },
  }
}
