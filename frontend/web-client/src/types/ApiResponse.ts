export interface apiResponse<T> {
    message: string;
    status: number;
    data: T;
    timestamp: string;
    error: boolean;
    success: boolean;
    clientError: boolean;
    serverError: boolean;
}