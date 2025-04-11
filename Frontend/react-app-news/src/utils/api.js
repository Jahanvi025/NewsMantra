import axios from 'axios';

const api = axios.create({
    baseURL: '/auth',
});

export const googleAuth = (code)=> api.get(`/google?code=${code}`);