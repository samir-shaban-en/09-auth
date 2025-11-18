import { type Note, type NewNote } from '@/types/note';
import nextServer from './api';
import type { User } from '@/types/user';
import type { ApiError } from './api';
interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const fetchNotes = async (
  currentPage: number,
  text: string,
  tag?: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
): Promise<NotesResponse> => {
  const { data } = await nextServer.get<NotesResponse>(
    `/notes?search=${text}&page=${currentPage}&perPage=12${tag ? `&tag=${tag}` : ''}`
  );

  return data;
};

const createNote = async (values: NewNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', values);
  return data;
};

const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

const getSingleNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export { fetchNotes, createNote, deleteNote, getSingleNote };

export type RegisterRequest = {
  email: string;
  password: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};
type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');

  return res.data;
};

export const getMe = async () => {
  try {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
  } catch (err) {
    const error = err as ApiError;

    if (error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};
export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type UpdateUserRequest = {
  email?: string;
  username?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);

  return res.data;
};
