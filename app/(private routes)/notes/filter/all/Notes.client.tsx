'use client';
import NoteList from '@/components/NoteList/NoteList';

import Link from 'next/link';
import SearchBox from '@/components/SearchBox/SearchBox';

import Pagination from '@/components/Pagination/Pagination';
import { fetchNotes } from '@/lib/api/clientApi';

import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { useState } from 'react';

import css from './NotesPage.module.css';
type NotesClientProps = {
  initialPage: number;
  initialText: string;
  tag?: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
};
function NotesClient({ initialPage, initialText, tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [text, setText] = useState(initialText);
  const [searchQuery, setSearchQuery] = useState(initialText);

  const { data, isError, error } = useQuery({
    queryKey: ['notes', currentPage, searchQuery, tag],
    queryFn: () => fetchNotes(currentPage, searchQuery, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleChange = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 1000);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            onChange={(e) => {
              setText(e.target.value);
              handleChange(e.target.value);
            }}
            value={text}
          />

          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}

          <Link
            className={css.button}
            prefetch={false}
            href='/notes/action/create'>
            Create note +
          </Link>
        </header>
      </div>
      {isError && <p>Could not fetch the list of notes. {error.message}</p>}

      {data?.notes && <NoteList notes={data.notes} />}
    </>
  );
}

export default NotesClient;
