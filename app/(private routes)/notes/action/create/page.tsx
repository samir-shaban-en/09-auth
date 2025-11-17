import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note | Notes App',
  description: 'Create a new note and save it to your personal notebook.',
  openGraph: {
    title: 'Create Note | Notes App',
    description: 'Create a new note and save it to your personal notebook.',
    url: 'https://08-zustand-phi-taupe.vercel.app/notes/action/create',
    type: 'website',
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
