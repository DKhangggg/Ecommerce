export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    gender?: string | null;
    dateOfBirth?: string | null;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user:{
        id:string;
        username:string;
        roles:string[];
    }
}