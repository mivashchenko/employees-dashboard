import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'Refresh token not found' }, { status: 401 });
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    cookieStore.set('token', data.idToken);

    return NextResponse.next();
  } catch (error) {
    console.error('Error refreshing token:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}