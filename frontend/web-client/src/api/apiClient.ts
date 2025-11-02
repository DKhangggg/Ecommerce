import axios, {type InternalAxiosRequestConfig} from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Đọc token và gán header (như cũ)
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        const roles = localStorage.getItem('roles');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        if (userId) {
            config.headers['X-User-Id'] = userId;
        }
        if (roles) {
            config.headers['X-Roles'] = roles;
        }

        // ----- [THÊM PHẦN LOG Ở ĐÂY] -----
        console.groupCollapsed(
            `%c[API REQUEST] %c${config.method?.toUpperCase()} %c${config.url}`,
            'color: #61affe; font-weight: bold;', // Xanh
            'color: #f7b731; font-weight: bold;', // Vàng
            'color: #999; font-weight: normal;' // Xám
        );
        console.log('%cHeaders:', 'color: #aaa; font-weight: bold;', config.headers);
        if (config.data) {
            console.log('%cPayload:', 'color: #aaa; font-weight: bold;', config.data);
        }
        console.groupEnd();
        // ---------------------------------

        return config;
    },
    (error) => {
        // Log lỗi trước khi gửi
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// --- 2. LOG RESPONSE NHẬN VỀ (Khuyến khích) ---
apiClient.interceptors.response.use(
    (response) => {
        // ----- [LOG KHI THÀNH CÔNG] -----
        console.groupCollapsed(
            `%c[API RESPONSE] %c${response.status} %c${response.config.method?.toUpperCase()} %c${response.config.url}`,
            'color: #00bfa5; font-weight: bold;', // Xanh lá
            'color: #00bfa5; font-weight: bold;', // Xanh lá
            'color: #f7b731; font-weight: bold;', // Vàng
            'color: #999; font-weight: normal;' // Xám
        );
        console.log('%cData:', 'color: #aaa; font-weight: bold;', response.data);
        console.groupEnd();
        // ----------------------------------

        return response;
    },
    (error) => {
        // ----- [LOG KHI THẤT BẠI] -----
        if (error.response) {
            // Lỗi từ server (4xx, 5xx)
            console.groupCollapsed(
                `%c[API RESPONSE ERROR] %c${error.response.status} %c${error.config.method?.toUpperCase()} %c${error.config.url}`,
                'color: #ff5252; font-weight: bold;', // Đỏ
                'color: #ff5252; font-weight: bold;', // Đỏ
                'color: #f7b731; font-weight: bold;', // Vàng
                'color: #999; font-weight: normal;' // Xám
            );
            console.log('%cError Data:', 'color: #aaa; font-weight: bold;', error.response.data);
            console.groupEnd();
        } else if (error.request) {
            // Lỗi không kết nối được (network error)
            console.error('[API Network Error]', error.message);
        } else {
            // Lỗi javascript
            console.error('[API Config Error]', error.message);
        }
        // -----------------------------------

        return Promise.reject(error);
    }
);
export default apiClient;