import css from './ProfilePage.module.css';
import Link from 'next/link';
// import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Профіль користувача | NoteHub',
  description:
    'Особистий профіль користувача в NoteHub. Перегляд даних, аватару та налаштувань.',
  keywords: ['профіль', 'користувач', 'notehub', 'замітки', 'акаунт'],
  openGraph: {
    title: 'Профіль користувача | NoteHub',
    description: 'Особистий профіль користувача в NoteHub.',
    url: 'https://09-auth-fawn-seven.vercel.app/profile/',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Профіль користувача',
      },
    ],
    type: 'website',
  },
};
const Profile = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href='' className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {/* <Image
            src='Avatar'
            alt='User Avatar'
            width={120}
            height={120}
            className={css.avatar}
          /> */}
        </div>
        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
