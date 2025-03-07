'use server'

import { cookies } from 'next/headers'

const API_URL = 'http://localhost:8080/api'

export const fetcher = async <T>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const cookieStore = await cookies()
  const url = `${API_URL}${path}`

  const fetchWithAuth = async (): Promise<Response> => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${cookieStore.get("token")?.value};`,
        ...options.headers,
      },
      credentials: 'include',
    })

    if (response.status === 401) {
      const refreshResponse = await fetch(`http://localhost:3000/api/auth/refresh`, {
        method: 'POST',
      })

      if (refreshResponse.ok) {

        return fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            Cookie: `token=${cookieStore.get("token")?.value};`,
            ...options.headers,
          },
          credentials: 'include',
        })
      }
    }

    return response
  }

  const response = await fetchWithAuth()

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}
