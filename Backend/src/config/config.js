export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 5 * 60 * 1000 // 5 minutes
}