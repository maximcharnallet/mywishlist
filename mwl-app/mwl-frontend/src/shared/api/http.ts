export function authHeaders() {
  const token = localStorage.getItem('user_token')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}