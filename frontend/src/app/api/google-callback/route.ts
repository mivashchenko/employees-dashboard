import {cookies} from "next/headers";
import {NextResponse} from "next/server";

export async function GET(req) {
  const {searchParams} = new URL(req.url);
  const code = searchParams.get("code");


  if (!code) {
    return new Response(JSON.stringify({error: "Code is missing"}), {status: 400});
  }

  const cookieStore = await cookies()

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google/code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({code})
  })

  const data = await response.json()

  cookieStore.set('token', data.idToken, {
    httpOnly: true,
    // ...
  })
  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    // ...
  })

  const redirectUrl = new URL("/", req.url).toString();

  return NextResponse.redirect(redirectUrl)
}