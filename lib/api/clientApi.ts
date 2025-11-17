import { type Note, type NewNote } from '@/types/note';
import nextServer from './api';
import type { User } from '@/types/user';
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
