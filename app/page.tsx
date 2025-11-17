import css from './Home.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профіль користувача | NoteHub',
  description:
    'Особистий профіль користувача в NoteHub. Перегляд даних, аватару та налаштувань.',
  keywords: ['профіль', 'користувач', 'notehub', 'замітки', 'акаунт'],
  openGraph: {
    title: 'Профіль користувача | NoteHub',
    description: 'Особистий профіль користувача в NoteHub.',
    url: 'https://your-domain.com/profile',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://your-domain.com/og/profile.png',
        width: 1200,
        height: 630,
        alt: 'Профіль користувача',
      },
    ],
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main>
        <div className={css.container}>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.description}>
            NoteHub is a simple and efficient application designed for managing
            personal notes. It helps keep your thoughts organized and accessible
            in one place, whether you are at home or on the go.
          </p>
          <p className={css.description}>
            The app provides a clean interface for writing, editing, and
            browsing notes. With support for keyword search and structured
            organization, NoteHub offers a streamlined experience for anyone who
            values clarity and productivity.
          </p>
        </div>
      </main>
    </div>
  );
}
