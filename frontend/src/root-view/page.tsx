import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import { feathRoot, fetchMockRoot } from './fetch-root';
import { Spinner, Stack, Button, Link, Center } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Root } from './root';
import Layout from './layout';

export default function RootViewPage() {
    const { slug } = useParams();
    const { isLoading, error, data } = useQuery<Root, Error>({
        queryKey: ['fetchRoot', slug],
        queryFn: () => feathRoot(slug!)
    });

    if (isLoading) return (<Spinner size='xl' />);
    if (error) return (<h1>An error has occurred {error.message}</h1>); // TODO - create proper view
    if (!data) return (<h1>data not found</h1>); // TODO - create proper view

    return (
        <div>
            <h1>{data.slug}</h1>
            <Stack direction="column">
                {
                    data.links.map(link => (
                        <Link href={link.url} isExternal>
                            <Button variant="#7f8b93" color="#606e79">
                                {link.text}  <ExternalLinkIcon mx='2px' />
                            </Button>
                        </Link>
                    ))
                }
            </Stack>
        </div>
    );
}
