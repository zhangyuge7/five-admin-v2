/**
 * 持久化
 */
export const PREFIX = import.meta.env.VITE_APP_STORAGE_PREFIX
function useStorage($storage) {
  const has = (key) => {
    return !!$storage.getItem(PREFIX + key)
  }

  const get = (key) => {
    const val = $storage.getItem(PREFIX + key)
    return val ? JSON.parse(val) : val
  }

  const set = (key, val) => {
    $storage.setItem(PREFIX + key, val ? JSON.stringify(val) : val)
  }

  const remove = (key) => {
    $storage.removeItem(PREFIX + key)
  }
  const clearAll = () => {
    $storage.clear()
  }
  return {
    has,
    get,
    set,
    remove,
    clearAll,
  }
}

export const sessionCache = useStorage(window.sessionStorage || sessionStorage)
export const localCache = useStorage(window.localStorage || localStorage)
