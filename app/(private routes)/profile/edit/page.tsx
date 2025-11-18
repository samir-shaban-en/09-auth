'use client';

import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe, updateMe } from '@/lib/api/clientApi';

const EditProfile = () => {
  const router = useRouter();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setEmail(user.email ?? '');
      setAvatarUrl(user.avatar ?? '/default-avatar.png'); // Логика для аватарки
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await updateMe({ username });
      router.push('/profile'); // Редирект после успешного сохранения
    } catch (error) {
      console.error('Ошибка при обновлении username:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile'); // Редирект при отмене
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={avatarUrl || '/default-avatar.png'}
          alt='User Avatar'
          width={120}
          height={120}
          className={css.avatar}
        />

        <form onSubmit={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor='username'>Username: {username}</label>
            <input
              id='username'
              type='text'
              value={username}
              onChange={handleChange}
              className={css.input}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type='submit' className={css.saveButton} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type='button'
              className={css.cancelButton}
              onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile;
