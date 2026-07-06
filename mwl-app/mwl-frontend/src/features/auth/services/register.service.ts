export async function register (name: string, email: string, password: string, passwordConfirm: string) {
  const res = await fetch ('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      passwordConfirm
    }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Une erreur est survenue')
  }
  return data
}
