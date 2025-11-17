import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const myKey = process.env.NEXT_PUBLIC_API_URL + '/api';

const nextServer = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${myKey}`,
  },
});
export default nextServer;
