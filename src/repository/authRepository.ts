export function getAuthStorage(key: string) {
  return localStorage.getItem(key)
}

export function setAuthStorage(key: string, token: string) {
  localStorage.setItem(key, token)
}

export function removeAuthStorage(key: 'all' | string) {
  if (key === 'all') {
    localStorage.clear()
  } else {
    localStorage.removeItem(key)
  }
}
