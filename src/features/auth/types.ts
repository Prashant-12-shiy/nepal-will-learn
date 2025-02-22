export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface VerifyEmailData {
    code: number;
}

export interface forgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    password: string;
}