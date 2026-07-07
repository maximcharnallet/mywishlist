export async function signin (email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await res.json()

  if (res.ok) {
    localStorage.setItem('user_token', data.token)
    return data
  } else {
    throw new Error(data.error || 'Erreur de connexion')
  }
}
