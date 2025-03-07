const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

export const login = async (provider: string) => {

  if (provider === 'google') {
    const response = await fetch(`${BASE_API_URL}/auth/login/google`, {
      method: 'GET',
      credentials: 'include',
    })

    window.location.href = await response.text();
  }

  if (provider === 'microsoft') {
    return fetch('${BASE_API_URL}/auth/login/microsoft', {
      method: 'GET',
    })
  }

}