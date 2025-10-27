export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    role: string;
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