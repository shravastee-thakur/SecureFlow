1. Register → Validate → Send OTP/email → Save hashed password → Store user
2. Login → Validate → Check password → Issue Access + Refresh JWT → Set refresh as HttpOnly cookie
3. Access Protected Routes → Access token (header) verified
4. Token expired → Use refresh token → Issue new access token
5. Logout → Clear cookie → Blacklist/Invalidate refresh token
6. Password reset → Send email link/OTP → Validate → Update password securely
