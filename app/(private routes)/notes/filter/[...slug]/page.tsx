import { fetchNotes } from '@/lib/api/clientApi';
import { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetails from './Notes.client';
type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const title = `Нотатки — Фільтр: ${slug[0]}`;
  const description = `Перегляд нотаток, відфільтрованих за критерієм: ${slug[0]}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-phi-taupe.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Нотатки — ${slug[0]}`,
        },
      ],
    },
  };
}

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();
  const tag = slug[0] as
    | 'Todo'
    | 'Work'
    | 'Personal'
    | 'Meeting'
    | 'Shopping'
    | undefined;
  const currentPage = 1;
  const text = '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', currentPage, text, tag],
    queryFn: () => fetchNotes(currentPage, text, tag),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetails initialPage={currentPage} initialText={text} tag={tag} />
      </HydrationBoundary>
    </>
  );
}
