'use client';
import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api/clientApi';

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

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        {isLoading && <p>Loading, please wait...</p>}
        {error && <p>Something went wrong.</p>}

        {!isLoading && !error && note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>
              {note.updatedAt
                ? `Updated at: ${note.updatedAt}`
                : `Created at: ${note.createdAt}`}
            </p>
            <p className={css.tag}>{note.tag}</p>
          </div>
        )}

        {/* 4. Кнопка "Закрыть" всегда доступна, чтобы можно было выйти из модального окна */}
        <button className={css.backBtn} onClick={close}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
