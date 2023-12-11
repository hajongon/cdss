const isBrowser = () => typeof window !== 'undefined'

export const saveAccessTokenToLocalStorage = tokenValue => {
  if (isBrowser()) {
    try {
      localStorage.setItem('accessToken', tokenValue)
    } catch (error) {
      console.error(`Error saving accessToken to local storage:`, error)
    }
  }
}

export const getAccessTokenFromLocalStorage = () => {
  if (isBrowser()) {
    try {
      return localStorage.getItem('accessToken') || ''
    } catch (error) {
      console.error(`Error getting accessToken from local storage:`, error)
      return ''
    }
  }
  return ''
}

export const removeAccessTokenFromLocalStorage = () => {
  if (isBrowser()) {
    try {
      localStorage.removeItem('accessToken')
    } catch (error) {
      console.error(`Error removing accessToken from local storage:`, error)
    }
  }
}
