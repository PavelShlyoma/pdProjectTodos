import axios from 'axios';
import {useAuthStore} from '@/stores/auth.js'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

axiosInstance.interceptors.request.use(function (config) {
    const authStore = useAuthStore();
    const authToken = authStore.token;
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    // Здесь можете сделать что-нибудь с перед отправкой запроса
    return config;
}, function (error) {
    // Сделайте что-нибудь с ошибкой запроса
    return Promise.reject(error);
});
const newGetUrl = '';
// Добавляем перехват ответов
axiosInstance.interceptors.response.use(function (response) {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
    return response;
}, function (error) {
    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    return Promise.reject(error);
});

export { axiosInstance };