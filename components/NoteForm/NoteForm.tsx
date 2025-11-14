'use client';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { type NewNote } from '@/types/note';
import { useRouter } from 'next/navigation';
import { Metadata } from 'next';
import { useNoteDraftStore } from '@/lib/stores/noteStore';
export const metadata: Metadata = {
  title: 'Create new note | Notes App',
  description: 'Create a new note by entering title, content, and tag.',
  openGraph: {
    title: 'Create new note | Notes App',
    description: 'Form for creating a new note.',
    url: 'https://your-site.com/notes/action/create',
    images: [
      {
        url: 'https://your-site.com/og/create-note.png',
        width: 1200,
        height: 630,
        alt: 'Create note page',
      },
    ],
  },
};

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // 4. Коли користувач змінює будь-яке поле форми — оновлюємо стан
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const mutationCreateNote = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values: NewNote = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NewNote['tag'],
    };

    mutationCreateNote.mutate(values);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor='title'>Title</label>
        <input
          defaultValue={draft?.title}
          onChange={handleChange}
          id='title'
          type='text'
          name='title'
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor='content'>Content</label>
        <textarea
          defaultValue={draft?.content}
          onChange={handleChange}
          id='content'
          name='content'
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor='tag'>Tag</label>
        <select
          defaultValue={draft?.tag}
          onChange={handleChange}
          id='tag'
          name='tag'
          className={css.select}>
          <option value='Todo'>Todo</option>
          <option value='Work'>Work</option>
          <option value='Personal'>Personal</option>
          <option value='Meeting'>Meeting</option>
          <option value='Shopping'>Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type='button'
          className={css.cancelButton}
          onClick={handleCancel}>
          Cancel
        </button>
        <button type='submit' className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
