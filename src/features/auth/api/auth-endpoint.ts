export const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const endpoints = {
    register: "/api/auth/sign-up",
    login: "/api/auth/login",
    verifyEmail: "/api/auth/verify-email",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password/",
    getCurrent: "/api/auth/get-current",
}