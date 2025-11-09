import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NoteDetails from './Notes.client';
type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function DocsPage({ params }: Props) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const currentPage = 1;
  const text = '';
  const tag = slug[0];

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
