'use client';
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api';

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  const router = useRouter();
  const close = () => router.back();

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;
  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;
  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
          <p className={css.tag}>{note.tag}</p>
        </div>
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
