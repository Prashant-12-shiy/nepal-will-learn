export const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const endpoints = {
    register: "/api/auth/sign-up",
    login: "/api/auth/login",
    verifyEmail: "/api/auth/verify-email",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password/",
    getCurrent: "/api/auth/get-current",

    registerAdmin: "/api/auth/admin/sign-up",
    loginAdmin: "/api/auth/admin/login",
    forgotPasswordAdmin: "/api/auth/admin/forgot-password",
    resetPasswordAdmin: "/api/auth/admin/reset-password/",
    getCurrentAdmin: "/api/auth/admin/get-current",
}