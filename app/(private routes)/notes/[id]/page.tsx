import { getSingleNote } from '@/lib/api/clientApi';
import { Metadata } from 'next';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import NoteDetailsClient from './NoteDetails.client';

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await getSingleNote(id);

  const noteTitle = `Нотатка ${note.title}`;
  const noteDescription = `Детальний перегляд нотатки з ідентифікатором ${note.content}.`;

  return {
    title: noteTitle,
    description: noteDescription,
    openGraph: {
      title: noteTitle,
      description: noteDescription,
      url: `https://09-auth-fawn-seven.vercel.app//notes/[id]/${id}`,

      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: noteTitle,
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
