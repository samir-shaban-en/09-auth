import { cookies } from 'next/headers';
import nextServer from './api';
import { User } from '@/types/user';
import { type Note } from '@/types/note';
export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getServerSingleNote = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (
  currentPage: number,
  text: string,
  tag?: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
): Promise<NotesResponse> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<NotesResponse>(
    `/notes?search=${encodeURIComponent(text)}&page=${currentPage}&perPage=12${
      tag ? `&tag=${tag}` : ''
    }`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  return data;
};
