# SecureFlow
### MERN Authentication API

A secure, robust, and modern authentication backend built with the MERN stack (MongoDB, Express.js, and Node.js) and Tailwind CSS. This API provides a comprehensive set of authentication features, including JWT-based authentication, multi-factor authentication (MFA) with OTP via email, and a secure password management flow.

## Features

* **JWT-based Authentication** - Implements both access and refresh tokens for secure and persistent user sessions. Features token rotation for enhanced security.
* **OTP-based 2FA** - Two-Factor Authentication (2FA) for login using One-Time Passwords (OTPs) delivered via email, adding an extra layer of security.
* **Secure Password Hashing** - Utilizes `bcrypt` to securely hash and store user passwords, protecting against brute-force attacks.
* **Email Notifications** - Integrates `Nodemailer` for sending various email notifications, including OTPs, password reset links, and registration confirmations.
* **Security Best Practices:**
    * CORS (Cross-Origin Resource Sharing) - Configured to allow secure communication with your frontend application.
    * Helmet - Implements various HTTP headers to enhance API security.
    * Rate Limiting - Protects against abuse and DoS attacks by limiting the number of requests a user can make within a specified timeframe.
    * Cookie Support - Manages secure HTTP-only cookies for refresh tokens.
* **Forgot & Reset Password Flow** -  A complete and secure flow for users to reset their forgotten passwords via a unique link sent to their email.
* **Role-Based Authentication (User, Admin)** -  Supports defining and managing different user roles, enabling granular access control to API endpoints.
* **Environment Variable-based Configuration** -  All sensitive information and configurations are managed through environment variables for easy deployment and security.
* **Implemented Flows** -
    * User Registration
    * User Login
    * 2FA with OTP in Email
    * Forgot Password
    * Reset Password with Email Link
    * Role-based Authentication

## Tech Stack

* **Node.js & Express.js** -  The core backend runtime and web framework.
* **MongoDB & Mongoose** -  NoSQL database and an ODM (Object Data Modeling) library for MongoDB, providing schema-based solutions to model your application data.
* **JWT (JSON Web Tokens)** -  For creating secure, stateless access and refresh tokens with token rotation for enhanced security.
* **Bcrypt** - For strong password hashing.
* **Nodemailer** - For sending transactional emails.
* **Helmet** - A collection of 14 middleware functions to set security-related HTTP headers.
* **Express-Rate-Limit** - Basic rate-limiting middleware for Express.
* **Frontend** - Designed to work seamlessly with a **React** frontend, styled with **TailwindCSS**.

## API Endpoints
http://localhost:5000/api/v1/user/register - Register, POST<br />
http://localhost:5000/api/v1/user/login - Login, POST<br />
http://localhost:5000/api/v1/user/login/verify - Verify Login OTP, POST<br />
http://localhost:5000/api/v1/user/changePassword - Change Password, POST<br />
http://localhost:5000/api/v1/user/forgotPassword - Forget Password, POST<br />
http://localhost:5000/api/v1/user/resetPassword - Reset Password, POST

## Author
### Shravastee Thakur
MERN Stack Developer with a focus on Backend Development.
